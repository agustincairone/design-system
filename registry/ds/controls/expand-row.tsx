import * as React from "react"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

// Fila que se abre: va adentro de una caja, una abajo de la otra. Al tocarla, el detalle aparece
// abajo en una caja M (inset, gris clarito, sin borde). Si adentro del detalle hay otra fila que se abre,
// su detalle va en raised (blanco en modo claro) para que se distinga.
// Sin `children` la fila no se abre y no muestra la flecha.

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
  /** el detalle que aparece al abrirla */
  children?: React.ReactNode
  defaultOpen?: boolean
  className?: string
}) {
  const [open, setOpen] = React.useState(defaultOpen)
  const canOpen = children != null && children !== false
  return (
    <div data-slot="expand-row" className={cn("border-b border-border last:border-b-0 in-data-[slot=expand-row-detail]:border-0", className)}>
      <button
        type="button"
        aria-expanded={canOpen ? open : undefined}
        disabled={!canOpen}
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm outline-none focus-visible:bg-secondary disabled:cursor-default in-data-[slot=expand-row-detail]:py-2"
      >
        <div className="min-w-0 flex-1">
          <div className="truncate">{title}</div>
          {sub && <div className="mt-0.5 text-xs text-muted-foreground">{sub}</div>}
        </div>
        {right && <div className="shrink-0 text-right">{right}</div>}
        {canOpen && <ChevronDown className={cn("size-4 shrink-0 text-muted-foreground transition-transform duration-200", open && "rotate-180")} />}
      </button>
      {canOpen && open && (
        <div data-slot="expand-row-detail" data-variant="inset" className="mx-4 mb-3 rounded-box-m bg-inset py-1 in-data-[slot=expand-row-detail]:mx-2 in-data-[slot=expand-row-detail]:bg-raised">
          {children}
        </div>
      )}
    </div>
  )
}

// Una línea simple del detalle: texto a la izquierda y monto a la derecha.
export function ExpandRowItem({ label, sub, value }: { label: React.ReactNode; sub?: React.ReactNode; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 px-4 py-2 text-sm">
      <div className="min-w-0">
        <div className="truncate">{label}</div>
        {sub && <div className="mt-0.5 text-xs text-muted-foreground">{sub}</div>}
      </div>
      <div className="shrink-0 font-medium text-muted-foreground">{value}</div>
    </div>
  )
}
