// Guía: demos de las piezas que se usan en las apps, cada una en su sección.
import * as React from "react"
import { BarChart3, CalendarDays, Check, ImageIcon, Plus, Shirt, User } from "lucide-react"

import { Segmented } from "@/components/controls/segmented"
import { TabBar } from "@/components/controls/tab-bar"
import { Chip, ChipGroup } from "@/components/ui/chip"
import { FieldLabel } from "@/components/ui/field-label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { BottomSheet, ConfirmSheet } from "@/components/ui/bottom-sheet"
import { EmptyState } from "@/components/ui/empty-state"
import { ColorSwatches, type Swatch } from "@/components/controls/color-swatches"
import { DateStrip } from "@/components/controls/date-strip"
import { BottomNav } from "@/components/controls/bottom-nav"
import { ColorDots, ItemCard, ItemCardSmall, ItemRow, type Item } from "@/components/cards/item-card"

const ITEMS: Item[] = [
  { marca: "Nike", modelo: "Air Force", colors: [{ hex: "#FFFFFF" }] },
  { marca: "Levis", modelo: "501", tipo: "Jean", colors: [{ hex: "#23466A" }] },
  { marca: "Uniqlo", modelo: "U", tipo: "Lisa", colors: [{ hex: "#1A1A1A" }, { hex: "#C0392B" }] },
]
const SWATCHES: Swatch[] = [
  { name: "Blanco", hex: "#FFFFFF" }, { name: "Negro", hex: "#1A1A1A" }, { name: "Gris claro", hex: "#D4D4D4" },
  { name: "Beige", hex: "#C4A882" }, { name: "Rojo", hex: "#C0392B" }, { name: "Verde", hex: "#527C47" },
  { name: "Celeste", hex: "#7FB3D3" }, { name: "Azul", hex: "#23466A" },
]
const DAYS = [
  { dateStr: "a", dayName: "Lunes", label: "16/11", isToday: true, marked: true },
  { dateStr: "b", dayName: "Viernes", label: "13/11", marked: true },
  { dateStr: "c", dayName: "Jueves", label: "12/11" },
  { dateStr: "d", dayName: "Miércoles", label: "11/11" },
  { dateStr: "e", dayName: "Martes", label: "10/11" },
]
const CATS = ["Zapatillas", "Abajo", "Remera", "Camisa", "Arriba", "Campera"]

// Etiqueta chica arriba de cada ejemplo
function Caption({ children }: { children: React.ReactNode }) {
  return <span className="eyebrow">{children}</span>
}

// Píldora (hasta 3 opciones) y pestañas de ancho completo (más de 3)
export function TabsDemo() {
  const [mode, setMode] = React.useState("year")
  const [range, setRange] = React.useState("mes")
  const [who, setWho] = React.useState("Agus")
  const [cat, setCat] = React.useState("Zapatillas")
  const [pay, setPay] = React.useState("contado")
  return (
    <div className="grid w-full grid-cols-1 items-start gap-box-xl md:grid-cols-2">
      <div className="flex min-w-0 flex-col gap-box-xs">
        <Caption>2 opciones · píldora</Caption>
        <Segmented label="Período" value={mode} onChange={setMode} options={[{ value: "year", label: "Año" }, { value: "month", label: "Mes" }]} />
        <Caption>3 opciones · píldora chica</Caption>
        <Segmented size="sm" label="Rango" value={range} onChange={setRange} options={[{ value: "mes", label: "Este mes" }, { value: "anio", label: "Este año" }, { value: "todo", label: "Todo" }]} />
        <Caption>En un formulario · a lo ancho</Caption>
        <Segmented fill label="¿Quién pagó?" value={who} onChange={setWho} options={["Agus", "Sofi"].map((p) => ({ value: p, label: p }))} />
      </div>
      <div className="flex min-w-0 flex-col gap-box-xs">
        <Caption>Más de 3 opciones · pestañas de ancho completo</Caption>
        <div className="overflow-hidden rounded-box-l bg-card">
          <TabBar label="Categoría" value={cat} onChange={setCat} options={CATS.map((c) => ({ value: c, label: c }))} />
          <div className="grid grid-cols-3 gap-box-gap p-box-l">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex aspect-square items-center justify-center rounded-box-s bg-inset">
                <ImageIcon className="size-5 text-muted-foreground" />
              </div>
            ))}
          </div>
        </div>
        <Caption>Con un dato abajo</Caption>
        <div className="overflow-hidden rounded-box-l bg-card">
          <TabBar label="Forma de pago" value={pay} onChange={setPay} options={[{ value: "contado", label: "Gastos al contado", sub: "$32.300" }, { value: "tarjeta", label: "Gastos con tarjeta", sub: "$44.000" }]} />
        </div>
      </div>
    </div>
  )
}

// Elegir varias: cada opción en su caja S, toda la caja se puede tocar
export function PickManyDemo() {
  const OPTS = ["70/30", "60/40", "50/50"]
  const [sel, setSel] = React.useState(["60/40", "50/50"])
  const toggle = (o: string) => setSel((p) => (p.includes(o) ? (p.length > 1 ? p.filter((x) => x !== o) : p) : [...p, o]))
  return (
    <div className="w-full max-w-sm rounded-box-l bg-card p-box-l">
      <div className="flex flex-col gap-box-gap">
        {OPTS.map((o) => (
          <Label key={o} data-variant="inset" className="rounded-box-s bg-inset p-box-s">
            <Checkbox checked={sel.includes(o)} onCheckedChange={() => toggle(o)} />
            {o}
          </Label>
        ))}
      </div>
    </div>
  )
}

