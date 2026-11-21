import * as React from "react"
import { Info } from "lucide-react"

import { cn } from "@/lib/utils"
import { Slider } from "@/components/ui/slider"

// Barra de una escala corta (ej: el perfil de un vino, de 1 a 5). Diseño de wine con el slider del sistema.
// Caja S gris: arriba el nombre y una ⓘ que abre la explicación; abajo del slider, una marquita
// por cada valor y los dos extremos en gris (ej: "Poco frutado" / "Muy frutado").
export function ScaleSlider({
  label,
  value,
  onChange,
  min = 1,
  max = 5,
  minLabel,
  maxLabel,
  info,
  className,
}: {
  label: React.ReactNode
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  minLabel?: React.ReactNode
  maxLabel?: React.ReactNode
  /** explicación que aparece al tocar la ⓘ */
  info?: React.ReactNode
  className?: string
}) {
  const [showInfo, setShowInfo] = React.useState(false)
  return (
    <div data-slot="scale-slider" data-variant="inset" className={cn("flex flex-col gap-box-xs rounded-box-s bg-inset p-box-s", className)}>
      <div className="flex items-center justify-between gap-box-xs">
        <span className="text-xs font-medium">{label}</span>
        {info && (
          <button
            type="button"
            aria-label="Qué es"
            aria-expanded={showInfo}
            onClick={() => setShowInfo((s) => !s)}
            className="flex rounded-full p-0.5 text-brand-text outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
          >
            <Info className="size-3.5" />
          </button>
        )}
      </div>
      {info && showInfo && <p className="rounded-box-s bg-raised p-box-s text-xs text-muted-foreground">{info}</p>}
      <div className="flex flex-col">
        <Slider value={[value]} min={min} max={max} step={1} onValueChange={(v) => onChange(v[0])} aria-label={typeof label === "string" ? label : undefined} />
        {/* una marquita por valor, alineadas con el centro del punto (que tiene 12px) */}
        <div aria-hidden className="flex justify-between px-1.5">
          {Array.from({ length: max - min + 1 }, (_, i) => (
            <span key={i} className="h-1 w-px bg-input dark:bg-raised" />
          ))}
        </div>
        {(minLabel || maxLabel) && (
          <div className="mt-box-2xs flex justify-between gap-box-xs text-xs text-muted-foreground">
            <span>{minLabel}</span>
            <span className="text-right">{maxLabel}</span>
          </div>
        )}
      </div>
    </div>
  )
}
