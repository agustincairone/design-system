import * as React from "react"
import type { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"

// Barra de abajo de las apps de celular, con íconos de 24px.
// Blanca cuando no hay nada detrás (la página entra entera o ya llegaste al final: todas las
// pantallas terminan con un espacio libre para la barra). Mientras pasa contenido por detrás,
// es de vidrio: casi transparente y desenfoca lo de atrás.
// Íconos centrados en la caja; la sección actual va del color de la app con el puntito (4px)
// justo sobre el borde de abajo: el borde lo corta a la mitad.

// ¿Ya no queda página por bajar? (= no hay nada pasando por detrás de la barra)
function useAtPageEnd(enabled: boolean) {
  const [atEnd, setAtEnd] = React.useState(true)
  React.useEffect(() => {
    if (!enabled) return
    const check = () => setAtEnd(window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2)
    check()
    window.addEventListener("scroll", check, { passive: true })
    window.addEventListener("resize", check)
    const ro = new ResizeObserver(check) // la página crece o se achica (ej: cargó la lista)
    ro.observe(document.body)
    return () => {
      window.removeEventListener("scroll", check)
      window.removeEventListener("resize", check)
      ro.disconnect()
    }
  }, [enabled])
  return atEnd
}

export function BottomNav<T extends string>({
  items,
  value,
  onChange,
  glass,
  className,
}: {
  items: { key: T; icon: LucideIcon; label?: string }[]
  value: T
  onChange: (k: T) => void
  /** Si no se pasa, se decide sola según la página. true / false la fuerzan (ej: en la guía) */
  glass?: boolean
  className?: string
}) {
  const atEnd = useAtPageEnd(glass === undefined)
  const isGlass = glass ?? !atEnd
  return (
    <nav data-slot="bottom-nav" className={cn("flex h-16 w-full items-center rounded-box-l backdrop-blur-glass transition-colors duration-200", isGlass ? "bg-glass" : "bg-card", className)}>
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
            {on && <span className="dot absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-primary" />}
          </button>
        )
      })}
    </nav>
  )
}
