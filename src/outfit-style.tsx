// Guía: estilo "outfit" (componentes copiados tal cual de outfit-tracker) al lado
// de cómo quedaría con lo que el sistema ya tiene. Las dos columnas van sobre una
// caja blanca, como en una app de verdad.
import * as React from "react"
import { toast } from "sonner"
import { BarChart2, Calendar, Check, ChevronLeft, LayoutGrid, Plus, Shirt, User } from "lucide-react"

import { TileGroup } from "@/components/controls/tile-group"
import { Segmented } from "@/components/controls/segmented"
import { Button } from "@/components/ui/button"
import { Chip } from "@/components/ui/chip"
import { OUTFIT, OUTFIT_FONT } from "@/components/outfit/palette"
import { TabBar } from "@/components/outfit/tab-bar"
import { ChipTag, FilterChips } from "@/components/outfit/chips"
import { ActionButton, DashedAddButton, RoundBackButton } from "@/components/outfit/action-button"
import { ColorDots, ItemCard, ItemCardSmall, ItemRow, type OutfitItem } from "@/components/outfit/item-card"
import { ColorSwatches } from "@/components/outfit/color-swatches"
import { DateStrip } from "@/components/outfit/date-strip"
import { BottomSheet, CenterModal, ConfirmSheet } from "@/components/outfit/sheets"
import { BottomNav } from "@/components/outfit/bottom-nav"
import { EmptyState, FieldLabel, InputAdd, Toast } from "@/components/outfit/misc"
import {
  PBottomNav, PBottomSheet, PCenterModal, PChipTag, PColorDots, PColorSwatches, PConfirmSheet, PDateStrip,
  PEmptyState, PFieldLabel, PInputAdd, PItemCard, PItemCardSmall, PItemRow,
} from "@/outfit-proposals"

const CATS = ["Zapatillas", "Abajo", "Remera", "Camisa", "Arriba", "Campera"]
const SWATCHES = [
  { name: "Blanco", hex: "#FFFFFF" }, { name: "Negro", hex: "#1A1A1A" }, { name: "Gris claro", hex: "#D4D4D4" },
  { name: "Beige", hex: "#C4A882" }, { name: "Rojo", hex: "#C0392B" }, { name: "Verde", hex: "#527C47" },
  { name: "Celeste", hex: "#7FB3D3" }, { name: "Azul", hex: "#23466A" },
]
const ITEMS: OutfitItem[] = [
  { marca: "Nike", modelo: "Air Force", colors: [{ hex: "#FFFFFF" }] },
  { marca: "Levis", modelo: "501", tipo: "Jean", colors: [{ hex: "#23466A" }] },
  { marca: "Uniqlo", modelo: "U", tipo: "Lisa", colors: [{ hex: "#1A1A1A" }, { hex: "#C0392B" }] },
]
const DAYS = [
  { dateStr: "a", dayName: "Lunes", label: "16/11", isToday: true, marked: true },
  { dateStr: "b", dayName: "Viernes", label: "13/11", marked: true },
  { dateStr: "c", dayName: "Jueves", label: "12/11" },
  { dateStr: "d", dayName: "Miércoles", label: "11/11" },
  { dateStr: "e", dayName: "Martes", label: "10/11" },
]
const NAV_ITEMS = [{ key: "registrar", icon: Shirt }, { key: "historial", icon: Calendar }, { key: "prendas", icon: LayoutGrid }, { key: "stats", icon: BarChart2 }, { key: "perfil", icon: User }]
type Swatch = (typeof SWATCHES)[number]
const toggler = (set: React.Dispatch<React.SetStateAction<Swatch[]>>) => (c: Swatch) =>
  set((p) => (p.find((x) => x.hex === c.hex) ? p.filter((x) => x.hex !== c.hex) : p.length >= 3 ? p : [...p, c]))

