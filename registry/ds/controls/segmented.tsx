import { cn } from "@/lib/utils"

// Píldora con opciones: la elegida resaltada en blanco. Es el único componente
// para elegir UNA opción entre pocas o cambiar de vista (15M · 1H, Año · Mes).
// Dos tamaños: normal (44px de alto) y chico (36px), los dos con letra de 14px.

export function Segmented<T extends string | number>({
  options,
  value,
  onChange,
  label,
  size = "default",
  className,
}: {
  options: { value: T; label: string }[]
  value: T
  onChange: (v: T) => void
  label?: string
  size?: "sm" | "default"
  className?: string
}) {
  return (
    <div
      data-slot="segmented"
      role="radiogroup"
      aria-label={label}
      className={cn("inline-flex items-center gap-0.5 rounded-full bg-secondary in-data-[variant=inset]:bg-raised", size === "sm" ? "p-[3px]" : "p-1", className)}
    >
      {options.map((o) => {
        const on = o.value === value
        return (
          <button
            key={String(o.value)}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => onChange(o.value)}
            className={cn(
              "rounded-full font-medium transition-[color,background-color,box-shadow] outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
              size === "sm" ? "h-[30px] px-3 text-sm" : "h-9 px-4 text-sm",
              on ? "bg-raised text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {o.label}
          </button>
        )
      })}
    </div>
  )
}
