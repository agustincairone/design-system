import * as React from "react"
import { toast } from "sonner"
import {
  Bell,
  Check,
  Cloud,
  Drum,
  Guitar,
  Headphones,
  Sparkles,
  Speaker,
  VolumeX,
  X,
  Zap,
  ChevronDown,
  Copy,
  CreditCard,
  LogOut,
  Minus,
  Plus,
  Settings,
  Shirt,
  Music,
  Wallet,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

import { useTheme } from "@/components/theme-provider"
import { ThemeToggle } from "@/components/theme-toggle"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { Chip, ChipGroup } from "@/components/ui/chip"
import { BottomSheet, ConfirmSheet } from "@/components/ui/bottom-sheet"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { BRANDS, type BrandId, applyBrand } from "@/brands"
import { PALETTE, SHADES } from "@/palette"
import { AudioPanel } from "@/components/audio/audio-panel"
import { LevelMeter, paintMeter } from "@/components/audio/level-meter"
import { ParamButtons } from "@/components/audio/param-buttons"
import { ParamSlider } from "@/components/audio/param-slider"
import { RotaryKnob } from "@/components/audio/rotary-knob"
import { BarFader } from "@/components/audio/bar-fader"
import { Dial } from "@/components/audio/dial"
import { RoundToggle } from "@/components/audio/round-toggle"
import { SelectorKnob } from "@/components/audio/selector-knob"
import { Tuner } from "@/components/audio/tuner"
import { XYPad } from "@/components/audio/xy-pad"
import { SpeakerGrille } from "@/components/audio/speaker-grille"
import { FieldSlider } from "@/components/controls/field-slider"
import { NumberSlider } from "@/components/controls/number-slider"
import { SplitSlider } from "@/components/controls/split-slider"
import { Stepper } from "@/components/controls/stepper"
import { TileGroup } from "@/components/controls/tile-group"
import { ExpandRow, ExpandRowItem } from "@/components/controls/expand-row"
import { IconTile } from "@/components/controls/icon-tile"
import { FieldColumn } from "@/components/controls/field-column"
import { FieldLabel } from "@/components/ui/field-label"
import { BottomNavDemo, ColorsDaysDemo, EmptyDemo, ItemCardsDemo, PickManyDemo, SavedValuesDemo, SheetsDemo, TabsDemo } from "@/guide-demos"
import { Rules } from "@/rules"
import { FloatAccordion } from "@/components/ui/float-accordion"
import { AppHero, LiveDate, SectionHeader } from "@/components/ui/app-hero"

// ---------------------------------------------------------------------------

function Section({
  id,
  title,
  description,
  children,
}: {
  id: string
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-20 border-t border-input py-12">
      <div className="mb-6">
        <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
        <p className="mt-1 max-w-prose text-sm text-muted-foreground">
          {description}
        </p>
      </div>
      {children}
    </section>
  )
}

function Demo({
  label,
  children,
  className = "",
}: {
  label: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-input">
      <div
        className={`flex flex-wrap items-center gap-3 bg-background p-6 ${className}`}
      >
        {children}
      </div>
      <div className="border-t border-input bg-muted/50 px-4 py-2 text-xs text-muted-foreground">
        {label}
      </div>
    </div>
  )
}

const TOKENS: { name: string; cls: string; note: string }[] = [
  { name: "background", cls: "bg-background", note: "Fondo de la página" },
  { name: "card", cls: "bg-card", note: "Tarjetas y paneles" },
  { name: "muted", cls: "bg-muted", note: "Zonas secundarias" },
  { name: "accent", cls: "bg-accent", note: "Hover y seleccionados" },
  { name: "inset", cls: "bg-inset", note: "Caja adentro de otra caja" },
  { name: "tile", cls: "bg-tile", note: "Fichas con foto" },
  { name: "raised", cls: "bg-raised", note: "Encima de inset/tile (en oscuro, un paso más claro)" },
  { name: "raised-2", cls: "bg-raised-2", note: "Encima de raised (ej: aviso de archivada sobre la foto)" },
  { name: "border", cls: "bg-border", note: "Divisores y bordes adentro de las cajas" },
  { name: "input", cls: "bg-input", note: "Borde de lo que va sobre la página: campos, botones con borde, chips" },
  { name: "muted-foreground", cls: "bg-muted-foreground", note: "Texto secundario" },
  { name: "foreground", cls: "bg-foreground", note: "Texto principal" },
  { name: "brand", cls: "bg-brand", note: "Acento de la app" },
  { name: "destructive", cls: "bg-destructive", note: "Borrar (siempre rojo)" },
  { name: "warning", cls: "bg-warning", note: "Atención (ej: medidor de LOOP)" },
  { name: "success", cls: "bg-success", note: "Todo bien (ej: medidor de LOOP)" },
  { name: "overlay", cls: "bg-overlay", note: "Fondo detrás de las hojas (negro transparente)" },
]

// Índice: agrupado por tipo
const NAV: [string, [string, string][]][] = [
  ["Fundamentos", [["reglas", "Reglas"], ["colores", "Colores"], ["tipografia", "Tipografía"], ["numeros", "Números en vivo"], ["cajas", "Espacios y cajas"]]],
  ["Componentes", [["fleje", "Fleje y títulos"], ["botones", "Botones"], ["formularios", "Formularios"], ["elegir", "Elegir opciones"], ["controles", "Controles"], ["listas", "Tarjetas y listas"], ["navegacion", "Navegación"], ["ventanas", "Ventanas y avisos"]]],
  ["Música", [["audio", "Audio (LOOP)"]]],
  ["Uso", [["usar", "Cómo usarlo"]]],
]

// Escala de letra (para la tabla de Tipografía)
const TYPE_SCALE: [string, string, string][] = [
  ["11", "text-2xs", "Piezas chicas: la nota de un paso, las fichas chicas, la tabla del historial"],
  ["13", "text-xs", "Texto chico, etiquetas"],
  ["15", "text-sm", "Texto base"],
  ["18", "text-lg", "Títulos de las hojas"],
  ["20", "text-xl", "Título de caja"],
  ["26", "text-2xl", "Montos importantes, número del fleje"],
  ["30", "text-3xl", "Emoji de las filas del inicio"],
  ["36", "text-4xl", "Números de la placa de LOOP"],
  ["48", "text-5xl", "Tempo y reloj de LOOP"],
]

// Escala de espacios (para Espacios y cajas)
const SPACE_SCALE: [number, string, string][] = [
  [4, "box-2xs", "Label arriba del campo"],
  [8, "box-xs", "Entre caja y caja (gap-box-gap)"],
  [12, "box-s", "Relleno de caja S"],
  [16, "box-m", "Relleno de caja M"],
  [20, "box-l", "Relleno de caja L"],
  [24, "box-xl", ""],
  [40, "section", "Entre bloques grandes"],
  [112, "screen-end", "Libre al final de cada pantalla"],
]

const ICONS: Record<BrandId, typeof Music> = {
  neutral: Settings,
  loop: Music,
  "pay-tracker": Wallet,
  "outfit-tracker": Shirt,
}

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

// Controles extra (para elegir después cuál usar en cada parámetro).
// Píldora con opciones en sus dos tamaños (va en Navegación)
// Fichas en sus dos tamaños (van en Elegir opciones)
function TilesDemo() {
  const [tile, setTile] = React.useState("4/4")
  const opts = ["4/4", "3/4", "6/8", "5/4", "7/8", "12/8"].map((v) => ({ value: v, label: v }))
  return (
    <div className="flex flex-wrap items-start gap-8">
      <TileGroup label="Compás" value={tile} onChange={setTile} options={opts} className="max-w-[150px] font-mono" />
      <TileGroup label="Compás a lo ancho" columns={3} value={tile} onChange={setTile} options={opts} className="w-72 font-mono" />
    </div>
  )
}

// Chips: sin ícono, con ícono, con cruz y en cada estado
function ChipsDemo() {
  const [on, setOn] = React.useState<string[]>(["Nike"])
  const [saved, setSaved] = React.useState(["Nike", "Adidas", "Vans"])
  const toggle = (v: string) => setOn((p) => (p.includes(v) ? p.filter((x) => x !== v) : [...p, v]))
  const Row = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
      <span className="eyebrow w-40 shrink-0">{label}</span>
      <ChipGroup className="items-center">{children}</ChipGroup>
    </div>
  )
  return (
    <div className="flex flex-col gap-4">
      <Row label="Sin ícono">
        <Chip>Apagado</Chip>
        <Chip selected>Elegido</Chip>
        <Chip disabled>Deshabilitado</Chip>
      </Row>
      <Row label="Con ícono">
        <Chip icon={Shirt}>Apagado</Chip>
        <Chip icon={Shirt} selected>Elegido</Chip>
        <Chip icon={Shirt} disabled>Deshabilitado</Chip>
      </Row>
      <Row label="Con cruz">
        <Chip onRemove={() => {}}>Apagado</Chip>
        <Chip selected onRemove={() => {}}>Elegido</Chip>
        <Chip icon={Wallet} onRemove={() => {}}>Con ícono</Chip>
      </Row>
      <Row label="Probalo: filtro">
        {["Todo", "Nike", "Adidas", "Vans"].map((b) => <Chip key={b} selected={on.includes(b)} onClick={() => toggle(b)}>{b}</Chip>)}
      </Row>
      <Row label="Probalo: guardados">
        {saved.map((b) => <Chip key={b} selected={on.includes(b)} onClick={() => toggle(b)} onRemove={() => setSaved((p) => p.filter((x) => x !== b))} removeLabel={"Borrar " + b}>{b}</Chip>)}
        {saved.length === 0 && <Button size="sm" variant="ghost" onClick={() => setSaved(["Nike", "Adidas", "Vans"])}>Volver a poner</Button>}
      </Row>
    </div>
  )
}