// Una comparación: a la izquierda cómo queda con el sistema, a la derecha el original de outfit
function Compare({ name, use, oneNote, one, two, bare }: {
  name: string; use: string; oneNote: string; one: React.ReactNode; two: React.ReactNode
  /** sin caja blanca (para mostrar hojas y ventanas, que traen su propio fondo) */
  bare?: boolean
}) {
  const box = bare ? "flex flex-col gap-3 overflow-hidden rounded-box-l" : "flex min-h-24 flex-col justify-center gap-3 rounded-box-l bg-card p-box-l"
  return (
    <div className="flex flex-col gap-3">
      <div>
        <div className="text-sm font-medium">{name}</div>
        <div className="text-xs text-muted-foreground">{use}</div>
      </div>
      <div className="grid items-start gap-3 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <span className="eyebrow">Estilo 1 · {oneNote}</span>
          <div className={box}>{one}</div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="eyebrow">Estilo 2 · outfit (original)</span>
          <div className={box} style={{ background: bare ? undefined : OUTFIT.white, fontFamily: OUTFIT_FONT, color: OUTFIT.text }}>{two}</div>
        </div>
      </div>
    </div>
  )
}

// "Pantalla" de fondo donde se ve una hoja o ventana abierta sin tocar nada
function Screen({ children, outfit }: { children: React.ReactNode; outfit?: boolean }) {
  return (
    <div className="h-[340px] overflow-hidden rounded-box-l" style={{ background: outfit ? OUTFIT.bg : "var(--background)", fontFamily: outfit ? OUTFIT_FONT : undefined }}>
      {children}
    </div>
  )
}

