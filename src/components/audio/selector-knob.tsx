import { cn } from "@/lib/utils"

// Perilla de posiciones fijas (como "33 · 45 · 78" de un tocadiscos).
// Para elegir entre pocas opciones: compás, forma de onda, velocidad.
// Clic en una opción para ir directo; clic en la perilla o flechas para avanzar.
// La posición se marca con un punto de 4px y la opción elegida se pinta del color de la app (orange-600 en LOOP).

export function SelectorKnob<T extends string | number>({
  label,
  options,
  value,
  onChange,
  size = 72,
  className,
}: {
  label?: string
  options: { value: T; label: string }[]
  value: T
  onChange: (v: T) => void
  size?: number
  className?: string
}) {
  const count = options.length
  const spread = Math.min(270, Math.max(0, (count - 1) * 45))
  const angleOf = (i: number) => (count <= 1 ? 0 : -spread / 2 + (i / (count - 1)) * spread)
  const idx = Math.max(0, options.findIndex((o) => o.value === value))
  const box = size + 64
  const c = box / 2
  const go = (i: number) => onChange(options[(i + count) % count].value)

  return (
    <div data-slot="selector-knob" className={cn("flex flex-col items-center", className)}>
      <div className="relative" style={{ width: box, height: box }}>
        {options.map((o, i) => {
          const rad = ((angleOf(i) - 90) * Math.PI) / 180
          const r = size / 2 + 18
          return (
            <button
              key={String(o.value)}
              type="button"
              onClick={() => go(i)}
              className={cn(
                "absolute -translate-x-1/2 -translate-y-1/2 rounded-md px-1 font-mono text-xs transition-colors",
                i === idx ? "font-semibold text-brand" : "text-muted-foreground hover:text-foreground"
              )}
              style={{ left: c + r * Math.cos(rad), top: c + r * Math.sin(rad) }}
            >
              {o.label}
            </button>
          )
        })}
        <button
          type="button"
          aria-label={label ? `${label}: ${options[idx]?.label}` : options[idx]?.label}
          onClick={() => go(idx + 1)}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight" || e.key === "ArrowUp") go(idx + 1)
            else if (e.key === "ArrowLeft" || e.key === "ArrowDown") go(idx - 1)
            else return
            e.preventDefault()
          }}
          className="absolute rounded-full bg-foreground outline-none focus-visible:ring-4 focus-visible:ring-brand/30"
          style={{ left: c - size / 2, top: c - size / 2, width: size, height: size }}
        >
          <span
            className="absolute inset-0 transition-transform duration-200"
            style={{ transform: `rotate(${angleOf(idx)}deg)` }}
          >
            <span className="dot absolute top-[14%] left-1/2 -translate-x-1/2 bg-background" />
          </span>
        </button>
      </div>
      {label && <span className="-mt-3 text-sm text-muted-foreground">{label}</span>}
    </div>
  )
}
