// Guía: el marco de cada sección y de cada ejemplo, y la línea "Lo usan" (qué apps usan esa pieza).
import * as React from "react"

import { APPS, appsUsing, pieceName, usedInside } from "@/guide/apps"

// A quién llega una pieza: "pay · wine", "todas las apps", "por dentro de Hojas" o "sin usar todavía"
function usersOf(piece: string) {
  const apps = appsUsing(piece)
  if (apps.length === APPS.length) return "todas las apps"
  if (apps.length) return apps.map((a) => a.name).join(" · ")
  const inside = usedInside(piece)
  if (inside.length) return "por dentro de " + inside.map(pieceName).join(", ")
  return "sin usar todavía"
}

/** Qué apps usan estas piezas. Si todas llegan a las mismas apps, una sola línea; si no, una por pieza. */
export function Uses({ pieces, className = "" }: { pieces: string[]; className?: string }) {
  const rows = pieces.map((p) => ({ p, who: usersOf(p) }))
  const same = rows.every((r) => r.who === rows[0].who)
  return (
    <div className={`flex flex-wrap gap-x-4 gap-y-1 text-xs ${className}`}>
      <span className="text-muted-foreground">Lo usan:</span>
      {same ? (
        <span>{rows[0].who}</span>
      ) : (
        rows.map((r) => (
          <span key={r.p}>
            <span className="text-muted-foreground">{pieceName(r.p)}:</span> {r.who}
          </span>
        ))
      )}
    </div>
  )
}

export function Section({
  id,
  title,
  description,
  uses,
  children,
}: {
  id: string
  title: string
  description: string
  /** piezas que muestra la sección entera (si no lo dice cada ejemplo) */
  uses?: string[]
  children: React.ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-20 border-t border-input py-12">
      <div className="mb-6">
        <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
        <p className="mt-1 max-w-prose text-sm text-muted-foreground">{description}</p>
        {uses && <Uses pieces={uses} className="mt-2" />}
      </div>
      {children}
    </section>
  )
}

export function Demo({
  label,
  uses,
  children,
  className = "",
}: {
  label: string
  /** las piezas del sistema que muestra este ejemplo (ej: "ui/button") */
  uses?: string[]
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-input">
      <div className={`flex flex-wrap items-center gap-3 bg-background p-6 ${className}`}>{children}</div>
      <div className="border-t border-input bg-muted/50 px-4 py-2">
        <div className="text-xs text-muted-foreground">{label}</div>
        {uses && <Uses pieces={uses} className="mt-1" />}
      </div>
    </div>
  )
}

// Mismo marco que Demo, con nombre y para qué sirve
export function ControlCard({ name, use, uses, children }: { name: string; use: string; uses?: string[]; children: React.ReactNode }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-input">
      <div className="flex min-h-56 flex-1 items-center justify-center bg-background p-6">{children}</div>
      <div className="border-t border-input bg-muted/50 px-4 py-2">
        <div className="text-sm font-medium">{name}</div>
        <div className="text-xs text-muted-foreground">{use}</div>
        {uses && <Uses pieces={uses} className="mt-1" />}
      </div>
    </div>
  )
}
