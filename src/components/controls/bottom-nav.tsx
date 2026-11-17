import type { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"

// Barra de abajo de las apps de celular: caja blanca con íconos de 24px.
// Íconos centrados en la caja; la sección actual va del color de la app con el puntito (4px)
// apoyado abajo, a 8px del borde.

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
              "relative flex h-full flex-1 items-center justify-center transition-colors outline-none focus-visible:text-foreground",
              on ? "text-primary" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Icon className="size-6" />
            {on && <span className="dot absolute bottom-2 left-1/2 -translate-x-1/2 bg-primary" />}
          </button>
        )
      })}
    </nav>
  )
}