// Colores (hasta 3) y días
export function ColorsDaysDemo() {
  const [cols, setCols] = React.useState<Swatch[]>([SWATCHES[1]])
  const [day, setDay] = React.useState("b")
  return (
    <div className="flex w-full max-w-md flex-col gap-box-m rounded-box-l bg-card p-box-l">
      <ColorSwatches colors={SWATCHES} value={cols} onToggle={(c) => setCols((p) => (p.some((x) => x.hex === c.hex) ? p.filter((x) => x.hex !== c.hex) : p.length >= 3 ? p : [...p, c]))} />
      <DateStrip days={DAYS} value={day} onChange={setDay} />
    </div>
  )
}

// Campo con + para agregar un valor, y los valores guardados como chips con cruz
export function SavedValuesDemo() {
  const [text, setText] = React.useState("")
  const [saved, setSaved] = React.useState(["Nike", "Adidas", "Vans"])
  const [pick, setPick] = React.useState("Nike")
  const add = () => {
    const v = text.trim()
    if (!v) return
    if (!saved.includes(v)) setSaved((p) => [...p, v])
    setPick(v)
    setText("")
  }
  return (
    <div className="w-full max-w-sm rounded-box-l bg-card p-box-l">
      <FieldLabel>Marca</FieldLabel>
      <div className="flex gap-box-xs">
        <Input value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && add()} placeholder="Agregar marca..." />
        <Button size="icon" onClick={add} disabled={!text.trim()} aria-label="Agregar"><Plus /></Button>
      </div>
      <ChipGroup className="mt-box-xs">
        {saved.map((b) => (
          <Chip key={b} selected={pick === b} onClick={() => setPick(b)} onRemove={() => setSaved((p) => p.filter((x) => x !== b))} removeLabel={"Borrar " + b}>{b}</Chip>
        ))}
      </ChipGroup>
    </div>
  )
}

// Fichas de prenda: grilla, chiquita y fila
export function ItemCardsDemo() {
  const [sel, setSel] = React.useState(1)
  return (
    <div className="flex w-full max-w-md flex-col gap-box-m rounded-box-l bg-card p-box-l">
      <div className="grid grid-cols-3 gap-box-gap">
        {ITEMS.map((it, i) => <ItemCard key={i} item={it} selected={sel === i} onClick={() => setSel(i)} />)}
      </div>
      <div className="flex gap-box-m">{ITEMS.map((it, i) => <ItemCardSmall key={i} item={it} />)}</div>
      <ItemRow item={ITEMS[1]} right={<span className="text-sm font-semibold">12x</span>} />
      <div className="flex items-center gap-box-s"><ColorDots colors={ITEMS[2].colors} size={18} /><span className="text-xs text-muted-foreground">puntitos de color</span></div>
    </div>
  )
}

// Hojas desde abajo, abiertas: detalle, confirmación y formulario
export function SheetsDemo() {
  return (
    <div className="grid w-full gap-box-gap md:grid-cols-3">
      {[
        ["Detalle", <BottomSheet key="a" inline open onOpenChange={() => {}} title="Nike Air Force">
          <div className="grid grid-cols-2 gap-box-xs"><Button variant="secondary">Editar</Button><Button variant="destructive-soft">Archivar</Button></div>
        </BottomSheet>],
        ["Confirmación", <ConfirmSheet key="b" inline open onOpenChange={() => {}} title="Eliminar prenda" question="¿Eliminar Nike Air Force?" detail="No se puede deshacer." confirmLabel="Eliminar" onConfirm={() => {}} />],
        ["Formulario", <BottomSheet key="c" inline open onOpenChange={() => {}} title="Nueva prenda">
          <Input placeholder="Marca" />
          <Button disabled className="w-full">Guardar</Button>
        </BottomSheet>],
      ].map(([l, node]) => (
        <div key={l as string} className="flex flex-col gap-box-xs">
          <Caption>{l}</Caption>
          <div className="h-[340px] overflow-hidden rounded-box-l border border-input bg-card">{node}</div>
        </div>
      ))}
    </div>
  )
}

// Barra de abajo
export function BottomNavDemo() {
  const [nav, setNav] = React.useState("ropa")
  return (
    <div className="w-full max-w-sm rounded-box-l border border-input bg-background p-box-xs">
      <BottomNav value={nav} onChange={setNav} items={[
        { key: "hoy", icon: CalendarDays, label: "Hoy" },
        { key: "ropa", icon: Shirt, label: "Ropa" },
        { key: "stats", icon: BarChart3, label: "Estadísticas" },
        { key: "perfil", icon: User, label: "Perfil" },
      ]} />
    </div>
  )
}

// Estado vacío: ícono en un círculo gris, título y texto gris
export function EmptyDemo() {
  return (
    <div className="w-full max-w-sm rounded-box-l bg-card p-box-l">
      <EmptyState icon={<Check className="text-primary" />} title="Outfit registrado" text="Podés modificarlo cuando quieras" />
    </div>
  )
}
