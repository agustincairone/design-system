import * as React from "react"

import { cn } from "@/lib/utils"
import { RollNumber } from "@/components/ui/roll-number"
import { Badge } from "@/components/ui/badge"

// Número grande de una pantalla (de no-coke: los días de racha). El número va en puntitos (como los del
// fleje), con la letra de 96 (la del número principal de una pantalla), y gira al aparecer. Abajo, qué cuenta (puede llevar
// una imagen, ej: el logo) y, si hace falta, una nota en píldora (ej: desde cuándo). Todo centrado, a 8px.
export function HeroNumber({
  value,
  label,
  note,
  className,
}: {
  value: number
  label: React.ReactNode
  note?: React.ReactNode
  className?: string
}) {
  return (
    <div data-slot="hero-number" className={cn("flex flex-col items-center gap-box-xs text-center", className)}>
      <RollNumber value={value} className="font-readout text-6xl font-bold" />
      <div className="flex items-center gap-box-xs text-sm font-medium">{label}</div>
      {note && <Badge variant="secondary">{note}</Badge>}
    </div>
  )
}
