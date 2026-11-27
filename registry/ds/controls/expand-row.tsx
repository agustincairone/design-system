import * as React from "react"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

// Fila que se abre: va adentro de una caja, una abajo de la otra, con una línea entre fila y fila (el mismo
// estilo que la lista que se edita). Al tocarla, lo de adentro aparece abajo, corrido 16px a la derecha
// por cada nivel; el tercer nivel va en gris. Los montos de la derecha quedan todos en una misma columna
// (las filas que no se abren guardan el lugar de la flecha).
// Sin `children` la fila no se abre y no muestra la flecha.

// En qué nivel está la fila (0 = la de afuera): lo sabe sola por estar adentro de otra
const Level = React.createContext(0)
// El borde de la fila lo marca la caja (ExpandList): 16px en una caja, 20px en una hoja (como el título).
// Sin ExpandList, 16px.
const INDENT = [
  "pl-[var(--row-px,var(--spacing-box-m))]",
  "pl-[calc(var(--row-px,var(--spacing-box-m))+var(--spacing-box-m))]",
  "pl-[calc(var(--row-px,var(--spacing-box-m))+var(--spacing-box-m)*2)]",
  "pl-[calc(var(--row-px,var(--spacing-box-m))+var(--spacing-box-m)*3)]",
]
const indent = (level: number) => INDENT[Math.min(level, INDENT.length - 1)]
const ROW = "flex w-full items-center gap-box-s py-box-s pr-[var(--row-px,var(--spacing-box-m))] text-left text-sm"

// La caja de las filas: blanca con las puntas redondas, o con `flush` adentro de una hoja, de lado a lado
// (las líneas llegan a los bordes y el texto queda alineado con el título de la hoja), igual que la lista
// que se edita.
export function ExpandList({ flush, className, children }: { flush?: boolean; className?: string; children: React.ReactNode }) {
  return (
    <div
      data-slot="expand-list"
      className={cn(flush ? "-mx-box-l [--row-px:var(--spacing-box-l)]" : "overflow-hidden rounded-box-l bg-card [--row-px:var(--spacing-box-m)]", className)}
    >
      {children}
    </div>
  )
}

function RowText({ level, title, sub }: { level: number; title: React.ReactNode; sub?: React.ReactNode }) {
  return (
    <div className="min-w-0 flex-1">
      <div className={cn("truncate", level === 0 && "font-medium", level >= 2 && "text-muted-foreground")}>{title}</div>
      {sub && <div className="mt-0.5 text-xs text-muted-foreground">{sub}</div>}
    </div>
  )
}

export function ExpandRow({
  title,
  sub,
  right,
  children,
  defaultOpen = false,
  className,
}: {
  title: React.ReactNode
  /** texto chico gris abajo del título */
  sub?: React.ReactNode
  /** lo que va a la derecha, antes de la flecha (ej: un monto) */
  right?: React.ReactNode
  /** lo que aparece al abrirla: otras filas (ExpandRow o ExpandRowItem) */
  children?: React.ReactNode
  defaultOpen?: boolean
  className?: string
}) {
  const level = React.useContext(Level)
  const [open, setOpen] = React.useState(defaultOpen)
  const canOpen = children != null && children !== false
  return (
    <div data-slot="expand-row" className={cn("border-b border-border last:border-b-0", className)}>
      <button
        type="button"
        aria-expanded={canOpen ? open : undefined}
        disabled={!canOpen}
        onClick={() => setOpen((o) => !o)}
        className={cn(ROW, indent(level), "outline-none focus-visible:bg-secondary disabled:cursor-default")}
      >
        <RowText level={level} title={title} sub={sub} />
        {right && <div className="shrink-0 text-right">{right}</div>}
        {canOpen ? (
          <ChevronDown className={cn("size-4 shrink-0 text-muted-foreground transition-transform duration-200", open && "rotate-180")} />
        ) : (
          <span className="w-4 shrink-0" />
        )}
      </button>
      {canOpen && open && (
        <div data-slot="expand-row-detail" className="border-t border-border">
          <Level.Provider value={level + 1}>{children}</Level.Provider>
        </div>
      )}
    </div>
  )
}

// Una línea simple de adentro: texto a la izquierda y monto a la derecha.
export function ExpandRowItem({ label, sub, value }: { label: React.ReactNode; sub?: React.ReactNode; value: React.ReactNode }) {
  const level = React.useContext(Level)
  return (
    <div data-slot="expand-row-item" className={cn(ROW, indent(level), "border-b border-border last:border-b-0")}>
      <RowText level={level} title={label} sub={sub} />
      <div className="shrink-0 font-medium text-muted-foreground">{value}</div>
      <span className="w-4 shrink-0" />
    </div>
  )
}
