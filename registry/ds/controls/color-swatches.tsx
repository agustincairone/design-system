import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

// Selector de colores (diseño outfit): círculos de 30px que se deslizan de costado.
// Elegido = aro del color principal (blanco en modo oscuro) separado del círculo, con un ✓ adentro.
// Sólo el blanco lleva borde de 1px gris (el de los divisores); en modo oscuro, también el negro. Hasta `max` elegidos.

export type Swatch = { name: string; hex: string }

const LIGHTS = ["#FFFFFF", "#D4D4D4", "#F0E6D6"] // para el color del ✓

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
              c.hex.toUpperCase() === "#FFFFFF" || c.hex.toUpperCase() === "#FFF" ? "border border-border" : ["#000000", "#1A1A1A", "#0D2137"].includes(c.hex.toUpperCase()) ? "border-0 dark:border dark:border-border" : "border-0",
              sel && "ring-2 ring-primary ring-offset-2 ring-offset-card dark:ring-foreground",
              !sel && value.length >= max && "opacity-35"
            )}
            style={{ background: c.hex }}
          >
            {sel && (
              <span className="absolute inset-0 flex items-center justify-center">
                <Check className={cn("size-3", light ? "text-stone-900" : "text-stone-50")} />
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