function LabelsDemo() {
  const Row = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
      <span className="eyebrow w-40 shrink-0">{label}</span>
      <div className="flex flex-wrap items-center gap-2">{children}</div>
    </div>
  )
  return (
    <div className="flex flex-col gap-4">
      <Row label="Sin ícono">
        <Badge>Principal</Badge>
        <Badge variant="secondary">Secundario</Badge>
        <Badge variant="outline">Con borde</Badge>
        <Badge variant="destructive">Peligro</Badge>
      </Row>
      <Row label="Con ícono">
        <Badge><Check /> Pagado</Badge>
        <Badge variant="secondary"><Shirt /> Remera</Badge>
        <Badge variant="outline"><Wallet /> Servicios</Badge>
        <Badge variant="destructive"><X /> Vencido</Badge>
      </Row>
    </div>
  )
}

// Mismo marco que Demo, con nombre y para qué sirve
function ControlCard({ name, use, children }: { name: string; use: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-input">
      <div className="flex min-h-56 flex-1 items-center justify-center bg-background p-6">{children}</div>
      <div className="border-t border-input bg-muted/50 px-4 py-2">
        <div className="text-sm font-medium">{name}</div>
        <div className="text-xs text-muted-foreground">{use}</div>
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
      <ControlCard name="Dial" use="Un valor importante, grande: volumen general, swing, cantidad de pasos.">
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Dial label="Volumen" value={vol} min={0} max={100} defaultValue={80} format={(v) => `${v}%`} onChange={setVol} />
          <div className="flex flex-col gap-4">
            <Dial label="Swing" variant="fill" value={swing} min={0} max={100} defaultValue={50} format={(v) => `${v}%`} onChange={setSwing} />
            <Dial label="De 10 en 10" variant="dots" step={10} ticks={10} value={tens} min={0} max={100} defaultValue={50} format={(v) => `${v}`} onChange={setTens} />
          </div>
        </div>
      </ControlCard>
      <ControlCard name="Sintonizador" use="Valores precisos con muchas opciones: BPM, frecuencia.">
        <Tuner stepper label="BPM" value={bpm} min={40} max={240} step={1} major={10} digits={3} onChange={setBpm} />
      </ControlCard>
      <ControlCard name="Dial bipolar" use="Valores con un centro neutro que van a izquierda o derecha: filtro, paneo. Doble clic = centro.">
        <div className="flex flex-col items-center gap-2">
          <Dial bipolar variant="fill" label={cut === 0 ? "abierto" : cut < 0 ? "graves" : "agudos"} value={cut} min={-100} max={100} defaultValue={0} format={(v) => (v === 0 ? "0" : `${Math.abs(v)}`)} onChange={setCut} />
          <div className="flex w-36 justify-between eyebrow"><span>◀ izq</span><span>der ▶</span></div>
        </div>
      </ControlCard>
      <ControlCard name="Selector" use="Pocas opciones fijas: compás, forma de onda.">
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
      <ControlCard name="Barras" use="Varios valores lado a lado. Rayada = en 0. ⏻ apaga esa barra entera.">
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
      <ControlCard name="Pad XY" use="Dos cosas a la vez con un dedo: eco y sala, filtro.">
        <XYPad labelX="Eco" labelY="Sala" x={xy.x} y={xy.y} onChange={(x, y) => setXy({ x, y })} />
      </ControlCard>
      <ControlCard name="Rejilla de parlante" use="Sólo decorativa: le da a una app de música el look de un equipo.">
        <SpeakerGrille plate={false} scatter size={160} />
      </ControlCard>
      <ControlCard name="Botón redondo" use="Prender y apagar: play, metrónomo, repetir.">
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

function ControlsDemo() {
  const [width, setWidth] = React.useState(3)
  const [radius, setRadius] = React.useState(347)
  const [count, setCount] = React.useState(1)
  const [rows, setRows] = React.useState(27)
  const [cols, setCols] = React.useState(54)
  const [mix, setMix] = React.useState(0.37)
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <ControlCard name="Campo-slider" use="Arrastrás de costado en cualquier parte. Con pocos valores, muestra un punto por cada uno.">
        <div className="grid w-full max-w-sm gap-3">
          <FieldSlider label="Ancho" value={width} min={1} max={8} defaultValue={3} onChange={setWidth} />
          <FieldSlider label="Radio" value={radius} min={0} max={500} defaultValue={250} onChange={setRadius} />
        </div>
      </ControlCard>
      <ControlCard name="Campo-slider vertical" use="La misma píldora parada: se arrastra para arriba o para abajo.">
        <div className="flex h-56 gap-3">
          <FieldSlider orientation="vertical" label="Ancho" value={width} min={1} max={8} defaultValue={3} onChange={setWidth} />
          <FieldSlider orientation="vertical" label="Radio" value={radius} min={0} max={500} defaultValue={250} onChange={setRadius} />
        </div>
      </ControlCard>
      <ControlCard name="Stepper" use="Cantidades chicas (− 1 +).">
        <div className="flex flex-col items-center gap-5">
          <Stepper label="Cantidad" value={count} min={0} max={16} onChange={setCount} />
        </div>
      </ControlCard>
      <ControlCard name="Número + slider" use="Podés escribir el número exacto o arrastrar.">
        <div className="grid w-full max-w-sm gap-3">
          <NumberSlider label="Filas" value={rows} min={1} max={64} onChange={setRows} />
          <NumberSlider label="Columnas" value={cols} min={1} max={64} onChange={setCols} />
        </div>
      </ControlCard>
      <ControlCard name="Reparto entre dos" use="Cuánto de cada cosa: seco/efecto, izquierda/derecha. Doble clic = mitad y mitad.">
        <SplitSlider left="Seco" right="Efecto" value={mix} onChange={setMix} className="max-w-sm" />
      </ControlCard>
    </div>
  )
}


// Piezas de LOOP: fichas con ícono (agregar un sonido) y la columna vertical del ecualizador
function LoopPiecesDemo() {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <ControlCard name="Fichas con ícono" use="Elegir algo de un catálogo (ej: agregar un sonido). Llenan su columna y son cuadradas.">
        <div className="grid w-full max-w-xs grid-cols-3 gap-box-gap">
          {[["Kick", Speaker], ["Snare", Drum], ["Pluck", Guitar], ["Pad", Cloud], ["Laser", Zap], ["Bell", Bell]].map(([l, I]) => (
            <IconTile key={l as string} icon={I as typeof Bell} label={l as string} />
          ))}
        </div>
      </ControlCard>
      <ControlCard name="Columna vertical" use="Nombre y valor arriba, el control en el medio, ⏻ y 🎧 abajo. Con el vúmetro lleno al costado.">
        <EqColumns />
      </ControlCard>
    </div>
  )
}

