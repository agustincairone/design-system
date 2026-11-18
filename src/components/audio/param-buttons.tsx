import { Headphones, Power } from "lucide-react"
import { cn } from "@/lib/utils"

// Botones chiquitos de cada control de audio:
//   ⏻  apagar ese control (bypass). Normal = ícono del color de la app.
//      Apretado (control apagado) = fondo del color de la app e ícono blanco.
//   🎧 escuchar sólo eso (solo), el mismo ícono que el solo del instrumento. Prendido = color de la app.
// No usan rojo: el rojo está reservado para borrar.

const base =
  "grid size-6 shrink-0 place-items-center rounded-full border bg-secondary font-mono text-xs leading-none font-bold [&_svg]:size-3 text-muted-foreground transition-colors hover:border-ring hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"

export function PowerButton({
  off,
  onToggle,
  className,
}: {
  off?: boolean
  onToggle: () => void
  className?: string
}) {
  return (
    <button
      type="button"
      data-slot="power-button"
      onClick={onToggle}
      title={off ? "Turn on" : "Turn off"}
      aria-pressed={!!off}
      className={cn(base, off ? "border-brand bg-brand text-brand-foreground hover:border-brand-strong hover:bg-brand-strong hover:text-brand-foreground" : "text-brand hover:text-brand-strong", className)}
    >
      <Power strokeWidth={2.25} />
    </button>
  )
}

export function SoloButton({
  soloed,
  onToggle,
  className,
}: {
  soloed?: boolean
  onToggle: () => void
  className?: string
}) {
  return (
    <button
      type="button"
      data-slot="solo-button"
      onClick={onToggle}
      title="Solo"
      aria-pressed={!!soloed}
      className={cn(base, soloed && "border-brand bg-brand text-brand-foreground hover:text-brand-foreground", className)}
    >
      <Headphones strokeWidth={2.25} />
    </button>
  )
}

export function ParamButtons({
  off,
  onPower,
  soloed,
  onSolo,
}: {
  off?: boolean
  onPower?: () => void
  soloed?: boolean
  onSolo?: () => void
}) {
  if (!onPower && !onSolo) return null
  return (
    <span className="inline-flex gap-1">
      {onPower && <PowerButton off={off} onToggle={onPower} />}
      {onSolo && <SoloButton soloed={soloed} onToggle={onSolo} />}
    </span>
  )
}
