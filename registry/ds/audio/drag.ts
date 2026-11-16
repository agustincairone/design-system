import * as React from "react"

// Arrastre con el puntero, compartido por los controles de audio.
// `onMove` recibe cuánto se movió desde que empezó (dx, dy en px) y el evento.

export function useDrag<T extends Element>(
  onStart: (e: React.PointerEvent<T>) => void,
  onMove: (dx: number, dy: number, e: React.PointerEvent<T>) => void
) {
  const start = React.useRef<{ x: number; y: number } | null>(null)
  const end = () => (start.current = null)
  return {
    onPointerDown(e: React.PointerEvent<T>) {
      e.currentTarget.setPointerCapture(e.pointerId)
      start.current = { x: e.clientX, y: e.clientY }
      onStart(e)
    },
    onPointerMove(e: React.PointerEvent<T>) {
      if (start.current) onMove(e.clientX - start.current.x, e.clientY - start.current.y, e)
    },
    onPointerUp: end,
    onPointerCancel: end,
  }
}

export const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v))
export const snap = (v: number, step: number) => Math.round(v / step) * step
