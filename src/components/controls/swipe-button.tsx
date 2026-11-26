import * as React from "react"
import { ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"

// Botón para deslizar (de no-coke): para algo que no se deshace fácil, ej: "Tuve una recaída".
// Del color de la app, con un círculo blanco y una flecha a la izquierda: el círculo sigue al dedo sin
// retraso y el blanco va llenando el botón (el texto cambia de color al pasar). Si lo soltás antes de
// llegar casi al final, vuelve suave al principio. Al llegar: vibra (en Android), llama a `onConfirm`
// enseguida y después de un momento vuelve solo al principio. Con el teclado: Enter o espacio.
// Mide como la barra de abajo (64px), del ancho de su lugar.
//
// El movimiento se pinta directo en una variable de estilo (--x), sin volver a dibujar la pieza en cada
// paso del dedo: por eso es fluido también en celulares lentos.
const KNOB = "3.5rem" // el círculo: el alto del botón menos el borde de 4px de cada lado
const DONE_AT = 0.85 // si lo soltás pasando el 85% del camino, termina solo

export function SwipeButton({ label, onConfirm, className }: { label: string; onConfirm: () => void; className?: string }) {
  const root = React.useRef<HTMLDivElement>(null)
  const inner = React.useRef<HTMLDivElement>(null)
  const s = React.useRef({ x: 0, grab: 0, travel: 0, dragging: false, done: false, raf: 0, timer: 0 })
  const confirm = React.useRef(onConfirm)
  React.useEffect(() => {
    confirm.current = onConfirm
  }, [onConfirm])
  React.useEffect(() => {
    const st = s.current
    return () => {
      cancelAnimationFrame(st.raf)
      window.clearTimeout(st.timer)
    }
  }, [])

  const paint = (x: number) => {
    s.current.x = x
    root.current?.style.setProperty("--x", `${x}px`)
  }

  // lleva el círculo hasta `to` en `ms`, frenando al final
  const glide = (to: number, ms: number, then?: () => void) => {
    cancelAnimationFrame(s.current.raf)
    const from = s.current.x
    const t0 = performance.now()
    const step = (now: number) => {
      const t = Math.min(1, (now - t0) / ms)
      paint(from + (to - from) * (1 - (1 - t) ** 3))
      if (t < 1) s.current.raf = requestAnimationFrame(step)
      else then?.()
    }
    s.current.raf = requestAnimationFrame(step)
  }

  const finish = () => {
    const st = s.current
    st.done = true
    st.dragging = false
    paint(st.travel)
    navigator.vibrate?.(20)
    confirm.current()
    st.timer = window.setTimeout(() => glide(0, 400, () => (st.done = false)), 700)
  }

  const onPointerDown = (e: React.PointerEvent) => {
    const st = s.current
    if (st.done || !inner.current) return
    e.currentTarget.setPointerCapture(e.pointerId)
    cancelAnimationFrame(st.raf)
    st.travel = inner.current.clientWidth - inner.current.clientHeight
    st.grab = e.clientX - st.x
    st.dragging = true
  }
  const onPointerMove = (e: React.PointerEvent) => {
    const st = s.current
    if (!st.dragging) return
    const x = Math.max(0, Math.min(st.travel, e.clientX - st.grab))
    paint(x)
    if (x >= st.travel - 1) finish()
  }
  const onPointerUp = () => {
    const st = s.current
    if (!st.dragging) return
    st.dragging = false
    if (st.x >= st.travel * DONE_AT) glide(st.travel, 120, finish)
    else glide(0, 350)
  }

  const fill = `calc(var(--x) + ${KNOB})`

  return (
    <div
      ref={root}
      data-slot="swipe-button"
      role="button"
      tabIndex={0}
      aria-label={`${label} (deslizá hasta el final para confirmar)`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          confirm.current()
        }
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      style={{ "--x": "0px" } as React.CSSProperties}
      className={cn(
        "h-16 w-full cursor-grab touch-none rounded-full bg-brand p-1 text-sm font-medium select-none outline-none focus-visible:ring-3 focus-visible:ring-ring/50 active:cursor-grabbing",
        className
      )}
    >
      <div ref={inner} className="relative h-full overflow-hidden rounded-full">
        <div aria-hidden className="absolute inset-0 rounded-full bg-brand-foreground" style={{ clipPath: `inset(0 calc(100% - ${fill}) 0 0 round 9999px)` }} />
        <div aria-hidden className="absolute inset-0 flex items-center justify-center text-brand-text" style={{ clipPath: `inset(0 calc(100% - ${fill}) 0 0)` }}>
          {label}
        </div>
        <div aria-hidden className="absolute inset-0 flex items-center justify-center text-brand-foreground" style={{ clipPath: `inset(0 0 0 ${fill})` }}>
          {label}
        </div>
        <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 flex aspect-square items-center justify-center" style={{ transform: "translateX(var(--x))" }}>
          <ArrowRight className="size-5 text-brand-text" />
        </div>
      </div>
    </div>
  )
}
