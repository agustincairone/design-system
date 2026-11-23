// Guía, sección "Audio (LOOP)".
import * as React from "react"
import { Bell, Cloud, Drum, Guitar, Speaker, Zap } from "lucide-react"

import { AudioPanel } from "@/components/audio/audio-panel"
import { BarFader } from "@/components/audio/bar-fader"
import { Dial } from "@/components/audio/dial"
import { LevelMeter, paintMeter } from "@/components/audio/level-meter"
import { ParamButtons } from "@/components/audio/param-buttons"
import { ParamSlider } from "@/components/audio/param-slider"
import { RotaryKnob } from "@/components/audio/rotary-knob"
import { RoundToggle } from "@/components/audio/round-toggle"
import { SelectorKnob } from "@/components/audio/selector-knob"
import { SpeakerGrille } from "@/components/audio/speaker-grille"
import { Tuner } from "@/components/audio/tuner"
import { XYPad } from "@/components/audio/xy-pad"
import { FieldColumn } from "@/components/controls/field-column"
import { FieldSlider } from "@/components/controls/field-slider"
import { IconTile } from "@/components/controls/icon-tile"
import { Button } from "@/components/ui/button"
import { ControlCard, Section, Uses } from "@/guide/layout"

// Demo de los controles de audio, armada como un canal de LOOP.
type Ctl = { v: number; off: boolean; solo: boolean }
const ctl = (v: number): Ctl => ({ v, off: false, solo: false })

function AudioDemo() {
  const [p, setP] = React.useState<Record<string, Ctl>>({
    dur: ctl(1205), golpe: ctl(0.99), click: ctl(0.99),
    trim: ctl(0), hi: ctl(3), mid: ctl(-1), low: ctl(-18),
    pan: ctl(-0.38), eco: ctl(0.39), sala: ctl(0.57),
  })
  const [signal, setSignal] = React.useState(true)
  const meter = React.useRef<HTMLDivElement>(null)

  // Señal falsa para mostrar el vúmetro (en la app real viene del audio).
  React.useEffect(() => {
    if (!signal) return paintMeter(meter.current, 0)
    let level = 0, beat = 0
    const t = setInterval(() => {
      beat = (beat + 1) % 15
      const target = beat === 0 ? 0.75 + Math.random() * 0.3 : 0
      level = Math.max(target, level - 0.05)
      paintMeter(meter.current, level * 10)
    }, 33)
    return () => clearInterval(t)
  }, [signal])

  const set = (k: string, patch: Partial<Ctl>) => setP((s) => ({ ...s, [k]: { ...s[k], ...patch } }))
  const bind = (k: string, opts: { solo?: boolean } = {}) => ({
    value: p[k].v,
    onChange: (v: number) => set(k, { v }),
    off: p[k].off,
    onPower: () => set(k, { off: !p[k].off }),
    ...(opts.solo ? { soloed: p[k].solo, onSolo: () => set(k, { solo: !p[k].solo }) } : {}),
  })
  const pct = (v: number) => `${Math.round(v * 100)}%`
  const db = (v: number) => `${v > 0 ? "+" : ""}${Math.round(v)}dB`
  const pan = (v: number) => (Math.abs(v) < 0.02 ? "C" : `${v < 0 ? "I" : "D"}${Math.round(Math.abs(v) * 100)}`)

  return (
    <div className="grid gap-3 lg:grid-cols-[minmax(0,1.3fr)_auto_minmax(0,1fr)]">
      <AudioPanel title="Sonido">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(110px,1fr))] gap-x-4 gap-y-3">
          <ParamSlider label="Duración" min={50} max={3000} log defaultValue={600} format={(v) => `${Math.round(v)}ms`} {...bind("dur")} />
          <ParamSlider label="Golpe" min={0} max={1} defaultValue={0.5} format={pct} {...bind("golpe")} />
          <ParamSlider label="Click" min={0} max={1} defaultValue={0.5} format={pct} {...bind("click")} />
        </div>
      </AudioPanel>
      <AudioPanel title="Consola">
        <div className="flex items-start gap-3">
          <LevelMeter ref={meter} className="mt-1" />
          <RotaryKnob label="Trim" min={-12} max={12} defaultValue={0} format={db} value={p.trim.v} onChange={(v) => set("trim", { v })} off={p.trim.off} onPower={() => set("trim", { off: !p.trim.off })} />
          <div className="w-px self-stretch bg-border" />
          <RotaryKnob label="Hi" min={-30} max={6} format={db} {...bind("hi", { solo: true })} />
          <RotaryKnob label="Mid" min={-30} max={6} format={db} {...bind("mid", { solo: true })} />
          <RotaryKnob label="Low" min={-30} max={6} format={db} {...bind("low", { solo: true })} />
        </div>
      </AudioPanel>
      <AudioPanel title="Mezcla">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(96px,1fr))] gap-x-4 gap-y-3">
          <ParamSlider label="Pan" min={-1} max={1} defaultValue={0} format={pan} {...bind("pan")} />
          <ParamSlider label="Eco" min={0} max={1} defaultValue={0} format={pct} {...bind("eco", { solo: true })} />
          <ParamSlider label="Sala" min={0} max={1} defaultValue={0} format={pct} {...bind("sala", { solo: true })} />
        </div>
      </AudioPanel>
      <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground lg:col-span-3">
        <Button size="sm" variant="secondary" onClick={() => setSignal((x) => !x)}>
          {signal ? "Parar señal de prueba" : "Probar vúmetro"}
        </Button>
        <span className="inline-flex items-center gap-2">
          <ParamButtons off onPower={() => {}} /> apagado
        </span>
        <span className="inline-flex items-center gap-2">
          <ParamButtons soloed onSolo={() => {}} /> sólo esto
        </span>
        <span>Doble clic en cualquier control: vuelve al valor original. Perillas: arrastrá hacia arriba o abajo.</span>
      </div>
    </div>
  )
}

