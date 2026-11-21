// Guía: demos de las piezas que se usan en las apps, cada una en su sección.
import * as React from "react"
import { BarChart3, Bookmark, CalendarDays, Check, ImageIcon, Pencil, Plus, Shirt, Trash2, User, Wine } from "lucide-react"

import { Segmented } from "@/components/controls/segmented"
import { TabBar } from "@/components/controls/tab-bar"
import { Chip, ChipGroup, ScoreChip } from "@/components/ui/chip"
import { FieldLabel } from "@/components/ui/field-label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { BottomSheet, ConfirmSheet, FilterSheet, SheetSummary, type FilterGroup } from "@/components/ui/bottom-sheet"
import { SearchInput } from "@/components/ui/search-input"
import { Stars, StarRating } from "@/components/ui/stars"
import { Textarea } from "@/components/ui/textarea"
import { ScaleSlider } from "@/components/controls/scale-slider"
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
const WINES: Item[] = [
  { marca: "Gran Enemigo", modelo: "El Enemigo · 2019", tipo: "Mendoza" },
  { marca: "Catena Zapata Malbec", modelo: "Catena Zapata · 2020", tipo: "Mendoza" },
]
const PERFIL: [string, number][] = [["🍒 Fruta", 4], ["🍋 Acidez", 3], ["🌿 Taninos", 4], ["🪵 Madera", 2]]
const WINE_TABS = [{ value: "info", label: "Info", icon: Wine }, { value: "editar", label: "Editar", icon: Pencil }, { value: "borrar", label: "Borrar", icon: Trash2 }]
const FILTERS: FilterGroup[] = [
  { key: "uva", label: "Uva", options: ["Malbec", "Cabernet Franc", "Bonarda", "Torrontés"] },
  { key: "bodega", label: "Bodega", options: ["Catena Zapata", "El Enemigo", "El Esteco"] },
  { key: "cosecha", label: "Cosecha", options: ["2018", "2019", "2020", "2021"] },
]

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
  const [wineTab, setWineTab] = React.useState("info")
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
        <Caption>Con ícono arriba (ej: la ficha de un vino)</Caption>
        <div className="overflow-hidden rounded-box-l bg-card">
          <TabBar label="Ficha" value={wineTab} onChange={setWineTab} options={WINE_TABS} />
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
  const items = [
    { key: "hoy", icon: CalendarDays, label: "Hoy" },
    { key: "ropa", icon: Shirt, label: "Ropa" },
    { key: "stats", icon: BarChart3, label: "Estadísticas" },
    { key: "perfil", icon: User, label: "Perfil" },
  ]
  return (
    <div className="flex w-full flex-wrap gap-box-m">
      <div className="flex w-full max-w-sm flex-col gap-box-xs">
        <p className="text-xs text-muted-foreground">Pasa contenido por detrás: vidrio</p>
        <div className="relative overflow-hidden rounded-box-l border border-input bg-background p-box-xs">
          <div className="grid grid-cols-2 gap-box-gap pb-box-xl">
            <div className="h-20 rounded-box-m bg-card" />
            <div className="h-20 rounded-box-m bg-card" />
          </div>
          <BottomNav glass className="absolute inset-x-box-xs bottom-box-xs w-auto" value={nav} onChange={setNav} items={items} />
        </div>
      </div>
      <div className="flex w-full max-w-sm flex-col gap-box-xs">
        <p className="text-xs text-muted-foreground">Nada detrás (final de la página): blanca</p>
        <div className="flex flex-1 items-end rounded-box-l border border-input bg-background p-box-xs">
          <BottomNav glass={false} value={nav} onChange={setNav} items={items} />
        </div>
      </div>
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

// Buscador: lupa adelante y cruz para borrar
export function SearchDemo() {
  const [q, setQ] = React.useState("Malbec")
  return <SearchInput value={q} onChange={setQ} placeholder="Buscar por nombre, bodega o uva..." />
}

// Ficha alta: 2 columnas, foto vertical, texto a la izquierda y estrellas
export function TallCardsDemo() {
  const [sel, setSel] = React.useState(-1)
  return (
    <div className="w-full max-w-sm rounded-box-l bg-card p-box-l">
      <div className="grid grid-cols-2 gap-box-gap">
        {WINES.map((w, i) => <ItemCard key={i} layout="tall" item={w} extra={<Stars value={[5, 4][i]} />} selected={sel === i} onClick={() => setSel(sel === i ? -1 : i)} />)}
      </div>
    </div>
  )
}

// Estrellas y datos con puntaje: sólo muestran, no se tocan
export function ScoresDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-box-m rounded-box-l bg-card p-box-l">
      <div className="flex items-center gap-box-m"><Stars value={4} /><Stars value={3} size="md" /></div>
      <ChipGroup scroll>{PERFIL.map(([l, v]) => <ScoreChip key={l} label={l} value={v} max={5} />)}</ChipGroup>
    </div>
  )
}

