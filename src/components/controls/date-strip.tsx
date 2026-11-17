import { cn } from "@/lib/utils"

// Tira de días que se desliza (diseño outfit). Elegido = relleno del color principal;
// hoy = borde del color principal; con algo cargado ese día = puntito.

export type DayOption = { dateStr: string; dayName: string; label: string; isToday?: boolean; marked?: boolean }

export function DateStrip({
  days,
  value,
  onChange,
  className,
}: {
  days: DayOption[]
  value: string
  onChange: (d: string) => void
  className?: string
}) {
  return (
    <div data-slot="date-strip" className={cn("flex gap-2 overflow-x-auto py-1 [scrollbar-width:none]", className)}>
      {days.map((d) => {
        const sel = value === d.dateStr
        return (
          <button
            key={d.dateStr}
            type="button"
            data-today={d.isToday || undefined}
            aria-pressed={sel}
            onClick={() => onChange(d.dateStr)}
            className={cn(
              "relative flex min-w-[54px] shrink-0 flex-col items-center rounded-[8px] border px-3 py-2 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-brand",
              sel
                ? "border-primary bg-primary text-primary-foreground"
                : d.isToday
                  ? "border-primary bg-inset text-foreground"
                  : "border-border bg-card text-foreground hover:border-brand"
            )}
          >
            {d.marked && <span className={cn("dot absolute top-1.5 right-1.5", sel ? "bg-primary-foreground" : "bg-primary")} />}
            <span className="text-xs font-medium">{d.dayName.slice(0, 3)}</span>
            <span className={cn("mt-0.5 text-xs", sel ? "opacity-70" : "text-muted-foreground")}>{d.label}</span>
          </button>
        )
      })}
    </div>
  )
}
