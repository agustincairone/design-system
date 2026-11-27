import * as React from "react"

import { cn } from "@/lib/utils"
import { RollNumber } from "@/components/ui/roll-number"
import { Badge } from "@/components/ui/badge"

// Número grande de una pantalla (de no-coke: los días de racha). Va adentro de una caja que ocupa el alto
// que sobra y la llena: el número justo en el centro de la caja, en la letra de puntitos de Geist (Geist
// Pixel Circle) de 144, y gira al aparecer. Pegado abajo, qué cuenta (puede llevar una imagen, ej: el
// logo) y, si hace falta, una nota en píldora (ej: desde cuándo). Arriba a la derecha, un botón opcional
// (`action`, ej: "Ver mis recaídas").
export function HeroNumber({
  value,
  label,
  note,
  action,
  className,
}: {
  value: number
  label: React.ReactNode
  note?: React.ReactNode
  action?: React.ReactNode
  className?: string
}) {
  return (
    // arriba y abajo miden lo mismo, así el número queda en el centro de la caja
    <div data-slot="hero-number" className={cn("grid h-full grid-rows-[1fr_auto_1fr] gap-box-m text-center", className)}>
      <div className="flex items-start justify-end">{action}</div>
      <RollNumber value={value} className="font-clock text-hero" />
      <div className="flex flex-col items-center justify-end gap-box-xs">
        <div className="flex items-center gap-box-xs text-sm font-medium">{label}</div>
        {note && <Badge variant="secondary">{note}</Badge>}
      </div>
    </div>
  )
}
