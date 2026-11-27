import * as React from "react"
import { Info } from "lucide-react"

import { cn } from "@/lib/utils"

// Ficha de un dato (de no-coke): arriba a la izquierda el número con su unidad; abajo a la izquierda qué es
// y una línea gris (ej: a cuánto equivale). Si la ficha es alta (ej: llenando la pantalla), el espacio libre
// queda en el medio. Con `onInfo`, toda la ficha se toca para abrir la explicación y lleva una (i) arriba a
// la derecha. Van de a dos por fila: grid-cols-2 gap-box-gap.
export function StatCard({
  value,
  unit,
  title,
  text,
  onInfo,
  className,
}: {
  value: React.ReactNode
  unit?: string
  title: React.ReactNode
  text?: React.ReactNode
  onInfo?: () => void
  className?: string
}) {
  const body = (
    <>
      <div className="flex items-start justify-between gap-box-xs">
        <span className="flex min-w-0 items-baseline gap-1">
          <span className="live-number truncate text-2xl font-semibold">{value}</span>
          {unit && <span className="text-xs text-muted-foreground">{unit}</span>}
        </span>
        {onInfo && <Info aria-hidden className="mt-1 size-4 shrink-0 text-muted-foreground" />}
      </div>
      <div className="mt-auto flex flex-col gap-1">
        <div className="text-xs font-medium">{title}</div>
        {text && <div className="text-xs text-muted-foreground">{text}</div>}
      </div>
    </>
  )
  const box = "flex flex-col gap-box-m rounded-box-l bg-card p-box-m text-left"
  return onInfo ? (
    <button type="button" data-slot="stat-card" onClick={onInfo} className={cn(box, "transition-colors hover:bg-card-hover", className)}>
      {body}
    </button>
  ) : (
    <div data-slot="stat-card" className={cn(box, className)}>
      {body}
    </div>
  )
}
