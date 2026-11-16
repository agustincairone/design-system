import { cn } from "@/lib/utils"

// Selector segmentado: una píldora con opciones y la elegida resaltada en blanco.
// Para elegir UNA opción entre pocas (15M · 30M · 1H, 3/4 · 4/4 · 6/8).

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
      className={cn("inline-flex items-center gap-0.5 rounded-full bg-secondary in-data-[variant=inset]:bg-card p-1", className)}
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
              size === "sm" ? "h-7 px-3 text-xs" : "h-9 px-4 text-sm",
              on ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {o.label}
          </button>
        )
      })}
    </div>
  )
}