// Filas que se abren (ej: gastos por mes en Análisis de pay)
function ExpandRowsDemo() {
  return (
    <div className="w-full max-w-sm">
        <ExpandRow defaultOpen title="Noviembre 2026" sub="IPC 2,2%" right={<span className="font-medium text-brand-text">$758.070</span>}>
          <ExpandRow defaultOpen title="🏠 Casa" right={<span className="font-medium text-muted-foreground">$561.770</span>}>
            <ExpandRowItem label="🛒 Supermercado" value="$320.000" />
            <ExpandRowItem label="⚡ Servicios" value="$241.770" />
          </ExpandRow>
          <ExpandRow title="🤖 Personal" right={<span className="font-medium text-muted-foreground">$76.300</span>}>
            <ExpandRowItem label="💊 Farmacia" value="$76.300" />
          </ExpandRow>
        </ExpandRow>
        <ExpandRow title="Octubre 2026" sub="IPC 2,7%" right={<span className="font-medium text-brand-text">$638.070</span>}>
          <ExpandRowItem label="🛒 Supermercado" value="$638.070" />
        </ExpandRow>
        <ExpandRow title="Septiembre 2026" sub="Sin gastos para abrir" right={<span className="font-medium text-brand-text">$0</span>} />
      </div>
  )
}

