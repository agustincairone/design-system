import * as React from "react"
import { cn } from "@/lib/utils"
import { clamp, snap } from "@/components/audio/drag"
import { PowerButton } from "@/components/audio/param-buttons"

// Barra vertical gruesa: tocás o arrastrás a la altura que querés. El número va adentro.
// - Se pinta del color de la app al pasar el mouse, mientras la movés y cuando está al máximo.
// - En 0 se ve rayada.
// - Con `accent`, el relleno es siempre del color de la app (para la barra principal, ej: volumen general).
// - Con `onPower` aparece abajo un botón ⏻ que apaga la variable entera (rayada + OFF).

const STRIPES =
  "repeating-linear-gradient(135deg, transparent 0 5px, color-mix(in oklch, var(--muted-foreground) 28%, transparent) 5px 6px)"

export function BarFader({
  label,
  value,
  min = 0,
  max = 1,
  step = 0.01,
  defaultValue,
  format = String,
  onChange,
  off,
  onPower,
  accent = false,
  color,
  height = 160,
  width = 56,
  className,
}: {
  label?: string
  value: number
  min?: number
  max?: number
  step?: number
  defaultValue?: number
  format?: (v: number) => string
  onChange: (v: number) => void
  off?: boolean
  onPower?: () => void
  accent?: boolean
  color?: string
  height?: number
  width?: number
  className?: string
}) {
  const [dragging, setDragging] = React.useState(false)
  const n = (value - min) / (max - min)
  const empty = n <= 0.0001
  const full = n >= 0.9999
  const setFrom = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    const p = clamp(1 - (e.clientY - r.top) / r.height, 0, 1)
    onChange(clamp(snap(min + p * (max - min), step), min, max))
  }
  const inside = n > 0.2
  const lit = accent || dragging || full

  return (
    <div
      data-slot="bar-fader"
      className={cn("flex flex-col items-center gap-2", className)}
      style={{ "--ctl": color ?? "var(--brand)" } as React.CSSProperties}
    >
      <div
        role="slider"
        tabIndex={off ? -1 : 0}
        aria-label={label}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-disabled={off}
        className={cn(
          "group/bar relative touch-none overflow-hidden rounded-xl bg-secondary in-data-[variant=inset]:bg-card outline-none select-none focus-visible:ring-4 focus-visible:ring-(--ctl)/30",
          off ? "cursor-not-allowed" : "cursor-ns-resize"
        )}
        style={{ width, height, ...((off || empty) && { backgroundImage: STRIPES }) }}
        onPointerDown={(e) => {
          if (off) return
          e.currentTarget.setPointerCapture(e.pointerId)
          setDragging(true)
          setFrom(e)
        }}
        onPointerMove={(e) => dragging && setFrom(e)}
        onPointerUp={() => setDragging(false)}
        onPointerCancel={() => setDragging(false)}
        onDoubleClick={() => !off && defaultValue !== undefined && onChange(defaultValue)}
        onKeyDown={(e) => {
          if (off) return
          if (e.key === "ArrowUp") onChange(clamp(value + step, min, max))
          else if (e.key === "ArrowDown") onChange(clamp(value - step, min, max))
          else return
          e.preventDefault()
        }}
      >
        {!off && !empty && (
          <div
            className={cn(
              "absolute inset-x-0 bottom-0 rounded-xl transition-colors",
              lit ? "bg-(--ctl)" : "bg-foreground group-hover/bar:bg-(--ctl)"
            )}
            style={{ height: `${n * 100}%` }}
          />
        )}
        <span
          className={cn(
            "live-number absolute inset-x-0 text-center font-mono text-xs font-semibold transition-colors",
            off || !inside
              ? off
                ? "text-muted-foreground"
                : "text-foreground"
              : lit
                ? "text-brand-foreground"
                : "text-background group-hover/bar:text-brand-foreground"
          )}
          style={
            off
              ? { top: "45%" }
              : inside
                ? { bottom: `calc(${n * 100}% - 1.6rem)` }
                : { bottom: `calc(${n * 100}% + 0.4rem)` }
          }
        >
          {off ? "OFF" : format(value)}
        </span>
      </div>
      {label && <span className="eyebrow">{label}</span>}
      {onPower && <PowerButton off={off} onToggle={onPower} />}
    </div>
  )
}
