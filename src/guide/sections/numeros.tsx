// Guía, sección "Números en vivo".
import * as React from "react"
import { Minus, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { RollNumber } from "@/components/ui/roll-number"
import { Demo, Section } from "@/guide/layout"
import { HeroNumberDemo, ProgressDemo } from "@/guide/no-coke-demos"

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

// Número que gira al aparecer: como la deuda y el total del mes de pay
const money = (n: number) => "$" + Math.round(n).toLocaleString("es-AR")
const AMOUNTS = [758070, 1245300, 96480, 38250]

function RollNumberDemo() {
  const [spin, setSpin] = React.useState(0)
  const [i, setI] = React.useState(0)
  return (
    <div className="flex w-full flex-wrap items-center gap-box-m">
      <div className="w-full max-w-xs rounded-box-l bg-card p-box-m">
        <div className="text-sm font-medium">Total del mes</div>
        <RollNumber key={spin} value={AMOUNTS[i]} format={money} className="mt-box-2xs block text-2xl font-medium text-brand-text" />
      </div>
      <div className="flex gap-2">
        <Button size="sm" variant="secondary" onClick={() => setSpin((x) => x + 1)}>Volver a girar</Button>
        <Button size="sm" variant="secondary" onClick={() => setI((x) => (x + 1) % AMOUNTS.length)}>Cambiar de mes</Button>
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
      <div className="mt-4">
        <Demo uses={["ui/roll-number"]} label="Número que gira al aparecer: las cifras pasan por números al azar y en un segundo frenan en la real, de izquierda a derecha. Vuelve a girar cuando cambia el monto">
          <RollNumberDemo />
        </Demo>
      </div>
      <div className="mt-4 flex flex-col gap-4">
        <Demo uses={["ui/hero-number"]} label="Número grande de una pantalla (de no-coke): en puntitos de 96, gira al aparecer, con qué cuenta y una nota en píldora. Todo centrado, a 8px">
          <HeroNumberDemo />
        </Demo>
        <Demo uses={["ui/progress"]} label="Barra de progreso: riel gris y el avance del color de la app. Lo que va arriba y abajo lo escribe la app">
          <ProgressDemo />
        </Demo>
      </div>
    </Section>
  )
}