function MoreControls() {
  const [vol, setVol] = React.useState(55)
  const [swing, setSwing] = React.useState(51)
  const [tens, setTens] = React.useState(30)
  const [cut, setCut] = React.useState(-35)
  const [bpm, setBpm] = React.useState(94)
  const [sig, setSig] = React.useState("4/4")
  const [wave, setWave] = React.useState("tri")
  const [bars, setBars] = React.useState([0.65, 0, 1, 0.42, 0.24])
  const [barsOff, setBarsOff] = React.useState([false, false, false, true, false])
  const [xy, setXy] = React.useState({ x: 0.7, y: 0.35 })
  const [toggles, setToggles] = React.useState({ play: true, metro: false, loop: false })
  const days = ["1", "2", "3", "4", "5"]

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      <ControlCard uses={["audio/dial"]} name="Dial" use="Un valor importante, grande: volumen general, swing, cantidad de pasos.">
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Dial label="Volumen" value={vol} min={0} max={100} defaultValue={80} format={(v) => `${v}%`} onChange={setVol} />
          <div className="flex flex-col gap-4">
            <Dial label="Swing" variant="fill" value={swing} min={0} max={100} defaultValue={50} format={(v) => `${v}%`} onChange={setSwing} />
            <Dial label="De 10 en 10" variant="dots" step={10} ticks={10} value={tens} min={0} max={100} defaultValue={50} format={(v) => `${v}`} onChange={setTens} />
          </div>
        </div>
      </ControlCard>
      <ControlCard uses={["audio/tuner"]} name="Sintonizador" use="Valores precisos con muchas opciones: BPM, frecuencia.">
        <Tuner stepper label="BPM" value={bpm} min={40} max={240} step={1} major={10} digits={3} onChange={setBpm} />
      </ControlCard>
      <ControlCard uses={["audio/dial"]} name="Dial bipolar" use="Valores con un centro neutro que van a izquierda o derecha: filtro, paneo. Doble clic = centro.">
        <div className="flex flex-col items-center gap-2">
          <Dial bipolar variant="fill" label={cut === 0 ? "abierto" : cut < 0 ? "graves" : "agudos"} value={cut} min={-100} max={100} defaultValue={0} format={(v) => (v === 0 ? "0" : `${Math.abs(v)}`)} onChange={setCut} />
          <div className="flex w-36 justify-between eyebrow"><span>◀ izq</span><span>der ▶</span></div>
        </div>
      </ControlCard>
      <ControlCard uses={["audio/selector-knob"]} name="Selector" use="Pocas opciones fijas: compás, forma de onda.">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <SelectorKnob
            label="Compás"
            value={sig}
            onChange={setSig}
            options={[{ value: "3/4", label: "3/4" }, { value: "4/4", label: "4/4" }, { value: "6/8", label: "6/8" }]}
          />
          <SelectorKnob
            label="Onda"
            size={56}
            value={wave}
            onChange={setWave}
            options={[{ value: "sin", label: "SIN" }, { value: "tri", label: "TRI" }, { value: "saw", label: "SAW" }, { value: "sq", label: "SQR" }]}
          />
        </div>
      </ControlCard>
      <ControlCard uses={["audio/bar-fader"]} name="Barras" use="Varios valores lado a lado. Rayada = en 0. ⏻ apaga esa barra entera.">
        <div className="flex items-end gap-2">
          {bars.map((b, i) => (
            <BarFader
              key={i}
              label={days[i]}
              width={40}
              height={150}
              value={b}
              off={barsOff[i]}
              onPower={() => setBarsOff((s) => s.map((x, j) => (j === i ? !x : x)))}
              format={(v) => String(Math.round(v * 127))}
              onChange={(v) => setBars((s) => s.map((x, j) => (j === i ? v : x)))}
            />
          ))}
        </div>
      </ControlCard>
      <ControlCard uses={["audio/xy-pad"]} name="Pad XY" use="Dos cosas a la vez con un dedo: eco y sala, filtro.">
        <XYPad labelX="Eco" labelY="Sala" x={xy.x} y={xy.y} onChange={(x, y) => setXy({ x, y })} />
      </ControlCard>
      <ControlCard uses={["audio/speaker-grille"]} name="Rejilla de parlante" use="Sólo decorativa: le da a una app de música el look de un equipo.">
        <SpeakerGrille plate={false} scatter size={160} />
      </ControlCard>
      <ControlCard uses={["audio/round-toggle"]} name="Botón redondo" use="Prender y apagar: play, metrónomo, repetir.">
        <div className="flex gap-6">
          {(Object.keys(toggles) as (keyof typeof toggles)[]).map((k) => (
            <RoundToggle
              key={k}
              label={{ play: "play", metro: "metrónomo", loop: "repetir" }[k]}
              on={toggles[k]}
              onToggle={() => setToggles((t) => ({ ...t, [k]: !t[k] }))}
            />
          ))}
        </div>
      </ControlCard>
    </div>
  )
}

