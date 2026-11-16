import * as React from "react"
import { cn } from "@/lib/utils"
import { clamp, snap, useDrag } from "@/components/audio/drag"

// Dial grande: recorre de abajo a la izquierda a abajo a la derecha (270°, como una perilla).
// Las marcas son puntos grises claros de 4px. El valor va en el centro.
// Arrastrá hacia arriba/abajo (Shift = fino), flechas, doble clic = valor por defecto.
// variant "line": una línea de 4px del color de la app va llenando el borde del círculo.
// variant "fill": la banda se pinta del color de la app, con puntas redondeadas;
//   los puntos que quedan debajo se pintan del tono fuerte (orange-700 en LOOP).
// variant "dots": sin borde ni banda; se van pintando los puntos hasta el valor.
// `bipolar`: el cero está arriba, en el medio. Se llena desde ahí hacia la izquierda
//   (valores negativos) o hacia la derecha (positivos). Ej: un filtro con centro = apagado.
// Se puede arrastrar de costado (derecha = más) o para arriba (arriba = más).
// `ticks`: cuántos espacios hay entre rayitas. Para un dial "de 10 en 10" de 0 a 100: step 10 y ticks 10.

const SIZE = 140 // todos los diales miden lo mismo, en todas las apps
const ARC = 270
const START = -ARC / 2 // abajo a la izquierda
const BAND = 41 // radio de la banda donde van las marcas

function pt(r: number, deg: number): [number, number] {
  const rad = ((deg - 90) * Math.PI) / 180
  return [50 + r * Math.cos(rad), 50 + r * Math.sin(rad)]
}

function arc(r: number, from: number, to: number) {
  if (to - from < 0.5) return ""
  const [x1, y1] = pt(r, from)
  const [x2, y2] = pt(r, to)
  return `M ${x1} ${y1} A ${r} ${r} 0 ${to - from > 180 ? 1 : 0} 1 ${x2} ${y2}`
}

export function Dial({
  label,
  value,
  min,
  max,
  step = 1,
  ticks = 8,
  defaultValue,
  format = String,
  onChange,
  variant = "line",
  bipolar = false,
  color,
  className,
}: {
  label?: string
  value: number
  min: number
  max: number
  step?: number
  ticks?: number
  defaultValue?: number
  format?: (v: number) => string
  onChange: (v: number) => void
  variant?: "line" | "fill" | "dots"
  bipolar?: boolean
  color?: string
  className?: string
}) {
  const startValue = React.useRef(value)
  const drag = useDrag<HTMLDivElement>(
    () => (startValue.current = value),
    (dx, dy, e) => {
      const fine = e.shiftKey ? 0.25 : 1
      onChange(clamp(snap(startValue.current + ((dx - dy) / 200) * (max - min) * fine, step), min, max))
    }
  )
  const n = (value - min) / (max - min)
  const angle = START + n * ARC
  // desde dónde se llena: abajo a la izquierda, o arriba al medio si es bipolar
  const from = bipolar ? Math.min(0, angle) : START
  const to = bipolar ? Math.max(0, angle) : angle
  const filled = bipolar ? Math.abs(angle) > 0.5 : n > 0
  const size = SIZE
  const edgeW = (4 * 100) / size // 4px reales, sea cual sea el tamaño del dial
  const edgeR = 50 - edgeW / 2
  const dotR = (2 * 100) / size // punto de 4px

  return (
    <div
      data-slot="dial"
      role="slider"
      tabIndex={0}
      aria-label={label}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      className={cn(
        "relative shrink-0 cursor-ns-resize touch-none rounded-full outline-none select-none focus-visible:ring-4 focus-visible:ring-(--ctl)/30",
        className
      )}
      style={
        {
          width: size,
          height: size,
          "--ctl": color ?? "var(--brand)",
          "--ctl-strong": color ? `color-mix(in oklch, ${color} 78%, black)` : "var(--brand-strong)",
        } as React.CSSProperties
      }
      {...drag}
      onDoubleClick={() => defaultValue !== undefined && onChange(defaultValue)}
      onKeyDown={(e) => {
        if (e.key === "ArrowUp" || e.key === "ArrowRight") onChange(clamp(value + step, min, max))
        else if (e.key === "ArrowDown" || e.key === "ArrowLeft") onChange(clamp(value - step, min, max))
        else return
        e.preventDefault()
      }}
    >
      <svg viewBox="0 0 100 100" className="absolute inset-0 size-full">
        <circle cx="50" cy="50" r="49" className="fill-card stroke-border" strokeWidth="0.75" />
        {variant === "fill" &&
          filled && (
            <path d={arc(BAND, from, to)} className="fill-none stroke-(--ctl)" strokeWidth="9" strokeLinecap="round" />
          )}
        <circle cx="50" cy="50" r="33" className="fill-secondary" />
        {Array.from({ length: ticks + 1 }, (_, i) => {
          const a = START + (i / ticks) * ARC
          const [x, y] = pt(BAND, a)
          const covered = variant !== "line" && filled && a >= from - 0.01 && a <= to + 0.01
          const on = variant === "fill" ? "fill-(--ctl-strong)" : "fill-(--ctl)"
          return (
            <circle key={i} cx={x} cy={y} r={dotR} className={covered ? on : "fill-muted-foreground/40"} />
          )
        })}
        {variant === "line" && filled && (
          <path d={arc(edgeR, from, to)} className="fill-none stroke-(--ctl)" strokeWidth={edgeW} strokeLinecap="round" />
        )}
      </svg>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <span className="live-number leading-none font-light tracking-tight" style={{ fontSize: size * 0.2 }}>
          {format(value)}
        </span>
        {label && <span className="mt-1 text-[11px] text-muted-foreground">{label}</span>}
      </div>
    </div>
  )
}
