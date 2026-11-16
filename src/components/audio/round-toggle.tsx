import { cn } from "@/lib/utils"

// Botón redondo de prender/apagar (como los de un equipo de audio).
// Prendido = color de la app. Apagado = disco oscuro (claro en modo oscuro)
// Siempre hay un punto de 4px arriba, a 10px del disco: oscuro si está apagado, gris clarito si está prendido.

export function RoundToggle({
  label,
  on,
  onToggle,
  size = 48,
  className,
}: {
  label: string
  on: boolean
  onToggle: () => void
  size?: number
  className?: string
}) {
  return (
    <div data-slot="round-toggle" className={cn("flex flex-col items-center gap-2", className)}>
      <span className={cn("dot mb-0.5 transition-colors", on ? "bg-muted-foreground/30" : "bg-foreground")} />
      <button
        type="button"
        aria-pressed={on}
        aria-label={label}
        onClick={onToggle}
        className={cn(
          "rounded-full transition-[background-color,transform] outline-none active:scale-95 focus-visible:ring-4 focus-visible:ring-ring/40",
          on ? "bg-brand" : "bg-foreground"
        )}
        style={{ width: size, height: size }}
      />
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  )
}
