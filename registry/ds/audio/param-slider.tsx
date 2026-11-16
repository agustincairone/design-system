import { cn } from "@/lib/utils"
import { Slider } from "@/components/ui/slider"
import { ParamButtons } from "@/components/audio/param-buttons"

// Slider de un parámetro de audio: etiqueta, botones ⏻/S, el slider del sistema y el valor.
// - Doble clic: vuelve al valor por defecto.
// - `log`: recorrido logarítmico (para frecuencias, tiempos).
// - `color`: color del control (por defecto, el de la app).
// - `layout="row"`: compacto, para apilar varios: arriba nombre · valor · botones, abajo el slider a lo ancho.

export function ParamSlider({
  label,
  value,
  min,
  max,
  step = 0.01,
  log = false,
  defaultValue,
  format = String,
  onChange,
  color,
  off,
  onPower,
  soloed,
  onSolo,
  offText = "OFF",
  layout = "stack",
  className,
}: {
  label: string
  value: number
  min: number
  max: number
  step?: number
  log?: boolean
  defaultValue?: number
  format?: (v: number) => string
  onChange: (v: number) => void
  color?: string
  off?: boolean
  onPower?: () => void
  soloed?: boolean
  onSolo?: () => void
  offText?: string
  layout?: "stack" | "row"
  className?: string
}) {
  const toPos = (v: number) =>
    log ? Math.log(v / min) / Math.log(max / min) : v
  const fromPos = (p: number) => (log ? min * Math.pow(max / min, p) : p)

  const slider = (
    <Slider
      aria-label={label}
      color={color}
      min={log ? 0 : min}
      max={log ? 1 : max}
      step={log ? 0.001 : step}
      value={[toPos(value)]}
      onValueChange={([p]) => onChange(fromPos(p))}
      onDoubleClick={() => defaultValue !== undefined && onChange(defaultValue)}
      className={cn(off && "opacity-30")}
    />
  )
  const valueText = (
    <span
      className={cn(
        "font-mono text-sm font-semibold live-number",
        layout === "row" && "shrink-0 text-right",
        off && "text-muted-foreground",
        soloed && "text-brand-text"
      )}
    >
      {off ? offText : format(value)}
    </span>
  )

  if (layout === "row") {
    return (
      <div
        data-slot="param-slider"
        className={cn("flex min-w-0 flex-col gap-1", className)}
      >
        <div className="flex min-h-6 items-center gap-2">
          <span className="min-w-0 flex-1 truncate eyebrow">{label}</span>
          {valueText}
          <ParamButtons
            off={off}
            onPower={onPower}
            soloed={soloed}
            onSolo={onSolo}
          />
        </div>
        {slider}
      </div>
    )
  }

  return (
    <div
      data-slot="param-slider"
      className={cn("flex min-w-0 flex-col gap-1", className)}
    >
      <div className="flex min-h-5 flex-wrap items-center justify-between gap-1">
        <span className="shrink-0 eyebrow">{label}</span>
        <ParamButtons
          off={off}
          onPower={onPower}
          soloed={soloed}
          onSolo={onSolo}
        />
      </div>
      {slider}
      {valueText}
    </div>
  )
}