export function OutfitStyle() {
  const [cat, setCat] = React.useState("Zapatillas")
  const [mode, setMode] = React.useState("year")
  const [brand, setBrand] = React.useState<string | null>(null)
  const [chip, setChip] = React.useState("Nike")
  const [cols, setCols] = React.useState<Swatch[]>([SWATCHES[1]])
  const [day, setDay] = React.useState("a")
  const [sel, setSel] = React.useState(1)
  const [nav, setNav] = React.useState("registrar")
  const [text, setText] = React.useState("")
  const [text1, setText1] = React.useState("")
  const [chip1, setChip1] = React.useState("Nike")
  const [cols1, setCols1] = React.useState<Swatch[]>([SWATCHES[1]])
  const [day1, setDay1] = React.useState("a")
  const [sel1, setSel1] = React.useState(1)
  const [nav1, setNav1] = React.useState("registrar")
  const noop = () => {}

  return (
    <div className="grid gap-10">
      <Compare
        name="Tabs"
        use="Elegir una categoría o un período."
        oneNote="lo que ya tenemos: fichas + segmentado"
        one={
          <>
            <TileGroup columns={3} label="Categoría" value={cat} onChange={setCat} options={CATS.map((c) => ({ value: c, label: c }))} />
            <Segmented label="Período" className="self-start" value={mode} onChange={setMode} options={[{ value: "year", label: "Año" }, { value: "month", label: "Mes" }]} />
          </>
        }
        two={
          <div className="-m-box-l overflow-hidden rounded-box-l">
            <TabBar value={cat} onChange={setCat} options={CATS.map((c) => ({ value: c, label: c }))} />
            <div className="h-4" />
            <TabBar value={mode} onChange={setMode} options={[{ value: "year", label: "Año" }, { value: "month", label: "Mes" }]} />
          </div>
        }
      />

      <Compare
        name="Filtro con chips"
        use="Filtrar una lista (ej: por marca)."
        oneNote="lo que ya tenemos: Chip"
        one={
          <div className="flex flex-wrap gap-2">
            {[null, "Adidas", "Nike", "Vans"].map((b) => (
              <Chip key={b ?? "todo"} selected={brand === b} onClick={() => setBrand(b)}>{b ?? "Todo"}</Chip>
            ))}
          </div>
        }
        two={<FilterChips value={brand} onChange={setBrand} options={[null, "Adidas", "Nike", "Vans"].map((b) => ({ value: b, label: b ?? "Todo" }))} />}
      />

      <Compare
        name="Chips guardados + campo con +"
        use="Escribir un valor nuevo o elegir uno ya guardado, con cruz para borrarlo."
        oneNote="lo que ya tenemos: Input + Chip con cruz"
        one={
          <div>
            <PFieldLabel>Marca</PFieldLabel>
            <PInputAdd value={text1} onChange={setText1} onAdd={() => setText1("")} placeholder="Agregar marca..." />
            <div className="mt-2 flex flex-wrap gap-2">
              {["Nike", "Adidas", "Vans"].map((b) => <PChipTag key={b} label={b} selected={chip1 === b} onSelect={() => setChip1(b)} onDelete={noop} />)}
            </div>
          </div>
        }
        two={
          <div>
            <FieldLabel>Marca</FieldLabel>
            <InputAdd value={text} onChange={setText} onAdd={() => setText("")} placeholder="Agregar marca..." />
            <div className="mt-2 flex flex-wrap gap-2">
              {["Nike", "Adidas", "Vans"].map((b) => <ChipTag key={b} label={b} selected={chip === b} onSelect={() => setChip(b)} onDelete={noop} />)}
            </div>
          </div>
        }
      />

      <Compare
        name="Botones"
        use="Principal, secundario, peligro, deshabilitado, agregar y volver."
        oneNote="lo que ya tenemos: Button"
        one={
          <>
            <div className="flex gap-2">
              <Button variant="destructive-outline" className="flex-1">Cancelar</Button>
              <Button variant="secondary" className="flex-1">Omitir</Button>
              <Button className="flex-1">Siguiente</Button>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" className="flex-1">Volver</Button>
              <Button variant="destructive" className="flex-1">Eliminar</Button>
              <Button disabled className="flex-1">Guardar</Button>
            </div>
            <Button variant="dashed" className="w-full"><Plus className="size-4" /> Agregar nueva prenda</Button>
            <div className="flex items-center gap-3"><Button variant="outline" size="icon-sm" aria-label="Anterior"><ChevronLeft className="size-4" /></Button><span className="text-sm font-medium">Zapatillas</span></div>
          </>
        }
        two={
          <>
            <div className="flex gap-3">
              <ActionButton tone="danger-soft" className="flex-1">Cancelar</ActionButton>
              <ActionButton tone="secondary" className="flex-1">Omitir</ActionButton>
              <ActionButton className="flex-1">Siguiente</ActionButton>
            </div>
            <div className="flex gap-3">
              <ActionButton tone="secondary" className="flex-1">Volver</ActionButton>
              <ActionButton tone="danger" className="flex-1">Eliminar</ActionButton>
              <ActionButton disabled className="flex-1">Guardar</ActionButton>
            </div>
            <DashedAddButton />
            <div className="flex items-center gap-3"><RoundBackButton /><span className="text-sm font-medium" style={{ color: OUTFIT.ink }}>Zapatillas</span></div>
          </>
        }
      />

      <Compare
        name="Fichas de prenda"
        use="Grilla de 3 columnas, la chiquita del historial y la fila de lista."
        oneNote="ya es componente del DS: fichas"
        one={
          <>
            <div className="grid max-w-[360px] grid-cols-3 gap-box-gap">
              {ITEMS.map((it, i) => <PItemCard key={i} item={it} selected={sel1 === i} onClick={() => setSel1(i)} />)}
            </div>
            <div className="flex gap-4">{ITEMS.map((it, i) => <PItemCardSmall key={i} item={it} />)}</div>
            <div className="max-w-[360px]"><PItemRow item={ITEMS[1]} right={<span className="text-sm font-semibold">12x</span>} /></div>
            <div className="flex items-center gap-3"><PColorDots colors={ITEMS[2].colors} size={18} /><span className="text-xs text-muted-foreground">puntitos de color</span></div>
          </>
        }
        two={
          <>
            <div className="grid max-w-[360px] grid-cols-3 gap-2">
              {ITEMS.map((it, i) => <ItemCard key={i} item={it} selected={sel === i} onClick={() => setSel(i)} />)}
            </div>
            <div className="flex gap-4">{ITEMS.map((it, i) => <ItemCardSmall key={i} item={it} />)}</div>
            <div className="max-w-[360px]"><ItemRow item={ITEMS[1]} right={<span style={{ color: OUTFIT.ink, fontSize: 13, fontWeight: 600 }}>12x</span>} /></div>
            <div className="flex items-center gap-3"><ColorDots colors={ITEMS[2].colors} size={18} /><span className="text-xs" style={{ color: OUTFIT.muted }}>puntitos de color</span></div>
          </>
        }
      />

      <Compare
        name="Colores y días"
        use="Elegir hasta 3 colores; elegir el día (hoy con borde, con outfit = puntito)."
        oneNote="propuesta (no existe todavía)"
        one={
          <>
            <PColorSwatches colors={SWATCHES} value={cols1} onToggle={toggler(setCols1)} />
            <PDateStrip days={DAYS} value={day1} onChange={setDay1} />
          </>
        }
        two={
          <>
            <ColorSwatches colors={SWATCHES} value={cols} onToggle={toggler(setCols)} />
            <DateStrip days={DAYS} value={day} onChange={setDay} />
          </>
        }
      />

      <Compare
        bare
        name="Hoja desde abajo"
        use="Detalle de una prenda u opciones. Se muestra abierta."
        oneNote="DS: hoja desde abajo"
        one={<Screen><PBottomSheet inline open onClose={noop} title="Zapatillas"><PItemRow item={ITEMS[0]} right={<span className="text-sm font-semibold">5x</span>} /><div className="flex gap-2"><Button variant="secondary" className="flex-1">Archivar</Button><Button className="flex-1">Editar</Button></div></PBottomSheet></Screen>}
        two={<Screen outfit><BottomSheet inline open onClose={noop} title="Zapatillas"><div className="flex flex-col gap-4 p-4 pb-8"><ItemRow item={ITEMS[0]} right={<span style={{ color: OUTFIT.ink, fontSize: 13, fontWeight: 600 }}>5x</span>} /><div className="flex gap-3"><ActionButton tone="soft" className="flex-1">Archivar</ActionButton><ActionButton className="flex-1">Editar</ActionButton></div></div></BottomSheet></Screen>}
      />

      <Compare
        bare
        name="Confirmación"
        use="Antes de borrar o cancelar algo. Se muestra abierta."
        oneNote="DS: confirmación"
        one={<Screen><PConfirmSheet inline open onClose={noop} title="Eliminar outfit" question="¿Estás seguro que querés eliminar este outfit?" detail="Recordá que podés volver a cargarlo nuevamente." confirmLabel="Eliminar" onConfirm={noop} /></Screen>}
        two={<Screen outfit><ConfirmSheet inline open onClose={noop} title="Eliminar outfit" question="¿Estás seguro que querés eliminar este outfit?" detail="Recordá que podés volver a cargarlo nuevamente." confirmLabel="Eliminar" onConfirm={noop} /></Screen>}
      />

      <Compare
        bare
        name="Ventana centrada"
        use="Formularios como Nueva prenda. Se muestra abierta."
        oneNote="DS: hoja desde abajo (ya no hay ventana centrada)"
        one={<Screen><PCenterModal inline open onClose={noop} title="Nueva prenda" subtitle="Zapatillas" footer={<Button className="w-full">Agregar prenda</Button>}><div><PFieldLabel>Marca</PFieldLabel><PInputAdd value={text1} onChange={setText1} onAdd={() => setText1("")} placeholder="Agregar marca..." /></div></PCenterModal></Screen>}
        two={<Screen outfit><CenterModal inline open onClose={noop} title="Nueva prenda" subtitle="Zapatillas" footer={<ActionButton className="w-full">Agregar prenda</ActionButton>}><div><FieldLabel>Marca</FieldLabel><InputAdd value={text} onChange={setText} onAdd={() => setText("")} placeholder="Agregar marca..." /></div></CenterModal></Screen>}
      />

      <Compare
        name="Barra de abajo, vacío y aviso"
        use="Navegación con puntito, estado vacío y aviso flotante."
        oneNote="barra y vacío = propuesta; aviso = el que ya tenemos (tocalo)"
        one={
          <>
            <div className="rounded-box-m bg-background p-2"><PBottomNav value={nav1} onChange={setNav1} items={NAV_ITEMS} /></div>
            <PEmptyState icon={<Check className="size-8 text-primary" />} title="Outfit registrado" text="Podés modificarlo cuando quieras" />
            <Button variant="outline" className="self-center" onClick={() => toast("Outfit guardado ✓")}>Mostrar aviso</Button>
          </>
        }
        two={
          <>
            <BottomNav fixed={false} value={nav} onChange={setNav} items={NAV_ITEMS} />
            <EmptyState icon={<Check className="h-8 w-8" style={{ color: OUTFIT.success }} />} title="Outfit registrado" text="Podés modificarlo cuando quieras" />
            <div className="flex justify-center"><Toast fixed={false} message="Outfit guardado ✓" /></div>
          </>
        }
      />
    </div>
  )
}
