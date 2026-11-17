import type { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"

// Barra de abajo de las apps de celular: caja blanca con íconos de 24px.
// La sección actual va del color de la app con el puntito (4px) debajo.

export function BottomNav<T extends string>({
  items,
  value,
  onChange,
  className,
}: {
  items: { key: T; icon: LucideIcon; label?: string }[]
  value: T
  onChange: (k: T) => void
  className?: string
}) {
  return (
    <nav data-slot="bottom-nav" className={cn("flex h-16 w-full items-center rounded-box-l bg-card", className)}>
      {items.map(({ key, icon: Icon, label }) => {
        const on = value === key
        return (
          <button
            key={key}
            type="button"
            aria-label={label}
            aria-current={on ? "page" : undefined}
            onClick={() => onChange(key)}
            className={cn(
              "flex h-full flex-1 flex-col items-center justify-center gap-1.5 transition-colors outline-none focus-visible:text-foreground",
              on ? "text-primary" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Icon className="size-6" />
            <span className={cn("dot", on ? "bg-primary" : "bg-transparent")} />
          </button>
        )
      })}
    </nav>
  )
}
