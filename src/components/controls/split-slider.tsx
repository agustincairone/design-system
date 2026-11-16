import * as React from "react"
import { cn } from "@/lib/utils"

// Reparto entre dos cosas (ej: CAFÉ 37% | 63% LECHE, o seco/efecto, o izquierda/derecha).
// Arrastrás la rayita del medio. Doble clic = mitad y mitad.
// `value` es la parte de la izquierda, de 0 a 1.
// Si un lado queda muy angosto para leerse, su texto pasa arriba del slider
// (nombre en gris clarito; el número de la izquierda en el color de la app).

export function SplitSlider({
  value,
  onChange,
  left,
  right,
  defaultValue = 0.5,
  className,
}: {
  value: number
  onChange: (v: number) => void
  left: string
  right: string
  defaultValue?: number
  className?: string
}) {
  const dragging = React.useRef(false)
  const [active, setActive] = React.useState(false)
  const n = Math.min(1, Math.max(0, value))
  const setFrom = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    onChange(Math.round(Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)) * 100) / 100)
  }
  const pct = (v: number) => `${Math.round(v * 100)}%`
  const leftOut = n < 0.28
  const rightOut = n > 0.72
  const leftText = (
    <>
      <span className="opacity-80">{left}</span>
      <span className="live-number font-semibold">{pct(n)}</span>
    </>
  )
  const rightText = (
    <>
      <span className="live-number font-semibold">{pct(1 - n)}</span>
      <span className="opacity-60">{right}</span>
    </>
  )

  return (
    <div
      data-slot="split-slider"
      role="slider"
      tabIndex={0}
      aria-label={`${left} / ${right}`}
      aria-valuemin={0}
      aria-valuemax={1}
      aria-valuenow={n}
      aria-valuetext={`${left} ${pct(n)}, ${right} ${pct(1 - n)}`}
      className={cn("group/split relative flex h-12 w-full cursor-ew-resize touch-none items-center gap-1.5 font-mono text-sm uppercase outline-none select-none focus-visible:[&>[data-handle]]:bg-brand", className)}
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId)
        dragging.current = true
        setActive(true)
        setFrom(e)
      }}
      onPointerMove={(e) => dragging.current && setFrom(e)}
      onPointerUp={() => {
        dragging.current = false
        setActive(false)
      }}
      onPointerCancel={() => {
        dragging.current = false
        setActive(false)
      }}
      onDoubleClick={() => onChange(defaultValue)}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") onChange(Math.min(1, Math.round((n + 0.01) * 100) / 100))
        else if (e.key === "ArrowLeft") onChange(Math.max(0, Math.round((n - 0.01) * 100) / 100))
        else return
        e.preventDefault()
      }}
    >
      <div
        className={cn("flex h-full min-w-0 items-center gap-2 overflow-hidden rounded-xl bg-brand whitespace-nowrap text-brand-foreground", !leftOut && "px-4")}
        style={{ width: `calc(${n} * (100% - 0.75rem - 4px))` }}
      >
        {!leftOut && leftText}
      </div>
      <div
        data-handle
        className={cn(
          "h-10 w-1 shrink-0 rounded-full transition-colors",
          active ? "bg-brand" : "bg-foreground group-hover/split:bg-brand"
        )}
      />
      <div className={cn("flex h-full min-w-0 flex-1 items-center justify-end gap-2 overflow-hidden rounded-xl bg-secondary in-data-[variant=inset]:bg-card whitespace-nowrap", !rightOut && "px-4")}>
        {!rightOut && rightText}
      </div>
      {leftOut && (
        <div className="absolute bottom-full left-0 mb-2 flex gap-2 whitespace-nowrap">
          <span className="text-muted-foreground">{left}</span>
          <span className="live-number font-semibold text-brand">{pct(n)}</span>
        </div>
      )}
      {rightOut && (
        <div className="absolute right-0 bottom-full mb-2 flex gap-2 whitespace-nowrap">
          <span className="live-number font-semibold">{pct(1 - n)}</span>
          <span className="text-muted-foreground">{right}</span>
        </div>
      )}
    </div>
  )
}
