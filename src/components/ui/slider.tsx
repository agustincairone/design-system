import * as React from "react"
import { Slider as SliderPrimitive } from "radix-ui"
import { cn } from "@/lib/utils"

// Slider único del sistema (formularios y audio).
// Línea de 2px, punto de 12px y 4px de aire entre el punto y la línea a cada lado.
// Hover / apretado: aro sólido de 2px en el tono más oscuro del color (orange-700 en LOOP).
// El color sale de `color` o, si no, del de la app.

const THUMB = 12
const GAP = 4

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  color,
  style,
  onValueChange,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root> & { color?: string }) {
  const [inner, setInner] = React.useState(defaultValue ?? [min])
  const values = value ?? inner
  const single = values.length === 1 && props.orientation !== "vertical"
  const p = single ? (values[0] - min) / (max - min || 1) : 0

  // Centro del punto: Radix lo mantiene adentro de la línea (de 6px a ancho-6px).
  const c = `calc(${THUMB / 2}px + ${p} * (100% - ${THUMB}px))`
  const cut = THUMB / 2 + GAP
  const track = single
    ? `linear-gradient(to right, var(--ctl) 0, var(--ctl) calc(${c} - ${cut}px), transparent calc(${c} - ${cut}px), transparent calc(${c} + ${cut}px), var(--border) calc(${c} + ${cut}px))`
    : undefined

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      onValueChange={(v) => {
        if (value === undefined) setInner(v)
        onValueChange?.(v)
      }}
      style={
        {
          "--ctl": color ?? "var(--brand)",
          "--ctl-strong": color ? `color-mix(in oklch, ${color} 78%, black)` : "var(--brand-strong)",
          ...style,
        } as React.CSSProperties
      }
      className={cn(
        "group/slider relative flex h-5 w-full touch-none items-center select-none data-disabled:opacity-50 data-vertical:h-full data-vertical:min-h-40 data-vertical:w-5 data-vertical:flex-col",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className={cn(
          "relative grow rounded-full data-horizontal:h-0.5 data-horizontal:w-full data-vertical:h-full data-vertical:w-0.5",
          !single && "overflow-hidden bg-border"
        )}
        style={{ background: track }}
      >
        {!single && (
          <SliderPrimitive.Range data-slot="slider-range" className="absolute bg-(--ctl) data-horizontal:h-full data-vertical:w-full" />
        )}
      </SliderPrimitive.Track>
      {values.map((_, index) => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          key={index}
          className="block size-3 shrink-0 cursor-grab rounded-full bg-(--ctl) select-none hover:ring-2 hover:ring-(--ctl-strong) focus-visible:ring-2 focus-visible:ring-(--ctl-strong) focus-visible:outline-hidden active:cursor-grabbing active:ring-2 active:ring-(--ctl-strong) disabled:pointer-events-none"
        />
      ))}
    </SliderPrimitive.Root>
  )
}

export { Slider }
