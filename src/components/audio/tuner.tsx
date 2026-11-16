import * as React from "react"
import { cn } from "@/lib/utils"
import { Minus, Plus } from "lucide-react"
import { clamp, snap, useDrag } from "@/components/audio/drag"
import { Button } from "@/components/ui/button"

// Sintonizador tipo radio: número grande arriba y una regla que se arrastra
// de costado debajo de una aguja fija. Ideal para valores precisos (BPM, frecuencia).
// Los ceros de adelante del número se ven apagados.
// Con `stepper`, aparecen botones − y + a los costados del número para ajustar de a uno.
// `children` va centrado abajo de la regla (ej: un botón Tap).

export function Tuner({
  label,
  value,
  min,
  max,
  step = 1,
  major = 10,
  digits = 3,
  decimals = 0,
  pxPerStep = 8,
  onChange,
  color,
  numberClassName,
  caption,
  stepper = false,
  className,
  children,
}: {
  label?: string
  value: number
  min: number
  max: number
  /** cuánto vale cada rayita */
  step?: number
  /** cada cuánto va una rayita larga con número */
  major?: number
  /** dígitos enteros que se muestran (con ceros apagados) */
  digits?: number
  decimals?: number
  pxPerStep?: number
  onChange: (v: number) => void
  color?: string
  /** clases extra para el número (ej: "font-readout") */
  numberClassName?: string
  /** texto debajo del número en lugar de `label` (ej: <><b>BPM</b> · bailable</>) */
  caption?: React.ReactNode
  stepper?: boolean
  className?: string
  children?: React.ReactNode
}) {
  const box = React.useRef<HTMLDivElement>(null)
  const [width, setWidth] = React.useState(320)
  React.useLayoutEffect(() => {
    const el = box.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setWidth(e.contentRect.width))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const startValue = React.useRef(value)
  const drag = useDrag<HTMLDivElement>(
    () => (startValue.current = value),
    (dx) =>
      onChange(
        clamp(
          snap(startValue.current - (dx / pxPerStep) * step, step),
          min,
          max
        )
      )
  )

  const fixed = value.toFixed(decimals)
  const [int, dec] = fixed.split(".")
  const padded = int.padStart(digits, "0")
  const firstReal = padded.search(/[1-9]/)
  const cut = firstReal === -1 ? digits - 1 : firstReal

  const half = Math.ceil(width / 2 / pxPerStep) + 1
  const center = Math.round(value / step)
  const ticks = []
  for (let k = center - half; k <= center + half; k++) {
    const v = k * step
    if (v < min - 1e-9 || v > max + 1e-9) continue
    const x = width / 2 + (v - value) * (pxPerStep / step)
    const isMajor = Math.abs(v / major - Math.round(v / major)) < 1e-6
    const isMid =
      !isMajor && Math.abs((2 * v) / major - Math.round((2 * v) / major)) < 1e-6
    ticks.push(
      <div
        key={k}
        className="absolute top-0"
        style={{ transform: `translateX(${x}px)` }}
      >
        <div
          className={cn(
            "w-px -translate-x-1/2",
            isMajor
              ? "h-7 bg-foreground/70"
              : isMid
                ? "h-5 bg-muted-foreground/60"
                : "h-3.5 bg-muted-foreground/40"
          )}
        />
        {isMajor && (
          <div className="mt-1.5 -translate-x-1/2 font-mono text-[10px] text-muted-foreground">
            {Number(v.toFixed(decimals))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div
      data-slot="tuner"
      className={cn(
        "flex w-full flex-col items-center gap-1 select-none",
        className
      )}
      style={{ "--ctl": color ?? "var(--brand)" } as React.CSSProperties}
    >
      {/* número + texto: si el sintonizador tiene alto de sobra (flex-1), quedan centrados
          en ese espacio y la regla queda abajo */}
      <div className="flex w-full flex-1 flex-col items-center justify-center gap-1">
        <div className="flex w-full items-center justify-center gap-2">
          {stepper && (
            <Button
              size="icon"
              variant="secondary"
              aria-label="Decrease"
              onClick={() =>
                onChange(clamp(snap(value - step, step), min, max))
              }
            >
              <Minus />
            </Button>
          )}
          <div
            className={cn(
              "flex-1 text-center text-6xl leading-none font-light live-number tracking-tighter",
              numberClassName
            )}
          >
            <span className="text-muted-foreground/40">
              {padded.slice(0, cut)}
            </span>
            {padded.slice(cut)}
            {dec !== undefined && <>.{dec}</>}
          </div>
          {stepper && (
            <Button
              size="icon"
              variant="secondary"
              aria-label="Increase"
              onClick={() =>
                onChange(clamp(snap(value + step, step), min, max))
              }
            >
              <Plus />
            </Button>
          )}
        </div>
        {caption ? (
          <div className="text-sm whitespace-nowrap text-muted-foreground">
            {caption}
          </div>
        ) : (
          label && <div className="text-sm text-muted-foreground">{label}</div>
        )}
      </div>
      <div
        ref={box}
        role="slider"
        tabIndex={0}
        aria-label={label}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        className="relative mt-3 h-14 w-full cursor-ew-resize touch-none overflow-hidden rounded-md [mask-image:linear-gradient(to_right,transparent,black_18%,black_82%,transparent)] outline-none focus-visible:bg-accent"
        {...drag}
        onWheel={(e) => {
          const d =
            Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY
          onChange(clamp(snap(value + Math.sign(d) * step, step), min, max))
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight" || e.key === "ArrowUp")
            onChange(clamp(snap(value + step, step), min, max))
          else if (e.key === "ArrowLeft" || e.key === "ArrowDown")
            onChange(clamp(snap(value - step, step), min, max))
          else return
          e.preventDefault()
        }}
      >
        {ticks}
        <div className="absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 rounded-full bg-(--ctl)" />
      </div>
      {children && <div className="mt-2 flex justify-center">{children}</div>}
    </div>
  )
}
