// Guía, sección "Números en vivo".
import * as React from "react"
import { Minus, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Section } from "@/guide/layout"

// Ceros a la izquierda atenuados: "007" -> <span dim>00</span>7
function Dimmed({ value, digits }: { value: number; digits: number }) {
  const str = String(value).padStart(digits, "0")
  const firstReal = str.search(/[1-9]/)
  const cut = firstReal === -1 ? digits - 1 : firstReal
  return (
    <>
      <span className="opacity-25">{str.slice(0, cut)}</span>
      {str.slice(cut)}
    </>
  )
}

function LiveClock() {
  const [running, setRunning] = React.useState(true)
  const [secs, setSecs] = React.useState(83)
  React.useEffect(() => {
    if (!running) return
    const t = setInterval(() => setSecs((x) => x + 1), 1000)
    return () => clearInterval(t)
  }, [running])
  const m = Math.floor(secs / 60)
  const sec = secs % 60
  return (
    <div className="flex flex-col gap-3 rounded-3xl bg-card p-5">
      <span className="eyebrow">Tiempo · font-clock</span>
      <div className="live-number font-clock text-6xl leading-none sm:text-7xl">
        <Dimmed value={m} digits={2} />
        <span className="text-muted-foreground">:</span>
        {String(sec).padStart(2, "0")}
      </div>
      <div className="flex gap-2">
        <Button size="sm" variant={running ? "secondary" : "default"} onClick={() => setRunning((r) => !r)}>
          {running ? "Pausar" : "Seguir"}
        </Button>
        <Button size="sm" variant="ghost" onClick={() => setSecs(0)}>
          Reiniciar
        </Button>
      </div>
    </div>
  )
}

function LiveBpm() {
  const [bpm, setBpm] = React.useState(96)
  return (
    <div className="flex flex-col gap-3 rounded-3xl bg-card p-5">
      <span className="eyebrow">Valor en vivo · font-readout</span>
      <div className="flex items-baseline gap-2">
        <span className="live-number font-readout text-6xl font-bold leading-none sm:text-7xl">
          <Dimmed value={bpm} digits={3} />
        </span>
        <span className="text-sm text-brand">BPM</span>
      </div>
      <div className="flex gap-2">
        <Button size="icon" variant="secondary" aria-label="Menos" onClick={() => setBpm((b) => Math.max(40, b - 1))}>
          <Minus />
        </Button>
        <Button size="icon" variant="secondary" aria-label="Más" onClick={() => setBpm((b) => Math.min(240, b + 1))}>
          <Plus />
        </Button>
      </div>
    </div>
  )
}

export function NumerosSection() {
  return (
    <Section
      id="numeros"
      title="Números en vivo"
      description="Cuando un número cambia solo (un cronómetro, el BPM mientras lo movés), usa letra de puntitos: Geist Pixel Circle para tiempos y Doto para valores. Los ceros de adelante se ven apagados."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <LiveClock />
        <LiveBpm />
      </div>
    </Section>
  )
}
