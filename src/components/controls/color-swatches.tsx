import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

// Selector de colores (diseño outfit): círculos de 30px que se deslizan de costado.
// Elegido = aro del color principal separado por un aro blanco, con un ✓ adentro.
// Los colores claros llevan un borde fino para que se vean. Hasta `max` elegidos.

export type Swatch = { name: string; hex: string }

const LIGHTS = ["#FFFFFF", "#D4D4D4", "#F0E6D6"]

export function ColorSwatches({
  colors,
  value,
  onToggle,
  max = 3,
  className,
}: {
  colors: Swatch[]
  value: { hex: string }[]
  onToggle: (c: Swatch) => void
  max?: number
  className?: string
}) {
  return (
    <div data-slot="color-swatches" className={cn("flex gap-2 overflow-x-auto px-1 pt-1 pb-1.5 [scrollbar-width:none]", className)}>
      {colors.map((c) => {
        const sel = value.some((p) => p.hex === c.hex)
        const light = LIGHTS.includes(c.hex.toUpperCase())
        return (
          <button
            key={c.hex}
            type="button"
            title={c.name}
            aria-label={c.name}
            aria-pressed={sel}
            onClick={() => onToggle(c)}
            className={cn(
              "relative size-[30px] shrink-0 rounded-full outline-none transition-[box-shadow,opacity] focus-visible:ring-2 focus-visible:ring-brand",
              light ? "border-[1.5px] border-border" : "border-2 border-transparent",
              sel && "ring-2 ring-primary ring-offset-2 ring-offset-card",
              !sel && value.length >= max && "opacity-35"
            )}
            style={{ background: c.hex }}
          >
            {sel && (
              <span className="absolute inset-0 flex items-center justify-center">
                <Check className="size-3" style={{ color: light ? "#1c1917" : "#ffffff" }} />
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