// Estrellas para puntuar
export function StarRatingDemo() {
  const [rating, setRating] = React.useState(4)
  return <StarRating value={rating} onChange={setRating} />
}

// Escala corta: el perfil de un vino de 1 a 5 (va adentro de una caja blanca o de una hoja)
export function ScaleSliderDemo() {
  const [fruta, setFruta] = React.useState(4)
  const [acidez, setAcidez] = React.useState(3)
  return (
    <div className="grid w-full max-w-sm gap-box-xs rounded-box-l bg-card p-box-l">
      <ScaleSlider label="🍒 Fruta" value={fruta} onChange={setFruta} minLabel="Poco frutado" maxLabel="Muy frutado" info="Qué tan presentes son los aromas y sabores frutales." />
      <ScaleSlider label="🍋 Acidez" value={acidez} onChange={setAcidez} minLabel="Baja" maxLabel="Alta" info="La sensación de frescura del vino." />
    </div>
  )
}

// Más hojas: con pestañas, con pasos, filtro, borrar con resumen y aviso de repetido
export function MoreSheetsDemo() {
  const [tab, setTab] = React.useState("info")
  const [filters, setFilters] = React.useState<Record<string, string[]>>({ uva: ["Malbec"] })
  const [fruta, setFruta] = React.useState(4)
  const [acidez, setAcidez] = React.useState(3)
  const [rating, setRating] = React.useState(4)
  const [comment, setComment] = React.useState("")
  const summary = <SheetSummary title="Gran Enemigo" lines={["El Enemigo · 2019", "Cabernet Franc · Mendoza"]} />
  const sheets: [string, React.ReactNode][] = [
    ["Detalle con pestañas (ícono arriba)", <BottomSheet inline open onOpenChange={() => {}} title="Ficha del vino">
      <TabBar label="Ficha" value={tab} onChange={setTab} className="-mx-box-l -mt-4 w-auto" options={WINE_TABS} />
      <div className="flex flex-col gap-box-2xs">
        <div className="flex items-center justify-between gap-box-xs"><span className="text-lg font-medium">Gran Enemigo</span><Stars value={5} size="md" /></div>
        <p className="text-muted-foreground">El Enemigo · 2019 · Cabernet Franc</p>
      </div>
      <ChipGroup scroll>{PERFIL.map(([l, v]) => <ScoreChip key={l} label={l} value={v} max={5} />)}</ChipGroup>
      <Button className="w-full"><Bookmark /> Mi lista</Button>
    </BottomSheet>],
    ["Con pasos: volver, título, Paso 2/3 y la cruz", <BottomSheet inline open onOpenChange={() => {}} title="Perfil del vino" step={{ current: 2, total: 3 }} onBack={() => {}}>
      <ScaleSlider label="🍒 Fruta" value={fruta} onChange={setFruta} minLabel="Poco frutado" maxLabel="Muy frutado" info="Qué tan presentes son los aromas y sabores frutales." />
      <ScaleSlider label="🍋 Acidez" value={acidez} onChange={setAcidez} minLabel="Baja" maxLabel="Alta" info="La sensación de frescura del vino." />
      <Button className="w-full">Siguiente</Button>
    </BottomSheet>],
    ["Último paso: puntuar y comentar (con contador)", <BottomSheet inline open onOpenChange={() => {}} title="¿Qué te pareció?" step={{ current: 3, total: 3 }} onBack={() => {}}>
      <StarRating value={rating} onChange={setRating} className="self-center" />
      <div>
        <FieldLabel>Comentario (opcional)</FieldLabel>
        <Textarea maxLength={200} value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Escribí un comentario" />
      </div>
      <Button className="w-full">Guardar</Button>
    </BottomSheet>],
    ["Filtro: filas que se abren, lo elegido al lado y chips", <FilterSheet inline open onOpenChange={() => {}} groups={FILTERS} value={filters} onChange={setFilters} onConfirm={() => {}} />],
    ["Borrar: la pregunta y lo que se borra", <ConfirmSheet inline open onOpenChange={() => {}} title="Eliminar vino" question="¿Querés eliminar este vino?" detail="No se puede deshacer." confirmLabel="Eliminar" onConfirm={() => {}}>{summary}</ConfirmSheet>],
    ["Aviso de algo repetido", <BottomSheet inline open onOpenChange={() => {}} title="Vino duplicado">
      <p>Parece que ya cargaste este vino en <span className="font-medium text-brand-text">Ya probé</span>.</p>
      {summary}
      <div className="grid grid-cols-2 gap-box-xs"><Button variant="secondary">Guardar igual</Button><Button>Ver vino</Button></div>
    </BottomSheet>],
  ]
  return (
    <div className="grid w-full grid-cols-1 gap-box-gap md:grid-cols-2">
      {sheets.map(([l, node]) => (
        <div key={l} className="flex min-w-0 flex-col gap-box-xs">
          <Caption>{l}</Caption>
          <div className="h-[460px] overflow-hidden rounded-box-l border border-input bg-card">{node}</div>
        </div>
      ))}
    </div>
  )
}
