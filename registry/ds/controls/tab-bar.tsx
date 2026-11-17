import { cn } from "@/lib/utils"

// Tab de ancho completo (diseño de outfit-tracker, con los colores del sistema).
// Para elegir entre MÁS DE 3 opciones (ej: las 6 categorías). Con 2 o 3 opciones
// se usa la píldora con opciones (Segmented).
// Va pegado arriba de una caja: la caja lleva overflow-hidden y la tab ocupa todo el ancho.
// La elegida va con el texto del color de la app y una raya de 4px abajo (más gruesa que la línea
// divisoria de 1px); las demás quedan en gris. Todas sobre el fondo de la caja.
// Cada opción puede llevar un segundo renglón chico (`sub`), ej: el total de esa pestaña.

export function TabBar<T extends string | number>({
  options,
  value,
  onChange,
  label,
  className,
}: {
  options: { value: T; label: string; sub?: string }[]
  value: T
  onChange: (v: T) => void
  label?: string
  className?: string
}) {
  return (
    <div data-slot="tab-bar" role="tablist" aria-label={label} className={cn("flex w-full shrink-0 border-b border-border", className)}>
      {options.map((o, i) => {
        const on = o.value === value
        return (
          <button
            key={String(o.value)}
            type="button"
            role="tab"
            aria-selected={on}
            onClick={() => onChange(o.value)}
            className={cn(
              "flex min-w-0 flex-1 flex-col items-center justify-center gap-0.5 px-2 py-4 text-sm transition-colors outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-inset",
              i < options.length - 1 && "border-r border-border",
              "relative bg-card after:absolute after:inset-x-0 after:-bottom-px after:h-1",
              on ? "font-medium text-brand-text after:bg-brand" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <span className="max-w-full truncate">{o.label}</span>
            {o.sub && <span className="max-w-full truncate text-xs font-normal text-muted-foreground">{o.sub}</span>}
          </button>
        )
      })}
    </div>
  )
}
