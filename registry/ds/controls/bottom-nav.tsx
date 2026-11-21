import * as React from "react"
import type { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"

// Barra de abajo de las apps de celular, con íconos de 24px.
// Blanca cuando no hay nada detrás (la página entra entera o ya llegaste al final: todas las
// pantallas terminan con un espacio libre para la barra). Mientras pasa contenido por detrás,
// es de vidrio: casi transparente y desenfoca lo de atrás. El blanco aparece de a poco en los
// últimos 80px de la página, siguiendo el dedo, sin saltos.
// Íconos centrados en la caja; la sección actual va del color de la app con el puntito (4px)
// justo sobre el borde de abajo: el borde lo corta a la mitad.

const FADE_PX = 80

// Va poniendo la capa blanca de la barra según cuánto falta para el final de la página:
// nada mientras falten 80px o más, entera al llegar al final. Toca el estilo directo
// (sin volver a dibujar la app en cada movimiento).
function usePageEndFade(ref: React.RefObject<HTMLSpanElement | null>, enabled: boolean) {
  React.useLayoutEffect(() => {
    if (!enabled) return
    let frame = 0
    const update = () => {
      frame = 0
      const left = document.documentElement.scrollHeight - (window.innerHeight + window.scrollY)
      const white = Math.min(1, Math.max(0, 1 - left / FADE_PX))
      if (ref.current) ref.current.style.opacity = String(white)
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }
    update()
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)
    const ro = new ResizeObserver(schedule) // la página crece o se achica (ej: cargó la lista)
    ro.observe(document.body)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
      ro.disconnect()
    }
  }, [enabled, ref])
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
  const whiteRef = React.useRef<HTMLSpanElement>(null)
  usePageEndFade(whiteRef, glass === undefined)
  return (
    <nav data-slot="bottom-nav" className={cn("relative isolate flex h-16 w-full items-center rounded-box-l bg-glass backdrop-blur-glass", className)}>
      {/* capa blanca: aparece de a poco al llegar al final (con un suavizado corto) */}
      <span
        ref={whiteRef}
        aria-hidden
        className={cn("absolute inset-0 -z-10 rounded-box-l bg-card transition-opacity duration-300", glass === true && "opacity-0", glass === false && "opacity-100")}
      />
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
