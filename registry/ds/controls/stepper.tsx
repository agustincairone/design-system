import { Minus, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

// Stepper: − valor +. Para cantidades chicas (repeticiones, compases, cantidad).
// Fondo blanco, borde gris, − y + siempre del color de la app.

export function Stepper({
  value,
  min = -Infinity,
  max = Infinity,
  step = 1,
  format = String,
  onChange,
  label,
  className,
}: {
  value: number
  min?: number
  max?: number
  step?: number
  format?: (v: number) => string
  onChange: (v: number) => void
  label?: string
  className?: string
}) {
  const btn =
    "grid size-10 place-items-center rounded-full text-brand transition-colors outline-none hover:text-brand-strong focus-visible:text-brand-strong active:text-brand-strong disabled:pointer-events-none disabled:opacity-30 [&_svg]:size-3"
  return (
    <div
      data-slot="stepper"
      role="group"
      aria-label={label}
      className={cn("inline-flex h-10 items-center rounded-full border border-input bg-card", className)}
    >
      <button type="button" className={btn} aria-label="Decrease" disabled={value - step < min} onClick={() => onChange(Math.max(min, value - step))}>
        <Minus />
      </button>
      <span className="live-number min-w-6 text-center text-muted-foreground" aria-live="polite">
        {format(value)}
      </span>
      <button type="button" className={btn} aria-label="Increase" disabled={value + step > max} onClick={() => onChange(Math.min(max, value + step))}>
        <Plus />
      </button>
    </div>
  )
}
