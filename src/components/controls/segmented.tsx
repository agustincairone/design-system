import type { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"

// Píldora con opciones: la elegida resaltada en blanco. Es el único componente
// para elegir UNA opción entre pocas o cambiar de vista (15M · 1H, Año · Mes).
// Dos tamaños: normal (44px de alto) y chico (36px), los dos con letra de 14px.
// Con `fill`, ocupa todo el ancho y las opciones se reparten el espacio en partes iguales.
// Cada opción puede llevar un ícono (`icon`) delante del texto; con `iconOnly` se ve sólo el ícono
// (el texto queda para el lector de pantalla). Ej: ver en grilla o en lista.

export function Segmented<T extends string | number>({
  options,
  value,
  onChange,
  label,
  size = "default",
  fill,
  iconOnly,
  className,
}: {
  options: { value: T; label: string; icon?: LucideIcon }[]
  value: T
  onChange: (v: T) => void
  label?: string
  size?: "sm" | "default"
  /** ocupar todo el ancho, con las opciones del mismo tamaño */
  fill?: boolean
  /** sólo los íconos, sin el texto */
  iconOnly?: boolean
  className?: string
}) {
  return (
    <div
      data-slot="segmented"
      role="radiogroup"
      aria-label={label}
      className={cn(fill ? "flex w-full" : "inline-flex", "items-center gap-0.5 rounded-full bg-secondary in-data-[variant=inset]:bg-raised", size === "sm" ? "p-[3px]" : "p-1", className)}
    >
      {options.map((o) => {
        const on = o.value === value
        return (
          <button
            key={String(o.value)}
            type="button"
            role="radio"
            aria-checked={on}
            aria-label={iconOnly ? o.label : undefined}
            title={iconOnly ? o.label : undefined}
            onClick={() => onChange(o.value)}
            className={cn(
              fill && "min-w-0 flex-1 truncate",
              "inline-flex items-center justify-center gap-1.5 rounded-full font-medium transition-[color,background-color,box-shadow] outline-none focus-visible:ring-2 focus-visible:ring-ring/50 [&_svg]:size-4 [&_svg]:shrink-0",
              size === "sm" ? "h-[30px] text-sm" : "h-9 text-sm",
              iconOnly ? (size === "sm" ? "w-[30px]" : "w-9") : size === "sm" ? "px-3" : "px-4",
              on ? "bg-raised text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {o.icon && <o.icon aria-hidden />}
            {!iconOnly && <span className="truncate">{o.label}</span>}
          </button>
        )
      })}
    </div>
  )
}
