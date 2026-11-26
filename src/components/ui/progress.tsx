import { cn } from "@/lib/utils"

// Barra de progreso (de no-coke): cuánto falta para la meta, ej: el próximo hito.
// Riel gris (el mismo de los campos hundidos) y el avance del color de la app, con las puntas redondas.
// `value` va de 0 a 1. Ocupa todo el ancho; lo que se escribe arriba y abajo lo pone la app.
export function Progress({ value, label, className }: { value: number; label?: string; className?: string }) {
  const pct = Math.round(Math.min(1, Math.max(0, value)) * 100)
  return (
    <div
      data-slot="progress"
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={pct}
      className={cn("h-2 w-full overflow-hidden rounded-full bg-inset", className)}
    >
      <div className="h-full rounded-full bg-brand transition-[width] duration-500" style={{ width: `${pct}%` }} />
    </div>
  )
}
