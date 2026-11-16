import * as React from "react"
import { cn } from "@/lib/utils"
import { clamp } from "@/components/audio/drag"

// Pad circular: movés un punto y controlás DOS cosas a la vez
// (de izquierda a derecha = X, de abajo hacia arriba = Y). Valores de 0 a 1.
// Doble clic: vuelve al centro (o a los valores por defecto).

export function XYPad({
  x,
  y,
  onChange,
  labelX,
  labelY,
  defaultX = 0.5,
  defaultY = 0.5,
  size = 168,
  color,
  className,
}: {
  x: number
  y: number
  onChange: (x: number, y: number) => void
  labelX?: string
  labelY?: string
  defaultX?: number
  defaultY?: number
  size?: number
  color?: string
  className?: string
}) {
  const dragging = React.useRef(false)
  const puck = Math.round(size * 0.2)
  const R = size / 2 - puck / 2 - 4

  const setFrom = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    let dx = e.clientX - (r.left + r.width / 2)
    let dy = e.clientY - (r.top + r.height / 2)
    const d = Math.hypot(dx, dy)
    if (d > R) {
      dx = (dx / d) * R
      dy = (dy / d) * R
    }
    onChange(clamp((dx / R + 1) / 2, 0, 1), clamp((1 - dy / R) / 2, 0, 1))
  }

  // posición del punto (si el valor guardado cae fuera del círculo, lo acerca)
  let px = (x * 2 - 1) * R
  let py = -(y * 2 - 1) * R
  const d = Math.hypot(px, py)
  if (d > R) {
    px = (px / d) * R
    py = (py / d) * R
  }

  return (
    <div data-slot="xy-pad" className={cn("flex flex-col items-center gap-2", className)}>
      <div
        role="group"
        aria-label={[labelX, labelY].filter(Boolean).join(" y ")}
        className="relative cursor-crosshair touch-none rounded-full bg-secondary in-data-[variant=inset]:bg-card select-none"
        style={{ width: size, height: size }}
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId)
          dragging.current = true
          setFrom(e)
        }}
        onPointerMove={(e) => dragging.current && setFrom(e)}
        onPointerUp={() => (dragging.current = false)}
        onPointerCancel={() => (dragging.current = false)}
        onDoubleClick={() => onChange(defaultX, defaultY)}
      >
        <div className="absolute inset-[22%] rounded-full border border-border" />
        <div className="dot absolute top-1/2 left-1/2 -translate-1/2 bg-foreground" />
        <div
          className="absolute rounded-full shadow-sm"
          style={{
            width: puck,
            height: puck,
            left: size / 2 + px - puck / 2,
            top: size / 2 + py - puck / 2,
            background: color ?? "var(--brand)",
          }}
        />
      </div>
      {(labelX || labelY) && (
        <div className="flex gap-3 font-mono text-[11px] text-muted-foreground">
          {labelX && (
            <span>
              {labelX} <span className="live-number text-foreground">{Math.round(x * 100)}%</span>
            </span>
          )}
          {labelY && (
            <span>
              {labelY} <span className="live-number text-foreground">{Math.round(y * 100)}%</span>
            </span>
          )}
        </div>
      )}
    </div>
  )
}