// ---------------------------------------------------------------------------

export function App() {
  const [confirmOpen, setConfirmOpen] = React.useState(false)
  const [sheetOpen, setSheetOpen] = React.useState(false)
  const { resolvedTheme } = useTheme()
  const [brand, setBrand] = React.useState<BrandId>("neutral")
  const [volume, setVolume] = React.useState([70])

  React.useEffect(() => applyBrand(brand, resolvedTheme), [brand, resolvedTheme])

  return (
    <div className="min-h-svh">
      {/* Barra superior */}
      <header className="sticky top-0 z-20 border-b border-input bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center gap-4 px-4">
          <div className="flex items-center gap-2">
            <div className="size-5 rounded-full bg-brand" />
            <span className="font-semibold tracking-tight">Sistema de diseño</span>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-[180px_1fr]">
        {/* Índice */}
        <nav className="sticky top-14 hidden h-fit py-12 md:block">
          <div className="flex flex-col gap-6 text-sm">
            {NAV.map(([group, items]) => (
              <div key={group}>
                <p className="eyebrow mb-2 px-2">{group}</p>
                <ul className="space-y-1">
                  {items.map(([id, label]) => (
                    <li key={id}>
                      <a
                        href={`#${id}`}
                        className="block rounded-md px-2 py-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </nav>

        <main className="min-w-0 pb-24">
          {/* Portada */}
          <div className="py-12">
            <h1 className="text-4xl font-semibold tracking-tighter sm:text-5xl">
              Una sola forma de diseñar,
              <br />
              <span className="text-muted-foreground">para todas tus apps.</span>
            </h1>
            <p className="mt-4 max-w-prose text-muted-foreground">
              Misma tipografía, mismos grises, mismos componentes. Cada app
              tiene su propio color de acento. Elegí uno para ver cómo queda:
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {(Object.keys(BRANDS) as BrandId[]).map((id) => {
                const b = BRANDS[id]
                const Icon = ICONS[id]
                const active = brand === id
                return (
                  <button
                    key={id}
                    onClick={() => setBrand(id)}
                    className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition-colors ${
                      active
                        ? "border-foreground bg-accent text-foreground"
                        : "border-input text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span
                      className="size-3 rounded-full border"
                      style={{ background: b.light.brand }}
                    />
                    <Icon className="size-3.5" />
                    {b.name}
                  </button>
                )
              })}
            </div>
          </div>

          <Section
            id="reglas"
            title="Reglas"
            description="Las decisiones del sistema en un solo lugar. Toda app nueva las sigue."
          >
            <Rules />
          </Section>

          <Section
            id="colores"
            title="Colores"
            description="La base es gris cálido (stone), en claro y en oscuro. Cada app usa UN solo color de la paleta como acento. El rojo queda reservado para borrar y errores, en todas las apps."
          >
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {TOKENS.map((t) => (
                <div key={t.name} className="overflow-hidden rounded-2xl border border-input bg-card">
                  <div className={`h-16 ${t.cls}`} />
                  <div className="p-3">
                    <div className="font-mono text-xs">{t.name}</div>
                    <div className="mt-0.5 text-xs text-muted-foreground">{t.note}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 mb-3 flex items-baseline justify-between gap-4">
              <h3 className="font-medium">Paleta completa</h3>
              <span className="eyebrow">50 → 950</span>
            </div>
            <div className="overflow-x-auto rounded-2xl border border-input bg-card p-4">
              <div className="grid min-w-[560px] gap-1.5">
                {Object.entries(PALETTE).map(([name, shades]) => {
                  const tag =
                    name === "red" ? "borrar" : name === "orange" ? "LOOP · 600" : name === "stone" ? "base" : ""
                  return (
                    <div key={name} className="grid grid-cols-[88px_repeat(11,1fr)] items-center gap-1.5">
                      <div className="font-mono text-xs">
                        {name}
                        {tag && <div className="text-2xs text-brand-text">{tag}</div>}
                      </div>
                      {SHADES.map((sh) => (
                        <div
                          key={sh}
                          title={`${name}-${sh}`}
                          className={`h-7 rounded-md ${
                            (name === "orange" && sh === "600") || (name === "red" && sh === "600")
                              ? "ring-2 ring-foreground ring-offset-2 ring-offset-card"
                              : ""
                          }`}
                          style={{ background: shades[sh] }}
                        />
                      ))}
                    </div>
                  )
                })}
                <div className="grid grid-cols-[88px_repeat(11,1fr)] gap-1.5 pt-1">
                  <div />
                  {SHADES.map((sh) => (
                    <div key={sh} className="text-center font-mono text-2xs text-muted-foreground">
                      {sh}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Section>

          <Section
            id="tipografia"
            title="Tipografía"
            description="Geist para todo el texto, Geist Mono para etiquetas. Los tamaños salen sólo de esta escala; si algo tiene que ser más grande, se sube un paso entero."
          >
            <div className="mb-4 divide-y rounded-3xl bg-card">
              {TYPE_SCALE.map(([px, cls, use]) => (
                <div key={cls} className="grid items-center gap-3 p-4 sm:grid-cols-[180px_1fr]">
                  <div>
                    <div className="text-sm font-medium">{px}px</div>
                    <div className="font-mono text-xs text-muted-foreground">{cls}</div>
                  </div>
                  <div className="flex min-w-0 items-baseline gap-4">
                    <span className={`${cls} shrink-0 leading-none font-medium`}>Aa</span>
                    <span className="truncate text-xs text-muted-foreground">{use}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="divide-y rounded-3xl bg-card">
              {[
                ["Título de página", "Geist semibold, 40px (clase title-page)", <div className="title-page">Mis pagos</div>],
                ["Título de caja", "Geist semibold, 20px (clase title-box)", <div className="title-box">Agregar un sonido</div>],
                ["Número grande quieto", "Geist light, muy grande", <div className="live-number text-6xl font-light tracking-tighter">$ 125.430<span className="text-muted-foreground">,50</span></div>],
                ["Etiqueta", "Geist Mono, mayúsculas, 13px (clase eyebrow). La usa LOOP.", <span className="eyebrow">Total del mes</span>],
                ["Monto importante", "Geist medium, 26px (text-2xl). Deuda, total del mes.", <div className="text-2xl font-medium text-brand-text">$758.070</div>],
                ["Número de la placa", "36px (text-4xl). Los números quietos de la placa de LOOP: canales y pasos.", <span className="live-number font-readout text-4xl leading-none font-bold">16</span>],
                ["Número grande de pantalla", "48px (text-5xl). El tempo y el reloj de LOOP.", <span className="live-number font-readout text-5xl font-bold">110</span>],
                ["Nota mini", "11px (text-2xs). Sólo para piezas chicas: la nota de un paso de LOOP, las fichas chicas y la tabla del historial de outfit.", <span className="font-mono text-2xs font-semibold">C#2</span>],
                ["Emoji de fila", "30px (text-3xl). El emoji al principio de cada fila del inicio (los grupos de pay).", <span className="text-3xl leading-none">🏠</span>],
                ["Emoji grande", "48px (text-emoji). Un solo tamaño, para pantallas especiales: login, error, unirse a un grupo.", <span className="text-emoji">🔒</span>],
                ["Valor de un control", "Geist Mono semibold, 15px", <span className="live-number font-mono text-sm font-semibold">450ms · +3dB · 60%</span>],
                ["Texto", "Geist regular", <p className="max-w-prose">Texto normal para párrafos y descripciones, cómodo en el celular.</p>],
                ["Unidad / ayuda", "Chico y gris", <span className="text-sm text-muted-foreground">120 BPM · actualizado hace 2 min</span>],
                ["Link", "Color de la app", <a href="#tipografia" className="text-sm font-medium text-brand-text underline-offset-4 hover:underline">Ver detalle →</a>],
              ].map(([role, how, sample]) => (
                <div key={role as string} className="grid gap-3 p-5 sm:grid-cols-[180px_1fr] sm:items-center">
                  <div>
                    <div className="text-sm font-medium">{role}</div>
                    <div className="text-xs text-muted-foreground">{how}</div>
                  </div>
                  <div className="min-w-0">{sample}</div>
                </div>
              ))}
            </div>
          </Section>

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

          <Section
            id="cajas"
            title="Espacios y cajas"
            description="Todos los espacios salen de esta escala. Las cajas nunca llevan borde: se separan sólo por el color de fondo. El relleno de cada caja es L 20, M 16 o S 12, según lo que le quede mejor."
          >
            <div className="mb-4 divide-y rounded-3xl bg-card">
              {SPACE_SCALE.map(([px, token, use]) => (
                <div key={token} className="grid items-center gap-3 p-4 sm:grid-cols-[180px_1fr]">
                  <div>
                    <div className="text-sm font-medium">{px}px</div>
                    <div className="font-mono text-xs text-muted-foreground">{token}</div>
                  </div>
                  <div className="flex min-w-0 items-center gap-4">
                    <span className="h-3 shrink-0 rounded-bar bg-brand" style={{ width: px }} />
                    <span className="truncate text-xs text-muted-foreground">{use}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-box-l bg-card p-box-l">
              <p className="eyebrow mb-3">L · esquinas 16 · relleno 20</p>
              <div className="grid gap-box-gap sm:grid-cols-2">
                <div className="rounded-box-m bg-inset p-box-m">
                  <p className="eyebrow mb-3">M · esquinas 16 · relleno 16</p>
                  <div className="flex gap-3">
                    <div className="rounded-box-s bg-card p-box-s">
                      <p className="eyebrow">S · 12 · 12</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-box-m bg-inset p-box-m">
                  <p className="eyebrow mb-1">Clases</p>
                  <p className="font-mono text-sm">rounded-box-s · m · l</p>
                  <p className="font-mono text-sm">p-box-s · m · l</p>
                  <p className="font-mono text-sm">gap-box-gap (8px entre cajas)</p>
                  <p className="font-mono text-sm">gap-section (40px entre bloques)</p>
                  <p className="mt-2 text-sm text-muted-foreground">Un AudioPanel con variant="inset" ya es una caja M.</p>
                </div>
              </div>
            </div>
          </Section>

          <Section
            id="fleje"
            title="Fleje y títulos"
            description="El título de cada app, igual en todas: nombre, nombre en japonés, un texto gris y un número general en letra de puntitos. Cada sección lleva su título con un dato a la derecha. Achicá la ventana para ver cómo se acomoda en el celular."
          >
            <div className="grid grid-cols-1 gap-box-gap">
              <div className="rounded-box-l bg-card p-box-l">
                <AppHero name="Loop" jp="ループ — リズムマシン" description="16-step sampler composer" stats={[{ value: 6, label: "channels", digits: 2 }, { value: 16, label: "steps", digits: 2 }]} />
              </div>
              <div className="rounded-box-l bg-card p-box-l">
                <AppHero name="Outfit" jp="コーデ日記" stats={[{ value: <LiveDate />, label: "registro diario de outfits" }]} />
              </div>
              <div className="grid gap-box-gap rounded-box-l bg-card p-box-l">
                <SectionHeader title="¿Qué me puse hoy?" icon="☀️" value="12/22°" />
                <SectionHeader title="Historial" label="días cargados" value={124} />
                <SectionHeader title="Mis prendas" label="prendas" value={48} />
                <SectionHeader title="Estadísticas" label="prendas usadas" value={31} />
              </div>
            </div>
          </Section>

          <Section
            id="botones"
            title="Botones"
            description="El botón principal usa el color de la app; idealmente uno solo por pantalla. El resto, en grises. Los botones de solo texto van subrayados (en rojo para cancelar)."
          >
            <div className="grid gap-4">
              <Demo label="Variantes">
                <Button>Principal</Button>
                <Button variant="secondary">Secundario</Button>
                <Button variant="card">Blanco</Button>
                <Button variant="outline">Con borde</Button>
                <Button variant="ghost">Fantasma</Button>
                <Button variant="destructive">Borrar</Button>
                <Button variant="destructive-outline">Quitar</Button>
                <Button variant="destructive-soft">Cancelar</Button>
                <Button variant="dashed"><Plus /> Agregar</Button>
                <Button variant="link">Link</Button>
                <Button variant="destructive-link">Cancelar</Button>
                <Button disabled>Deshabilitado</Button>
              </Demo>
              <Demo label="Tamaños e íconos">
                <Button size="sm">Chico</Button>
                <Button>Normal</Button>
                <Button>
                  <Plus /> Agregar
                </Button>
                <Button variant="outline" size="icon" aria-label="Copiar">
                  <Copy />
                </Button>
                <Button disabled>Deshabilitado</Button>
              </Demo>
              <Demo label="Botoncitos redondos (icon-sm): silenciar, solo, al azar, quitar">
                <Button variant="outline" size="icon-sm" aria-label="Silenciar"><VolumeX /></Button>
                <Button size="icon-sm" aria-label="Silenciado"><VolumeX /></Button>
                <Button variant="outline" size="icon-sm" aria-label="Solo"><Headphones /></Button>
                <Button size="icon-sm" aria-label="Al azar"><Sparkles /></Button>
                <Button variant="destructive-outline" size="icon-sm" aria-label="Quitar"><X /></Button>
              </Demo>
              <Demo label="Flechas para cambiar de mes (icon-sm blanco), distintas al volver (con borde)">
                <Button variant="outline" size="icon-sm" aria-label="Volver"><ChevronLeft /></Button>
                <Button variant="card" size="icon-sm" aria-label="Mes anterior"><ChevronLeft /></Button>
                <Button variant="card" size="icon-sm" aria-label="Mes siguiente"><ChevronRight /></Button>
              </Demo>
            </div>
          </Section>

          <Section
            id="formularios"
            title="Formularios"
            description="Campos de texto, selectores, casillas y sliders, todos con el mismo alto, borde y foco."
          >
            <div className="grid gap-4">
              <Demo label="Campos: label gris a 4px arriba del campo, todos del mismo alto" className="grid gap-5 sm:grid-cols-2">
                <div>
                  <FieldLabel htmlFor="name">Nombre</FieldLabel>
                  <Input id="name" placeholder="Ej: Sueldo de noviembre" />
                </div>
                <div>
                  <FieldLabel htmlFor="amount">Monto</FieldLabel>
                  <Input id="amount" type="number" placeholder="$0" />
                </div>
                <div>
                  <FieldLabel>Categoría</FieldLabel>
                  <Select defaultValue="servicios">
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="servicios">Servicios</SelectItem>
                      <SelectItem value="alquiler">Alquiler</SelectItem>
                      <SelectItem value="super">Supermercado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <FieldLabel>Volumen · {volume[0]}</FieldLabel>
                  <Slider value={volume} onValueChange={setVolume} max={100} />
                </div>
                <div className="sm:col-span-2">
                  <FieldLabel htmlFor="notes">Notas</FieldLabel>
                  <Textarea id="notes" placeholder="Algo para recordar…" />
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="paid" defaultChecked />
                  <Label htmlFor="paid">Ya está pagado</Label>
                </div>
              </Demo>
              <Demo label="Campo con + para agregar, y lo guardado como chips con cruz">
                <SavedValuesDemo />
              </Demo>
            </div>
          </Section>

          <Section
            id="elegir"
            title="Elegir opciones"
            description="Para elegir una o varias opciones: píldora, pestañas, fichas, chips, casillas, colores y días."
          >
            <div className="grid gap-4">
              <Demo label="Píldora y pestañas: hasta 3 opciones, píldora; más de 3, pestañas de ancho completo pegadas arriba de la caja" className="block">
                <TabsDemo />
              </Demo>
              <Demo label="Fichas: compactas y a lo ancho (la elegida va del color de la app)" className="block">
                <TilesDemo />
              </Demo>
              <Demo label="Chips: se tocan para prender o apagar. Varios van en un ChipGroup, a 4px uno del otro" className="block">
                <ChipsDemo />
              </Demo>
              <Demo label="Elegir varias: cada opción en su caja S, toda la caja se puede tocar">
                <PickManyDemo />
              </Demo>
              <Demo label="Colores (hasta 3, el elegido con aro) y días (hoy con borde, con algo cargado = puntito)">
                <ColorsDaysDemo />
              </Demo>
            </div>
          </Section>

          <Section
            id="controles"
            title="Controles"
            description="Para cambiar un número de otras formas, no sólo con un slider. Sirven en cualquier app."
          >
            <ControlsDemo />
          </Section>

          <Section
            id="listas"
            title="Tarjetas y listas"
            description="Para mostrar cosas: fichas con foto, filas que se abren y labels."
          >
            <div className="grid gap-4">
              <Demo label="Fichas de prenda: grilla de 3, chiquita y fila. La elegida con borde del color de la app (blanco en oscuro)">
                <ItemCardsDemo />
              </Demo>
              <Demo label="Filas que se abren: el detalle aparece abajo en una caja M">
                <ExpandRowsDemo />
              </Demo>
              <Demo label="Labels: sólo muestran un estado o una categoría, no se tocan" className="block">
                <LabelsDemo />
              </Demo>
            </div>
          </Section>

          <Section
            id="navegacion"
            title="Navegación"
            description="Para moverse por la app: la barra de abajo y el menú desplegable (el ⋮ de cada fila)."
          >
            <div className="grid gap-4">
              <Demo label="Barra de abajo: íconos de 24px, la sección actual del color de la app con el puntito">
                <BottomNavDemo />
              </Demo>
              <Demo label="Menú desplegable">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      Opciones <ChevronDown />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Settings /> Ajustes
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <CreditCard /> Pagos
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem variant="destructive">
                      <LogOut /> Cerrar sesión
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </Demo>
            </div>
          </Section>

          <Section
            id="ventanas"
            title="Ventanas y avisos"
            description="Hojas desde abajo, confirmaciones, ayudas al pasar el mouse, avisos que aparecen y se van solos, y el estado vacío."
          >
            <div className="grid gap-4">
              <Demo label="Hojas: todas salen desde abajo y flotan a 16px de los bordes (acá se muestran abiertas)" className="block">
                <SheetsDemo />
              </Demo>
              <Demo label="Probalo: confirmación, hoja desde abajo, ayuda al pasar el mouse y aviso que se va solo">
                <Button variant="outline" onClick={() => setConfirmOpen(true)}>Confirmación</Button>
                <ConfirmSheet open={confirmOpen} onOpenChange={setConfirmOpen} title="Borrar pago" question="¿Borrar este pago?"
                  detail="No se puede deshacer. El pago desaparece del historial." confirmLabel="Borrar"
                  onConfirm={() => { setConfirmOpen(false); toast("Pago borrado") }} />

                <Button variant="outline" onClick={() => setSheetOpen(true)}>Hoja desde abajo</Button>
                <BottomSheet open={sheetOpen} onOpenChange={setSheetOpen} title="Filtros">
                  <p className="text-sm text-muted-foreground">Todas las ventanas salen desde abajo.</p>
                </BottomSheet>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" aria-label="Notificaciones">
                      <Bell />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Notificaciones</TooltipContent>
                </Tooltip>

                <Button
                  variant="secondary"
                  onClick={() =>
                    toast.success("¡Guardado!", { description: "Tus cambios están a salvo." })
                  }
                >
                  Mostrar aviso
                </Button>
              </Demo>
              <Demo label="Estado vacío">
                <EmptyDemo />
              </Demo>
              <Demo label="Acordeón flotante: tocalo y crece hacia arriba sobre la página">
                <div className="w-full max-w-md">
                  <FloatAccordion title="Sugerencia para hoy" onInfo={() => setSheetOpen(true)}>
                    <div className="divide-y divide-border text-sm">
                      <p className="py-2.5">Nike Air Force</p>
                      <p className="py-2.5">Levis 501</p>
                      <p className="py-2.5">Uniqlo U</p>
                    </div>
                  </FloatAccordion>
                </div>
              </Demo>
            </div>
          </Section>

          <Section
            id="audio"
            title="Audio (LOOP)"
            description="Controles para apps de música: slider con valor, perillas, vúmetro y los botones ⏻ (apagar) y 🎧 (escuchar sólo eso). Toman el color de la app."
          >
            <AudioDemo />
            <h3 className="mt-10 mb-3 font-medium">Más controles</h3>
            <MoreControls />
            <h3 className="mt-10 mb-3 font-medium">Piezas de LOOP</h3>
            <LoopPiecesDemo />
          </Section>

          <Section
            id="usar"
            title="Cómo usarlo en una app"
            description="Esto lo hace Claude por vos, pero queda anotado."
          >
            <div className="space-y-3 rounded-lg border border-input bg-muted/40 p-5 font-mono text-sm">
              <div className="text-muted-foreground"># 1. en package.json de la app, con la última versión publicada (vX.Y.Z)</div>
              <div>"@agustincairone/design-system": "github:agustincairone/design-system#vX.Y.Z"</div>
              <div className="pt-2 text-muted-foreground"># 2. en src/index.css: el tema y el color de la app</div>
              <div>@import "@agustincairone/design-system/theme.css";</div>
              <div>@import "@agustincairone/design-system/brands/pay-tracker.css";</div>
              <div className="pt-2 text-muted-foreground"># 3. cada pieza se importa así</div>
              <div>{'import { Button } from "@agustincairone/design-system/components/ui/button"'}</div>
              <div className="pt-2 text-muted-foreground"># 4. en index.html: que el iPhone no haga zoom al tocar un campo</div>
              <div>{'<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1" />'}</div>
            </div>
          </Section>
        </main>
      </div>
    </div>
  )
}

export default App
