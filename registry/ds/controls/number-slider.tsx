import * as React from "react"
import { cn } from "@/lib/utils"
import { Slider } from "@/components/ui/slider"

// Nombre + número editable + slider. Podés escribir el número exacto o arrastrar.

export function NumberSlider({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  className,
}: {
  label: string
  value: number
  min: number
  max: number
  step?: number
  onChange: (v: number) => void
  className?: string
}) {
  const [draft, setDraft] = React.useState<string | null>(null)
  const id = React.useId()
  const commit = () => {
    if (draft === null) return
    const v = Number(draft.replace(",", "."))
    if (!Number.isNaN(v)) onChange(Math.min(max, Math.max(min, Math.round(v / step) * step)))
    setDraft(null)
  }
  return (
    <div data-slot="number-slider" className={cn("grid grid-cols-[minmax(0,6rem)_4rem_minmax(0,1fr)] items-center gap-3", className)}>
      <label htmlFor={id} className="truncate text-sm text-muted-foreground">
        {label}
      </label>
      <input
        id={id}
        inputMode="decimal"
        value={draft ?? String(value)}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === "Enter") (e.target as HTMLInputElement).blur()
          else if (e.key === "Escape") setDraft(null)
          else if (e.key === "ArrowUp") onChange(Math.min(max, value + step))
          else if (e.key === "ArrowDown") onChange(Math.max(min, value - step))
          else return
          e.preventDefault()
        }}
        className="live-number h-9 w-full rounded-full border border-transparent bg-secondary in-data-[variant=inset]:bg-raised px-3.5 font-mono text-sm outline-none focus-visible:border-brand"
      />
      <Slider aria-label={label} min={min} max={max} step={step} value={[value]} onValueChange={([v]) => onChange(v)} />
    </div>
  )
}
