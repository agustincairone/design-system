import { cn } from "@/lib/utils"

// Fichas: opciones en cuadraditos separados; la elegida se pinta del color de la app.
// Con `columns`, las fichas son rectángulos que llenan el ancho (y el alto, si le das altura
// al grupo, ej: flex-1 adentro de un AudioPanel), en esa cantidad de columnas.
// Para elegir UNA opción entre pocas cuando cada una es corta (4 · 8 · 5, 3/4 · 4/4).

export function TileGroup<T extends string | number>({
  options,
  value,
  onChange,
  label,
  columns,
  className,
}: {
  options: { value: T; label: string; hint?: string }[]
  value: T
  onChange: (v: T) => void
  label?: string
  columns?: number
  className?: string
}) {
  return (
    <div data-slot="tile-group" role="radiogroup" aria-label={label} className={cn(columns ? "grid auto-rows-fr gap-1.5" : "flex flex-wrap gap-1.5", className)}
      style={columns ? { gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` } : undefined}
    >
      {options.map((o) => {
        const on = o.value === value
        return (
          <button
            key={String(o.value)}
            type="button"
            role="radio"
            aria-checked={on}
            title={o.hint}
            onClick={() => onChange(o.value)}
            className={cn(
              columns ? "h-full min-h-12 w-full" : "h-10 min-w-10",
              "flex items-center justify-center rounded-box-s px-2 text-center text-sm font-medium whitespace-nowrap transition-colors outline-none focus-visible:ring-2 focus-visible:ring-brand",
              on
                ? "bg-brand text-brand-foreground hover:bg-brand-strong"
                : "bg-secondary text-foreground hover:bg-brand hover:text-brand-foreground in-data-[variant=inset]:bg-raised in-data-[variant=inset]:hover:bg-brand"
            )}
          >
            {o.label}
          </button>
        )
      })}
    </div>
  )
}
