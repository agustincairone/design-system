import { cn } from "@/lib/utils"

// Rejilla de parlante (sólo decorativa): puntos de 4px en grilla, recortados en un círculo.
// Con `plate` va sobre una placa cuadrada gris; sin ella, directo sobre el fondo.
// Con `scatter`, algunos puntos al azar son gris clarito y otros del color de la app
// (el azar es fijo: siempre sale el mismo dibujo).

// número "al azar" pero fijo para cada punto
const rand = (k: number) => {
  let t = (k + 1) * 0x6d2b79f5
  t = Math.imul(t ^ (t >>> 15), t | 1)
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296
}

export function SpeakerGrille({
  size = 120,
  gap = 8,
  plate = true,
  scatter = false,
  className,
}: {
  /** lado de la placa en px */
  size?: number
  /** distancia entre puntos en px */
  gap?: number
  plate?: boolean
  scatter?: boolean
  className?: string
}) {
  const pad = plate ? size * 0.12 : 2
  const r = (size - pad * 2) / 2
  const c = size / 2
  const dots: [number, number][] = []
  const n = Math.floor(r / gap)
  const cut = (n - 0.45) * gap // recorte redondo, sin puntos sueltos en los bordes
  for (let i = -n; i <= n; i++) {
    for (let j = -n; j <= n; j++) {
      const x = c + i * gap
      const y = c + j * gap
      if (Math.hypot(x - c, y - c) <= cut) dots.push([x, y])
    }
  }
  return (
    <div
      data-slot="speaker-grille"
      aria-hidden="true"
      className={cn("shrink-0", plate && "rounded-box-m bg-secondary", className)}
      style={{ width: size, height: size }}
    >
      <svg viewBox={`0 0 ${size} ${size}`} className="size-full">
        {dots.map(([x, y], k) => {
          const base = plate ? "fill-foreground/75 dark:fill-black/70" : "fill-foreground/85"
          let cls = base
          if (scatter) {
            const v = rand(k)
            cls = v < 0.07 ? "fill-brand" : v < 0.3 ? "fill-muted-foreground/30" : base
          }
          return <circle key={k} cx={x} cy={y} r={2} className={cls} />
        })}
      </svg>
    </div>
  )
}