function EqColumns() {
  const [eq, setEq] = React.useState({ Hi: 0, Mid: -6, Low: 3 })
  const [off, setOff] = React.useState<Record<string, boolean>>({})
  const db = (v: number) => (v <= -29.5 ? "KILL" : `${v > 0 ? "+" : ""}${Math.round(v)}dB`)
  return (
    <div className="flex h-64 gap-4 rounded-box-m bg-inset p-box-m" data-variant="inset">
      {(Object.keys(eq) as (keyof typeof eq)[]).map((b) => (
        <FieldColumn
          key={b}
          label={b}
          value={db(eq[b])}
          off={off[b]}
          offText="KILL"
          buttons={<ParamButtons off={off[b]} onPower={() => setOff((o) => ({ ...o, [b]: !o[b] }))} onSolo={() => {}} />}
        >
          <FieldSlider orientation="vertical" hideText label={b} value={eq[b]} min={-30} max={6} defaultValue={0} format={db} onChange={(v) => setEq((e) => ({ ...e, [b]: v }))} />
        </FieldColumn>
      ))}
      <LevelMeter fill ref={(el) => paintMeter(el, 7)} />
    </div>
  )
}

// Piezas de LOOP: fichas con ícono (agregar un sonido) y la columna vertical del ecualizador
function LoopPiecesDemo() {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <ControlCard uses={["controls/icon-tile"]} name="Fichas con ícono" use="Elegir algo de un catálogo (ej: agregar un sonido). Llenan su columna y son cuadradas.">
        <div className="grid w-full max-w-xs grid-cols-3 gap-box-gap">
          {[["Kick", Speaker], ["Snare", Drum], ["Pluck", Guitar], ["Pad", Cloud], ["Laser", Zap], ["Bell", Bell]].map(([l, I]) => (
            <IconTile key={l as string} icon={I as typeof Bell} label={l as string} />
          ))}
        </div>
      </ControlCard>
      <ControlCard uses={["controls/field-column", "controls/field-slider", "audio/level-meter"]} name="Columna vertical" use="Nombre y valor arriba, el control en el medio, ⏻ y 🎧 abajo. Con el vúmetro lleno al costado.">
        <EqColumns />
      </ControlCard>
    </div>
  )
}

export function AudioSection() {
  return (
    <Section
      id="audio"
      title="Audio (LOOP)"
      description="Controles para apps de música: slider con valor, perillas, vúmetro y los botones ⏻ (apagar) y 🎧 (escuchar sólo eso). Toman el color de la app."
    >
      <AudioDemo />
      <Uses className="mt-3" pieces={["audio/audio-panel", "audio/param-slider", "audio/rotary-knob", "audio/level-meter", "audio/param-buttons"]} />
      <h3 className="mt-10 mb-3 font-medium">Más controles</h3>
      <MoreControls />
      <h3 className="mt-10 mb-3 font-medium">Piezas de LOOP</h3>
      <LoopPiecesDemo />
    </Section>
  )
}
