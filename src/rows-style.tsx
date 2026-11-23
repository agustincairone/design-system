// Guía (temporal): "Filas que se abren". Para decidir si el análisis de gastos de pay (las filas que se
// abren) pasa al mismo estilo que la lista que se edita: líneas y sangría en vez de cajitas una dentro
// de otra. Cuando se decida, este archivo se borra.
import * as React from "react"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { useTheme } from "@/components/theme-provider"
import { BRANDS } from "@/brands"
import { ExpandRow, ExpandRowItem } from "@/components/controls/expand-row"

const total = (v: string) => <span className="font-medium">{v}</span>
const sub = (v: string) => <span className="font-medium text-muted-foreground">{v}</span>

// Estilo 1: como está hoy (cajitas una dentro de otra)
function StyleOne() {
  return (
    <div className="overflow-hidden rounded-box-l bg-card">
      <ExpandRow defaultOpen title="Noviembre 2026" sub="IPC 2,2%" right={total("$758.070")}>
        <ExpandRow defaultOpen title="🏠 Casa" right={sub("$561.770")}>
          <ExpandRowItem label="🛒 Supermercado" value="$320.000" />
          <ExpandRowItem label="⚡ Servicios" value="$241.770" />
        </ExpandRow>
        <ExpandRow title="🤖 Personal" right={sub("$76.300")}>
          <ExpandRowItem label="💊 Farmacia" value="$76.300" />
        </ExpandRow>
      </ExpandRow>
      <ExpandRow title="Octubre 2026" sub="IPC 2,7%" right={total("$638.070")}>
        <ExpandRowItem label="🏠 Casa" value="$638.070" />
      </ExpandRow>
      <ExpandRow title="Septiembre 2026" sub="Sin gastos para abrir" right={total("$0")} />
    </div>
  )
}

// Estilo 2: como la lista que se edita (una línea entre fila y fila; lo de adentro, corrido a la derecha)
const INDENT = ["pl-box-m", "pl-8", "pl-12"]
function LineRow({ level = 0, title, meta, right, defaultOpen, children }: {
  level?: number; title: React.ReactNode; meta?: React.ReactNode; right: React.ReactNode; defaultOpen?: boolean; children?: React.ReactNode
}) {
  const [open, setOpen] = React.useState(!!defaultOpen)
  const canOpen = children != null
  return (
    <>
      <button
        type="button"
        disabled={!canOpen}
        aria-expanded={canOpen ? open : undefined}
        onClick={() => setOpen((o) => !o)}
        className={cn("flex w-full items-center gap-box-s border-b border-border py-box-s pr-box-m text-left text-sm disabled:cursor-default", INDENT[level])}
      >
        <div className="min-w-0 flex-1">
          <div className={cn("truncate", level === 0 && "font-medium", level === 2 && "text-muted-foreground")}>{title}</div>
          {meta && <div className="mt-0.5 text-xs text-muted-foreground">{meta}</div>}
        </div>
        <div className="shrink-0 text-right">{right}</div>
        {canOpen ? <ChevronDown className={cn("size-4 shrink-0 text-muted-foreground transition-transform duration-200", open && "rotate-180")} /> : <span className="w-4 shrink-0" />}
      </button>
      {open && children}
    </>
  )
}

function StyleTwo() {
  return (
    <div className="overflow-hidden rounded-box-l bg-card [&>:last-child]:border-b-0">
      <LineRow defaultOpen title="Noviembre 2026" meta="IPC 2,2%" right={total("$758.070")}>
        <LineRow level={1} defaultOpen title="🏠 Casa" right={sub("$561.770")}>
          <LineRow level={2} title="🛒 Supermercado" right={sub("$320.000")} />
          <LineRow level={2} title="⚡ Servicios" right={sub("$241.770")} />
        </LineRow>
        <LineRow level={1} title="🤖 Personal" right={sub("$76.300")}>
          <LineRow level={2} title="💊 Farmacia" right={sub("$76.300")} />
        </LineRow>
      </LineRow>
      <LineRow title="Octubre 2026" meta="IPC 2,7%" right={total("$638.070")}>
        <LineRow level={1} title="🏠 Casa" right={sub("$638.070")} />
      </LineRow>
      <LineRow title="Septiembre 2026" meta="Sin gastos para abrir" right={total("$0")} />
    </div>
  )
}

export function RowsStyle() {
  const { resolvedTheme } = useTheme()
  const v = BRANDS["pay-tracker"][resolvedTheme === "dark" ? "dark" : "light"]
  const brand = {
    "--brand": v.brand, "--brand-text": v.text, "--brand-strong": v.strong, "--brand-hover": v.hover, "--brand-foreground": v.fg,
    "--primary": v.brand, "--primary-foreground": v.fg, "--ring": v.brand,
  } as React.CSSProperties
  const col = (label: string, body: React.ReactNode) => (
    <div className="flex min-w-0 flex-col gap-2" style={brand}>
      <span className="eyebrow">{label}</span>
      <div className="rounded-box-l bg-background p-box-m">{body}</div>
    </div>
  )
  return (
    <div className="flex flex-col gap-3">
      <div>
        <div className="text-sm font-medium">Análisis de gastos de pay: gastos por mes</div>
        <div className="text-xs text-muted-foreground">Mes → grupo → categoría, con sus montos. Tocá las filas para abrirlas y cerrarlas.</div>
      </div>
      <div className="grid grid-cols-1 items-start gap-3 md:grid-cols-2">
        {col("Estilo 1 · como está hoy (cajitas)", <StyleOne />)}
        {col("Estilo 2 · como la lista que se edita (líneas)", <StyleTwo />)}
      </div>
    </div>
  )
}
