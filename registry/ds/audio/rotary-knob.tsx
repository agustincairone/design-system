import * as React from "react"
import { cn } from "@/lib/utils"
import { ParamButtons } from "@/components/audio/param-buttons"

// Perilla giratoria estilo consola.
// - Arrastrá hacia arriba/abajo (con Shift, más fino). Flechas del teclado. Doble clic: reset.
// - `bipolar`: el valor por defecto queda arriba (a las 12) y el arco sale desde ahí,
//   aunque el rango no sea simétrico (ej: EQ de -30 a +6).
// - Aro de 2px; el valor se marca con un punto de 4px.

const ARC = 270
const SIZE = 62 // px (48 + 30%)
const C = SIZE / 2
const R = 23.5

function polar(deg: number): [number, number] {
  const rad = ((deg - 90) * Math.PI) / 180
  return [C + R * Math.cos(rad), C + R * Math.sin(rad)]
}

function arcPath(from: number, to: number) {
  if (Math.abs(to - from) < 0.5) return ""
  const [a, b] = from < to ? [from, to] : [to, from]
  const [x1, y1] = polar(a)
  const [x2, y2] = polar(b)
  return `M ${x1} ${y1} A ${R} ${R} 0 ${b - a > 180 ? 1 : 0} 1 ${x2} ${y2}`
}

export function RotaryKnob({
  label,
  value,
  min,
  max,
  step = 0.5,
  defaultValue = 0,
  bipolar = true,
  format = String,
  onChange,
  color,
  off,
  onPower,
  soloed,
  onSolo,
  offText = "OFF",
  track = 2,
  className,
}: {
  label: string
  value: number
  min: number
  max: number
  step?: number
  defaultValue?: number
  bipolar?: boolean
  format?: (v: number) => string
  onChange: (v: number) => void
  color?: string
  off?: boolean
  onPower?: () => void
  soloed?: boolean
  onSolo?: () => void
  offText?: string
  track?: 2 | 4
  className?: string
}) {
  const drag = React.useRef<{ y: number; n: number } | null>(null)
  const clamp = (v: number) => Math.min(max, Math.max(min, v))
  const toNorm = (v: number) => {
    if (!bipolar) return (v - min) / (max - min)
    return v < defaultValue
      ? 0.5 * ((v - min) / (defaultValue - min))
      : 0.5 + 0.5 * ((v - defaultValue) / (max - defaultValue))
  }
  const fromNorm = (n: number) => {
    n = Math.min(1, Math.max(0, n))
    if (!bipolar) return min + n * (max - min)
    return n < 0.5
      ? min + (n / 0.5) * (defaultValue - min)
      : defaultValue + ((n - 0.5) / 0.5) * (max - defaultValue)
  }
  const angle = -ARC / 2 + toNorm(value) * ARC
  const zeroAngle = bipolar ? 0 : -ARC / 2
  const rad = ((angle - 90) * Math.PI) / 180
  const [px, py] = [C + 10.5 * Math.cos(rad), C + 10.5 * Math.sin(rad)]

  return (
    <div
      data-slot="rotary-knob"
      className={cn("flex w-[76px] flex-col items-center gap-1", className)}
      style={{ "--ctl": color ?? "var(--brand)" } as React.CSSProperties}
    >
      <span className="eyebrow max-w-full truncate">{label}</span>
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        role="slider"
        tabIndex={0}
        aria-label={label}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        className={cn(
          "size-[62px] cursor-ns-resize touch-none rounded-full outline-none focus-visible:ring-2 focus-visible:ring-(--ctl)",
          off && "opacity-30"
        )}
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId)
          drag.current = { y: e.clientY, n: toNorm(value) }
        }}
        onPointerMove={(e) => {
          if (!drag.current) return
          const fine = e.shiftKey ? 0.25 : 1
          const n = drag.current.n + ((drag.current.y - e.clientY) / 140) * fine
          onChange(clamp(Math.round(fromNorm(n) / step) * step))
        }}
        onPointerUp={() => (drag.current = null)}
        onPointerCancel={() => (drag.current = null)}
        onDoubleClick={() => onChange(defaultValue)}
        onKeyDown={(e) => {
          if (e.key === "ArrowUp" || e.key === "ArrowRight") onChange(clamp(value + step))
          else if (e.key === "ArrowDown" || e.key === "ArrowLeft") onChange(clamp(value - step))
          else return
          e.preventDefault()
        }}
      >
        <path d={arcPath(-ARC / 2, ARC / 2)} className="fill-none stroke-border" strokeWidth={track} strokeLinecap="round" />
        <path d={arcPath(zeroAngle, angle)} className="fill-none stroke-(--ctl)" strokeWidth={track} strokeLinecap="round" />
        <circle cx={C} cy={C} r={16.25} className="fill-secondary stroke-border" strokeWidth={1} />
        <circle cx={px} cy={py} r={2} className="fill-foreground" />
      </svg>
      <span
        className={cn(
          "live-number font-mono text-xs font-semibold",
          off && "text-muted-foreground",
          soloed && "text-brand-text"
        )}
      >
        {off ? offText : format(value)}
      </span>
      <ParamButtons off={off} onPower={onPower} soloed={soloed} onSolo={onSolo} />
    </div>
  )
}
