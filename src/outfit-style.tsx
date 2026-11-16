// Guía: estilo "outfit" (componentes copiados tal cual de outfit-tracker),
// al lado del estilo actual del sistema para poder comparar y elegir.
import * as React from "react"
import { BarChart2, Calendar, Check, LayoutGrid, Shirt, User } from "lucide-react"

import { TileGroup } from "@/components/controls/tile-group"
import { Segmented } from "@/components/controls/segmented"
import { Button } from "@/components/ui/button"
import { OUTFIT, OUTFIT_FONT } from "@/components/outfit/palette"
import { TabBar } from "@/components/outfit/tab-bar"
import { ChipTag, FilterChips } from "@/components/outfit/chips"
import { ActionButton, DashedAddButton, RoundBackButton } from "@/components/outfit/action-button"
import { ColorDots, ItemCard, ItemCardSmall, ItemRow, type OutfitItem } from "@/components/outfit/item-card"
import { ColorSwatches } from "@/components/outfit/color-swatches"
import { DateStrip } from "@/components/outfit/date-strip"
import { BottomSheet, CenterModal, ConfirmSheet } from "@/components/outfit/sheets"
import { BottomNav } from "@/components/outfit/bottom-nav"
import { EmptyState, FieldLabel, InputAdd, Panel, Toast } from "@/components/outfit/misc"
import { toast } from "sonner"
import { ChevronLeft, Plus } from "lucide-react"
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

// Una fila de comparación: estilo 1 (sistema) | estilo 2 (outfit)
function Compare({ name, use, one, two, proposal }: { name: string; use: string; one?: React.ReactNode; two: React.ReactNode; proposal?: boolean }) {
  return (
    <div className="flex flex-col gap-3 rounded-3xl bg-card p-5">
      <div>
        <div className="text-sm font-medium">{name}</div>
        <div className="text-xs text-muted-foreground">{use}</div>
      </div>
      <div className={"grid gap-3 " + (one ? "md:grid-cols-2" : "")}>
        {one && (
          <div className="flex flex-col gap-2">
            <span className="eyebrow">{proposal ? "Estilo 1 · propuesta (todavía no existe)" : "Estilo 1 · sistema"}</span>
            <div className="flex min-h-24 flex-col justify-center gap-3 rounded-box-m bg-inset p-box-m" data-variant="inset">{one}</div>
          </div>
        )}
        <div className="flex flex-col gap-2">
          <span className="eyebrow">Estilo 2 · outfit</span>
          <div className="flex min-h-24 flex-col justify-center gap-3 rounded-box-m p-box-m" style={{ background: OUTFIT.bg, fontFamily: OUTFIT_FONT, color: OUTFIT.text }}>{two}</div>
        </div>
      </div>
    </div>
  )
}

export function OutfitStyle() {
  const [cat, setCat] = React.useState("Zapatillas")
  const [mode, setMode] = React.useState("year")
  const [brand, setBrand] = React.useState<string | null>(null)
  const [chip, setChip] = React.useState("Nike")
  const [cols, setCols] = React.useState([SWATCHES[1]])
  const [day, setDay] = React.useState("a")
  const [sel, setSel] = React.useState(1)
  const [nav, setNav] = React.useState("registrar")
  const [sheet, setSheet] = React.useState<null | "sheet" | "confirm" | "modal">(null)
  const [text, setText] = React.useState("")
  const [text1, setText1] = React.useState("")
  const [chip1, setChip1] = React.useState("Nike")
  const [cols1, setCols1] = React.useState([SWATCHES[1]])
  const [day1, setDay1] = React.useState("a")
  const [sel1, setSel1] = React.useState(1)
  const [nav1, setNav1] = React.useState("registrar")
  const [sheet1, setSheet1] = React.useState<null | "sheet" | "confirm" | "modal">(null)
  const toggle = (set: typeof setCols) => (c: (typeof SWATCHES)[number]) => set((p) => p.find((x) => x.hex === c.hex) ? p.filter((x) => x.hex !== c.hex) : p.length >= 3 ? p : [...p, c])
  const NAV_ITEMS = [{ key: "registrar", icon: Shirt }, { key: "historial", icon: Calendar }, { key: "prendas", icon: LayoutGrid }, { key: "stats", icon: BarChart2 }, { key: "perfil", icon: User }]

  return (
    <div className="grid gap-4">
      <Compare
        name="Tabs"
        use="Elegir una categoría o un período. Estilo 2: fila de ancho completo con divisores, la elegida en negro."
        one={
          <>
            <TileGroup columns={3} label="Categoría" value={cat} onChange={setCat} options={CATS.map((c) => ({ value: c, label: c }))} />
            <Segmented size="sm" className="self-start" value={mode} onChange={setMode} options={[{ value: "year", label: "Año" }, { value: "month", label: "Mes" }]} />
          </>
        }
        two={
          <Panel className="overflow-hidden">
            <TabBar value={cat} onChange={setCat} options={CATS.map((c) => ({ value: c, label: c }))} />
            <div className="h-3" />
            <TabBar value={mode} onChange={setMode} options={[{ value: "year", label: "Año" }, { value: "month", label: "Mes" }]} />
          </Panel>
        }
      />
      <Compare
        name="Filtro con chips"
        use="Filtrar una lista (ej: por marca)."
        one={
          <div className="flex gap-2">
            {[null, "Adidas", "Nike", "Vans"].map((b) => (
              <Button key={b ?? "todo"} size="sm" variant={brand === b ? "default" : "outline"} onClick={() => setBrand(b)}>{b ?? "Todo"}</Button>
            ))}
          </div>
        }
        two={<FilterChips value={brand} onChange={setBrand} options={[null, "Adidas", "Nike", "Vans"].map((b) => ({ value: b, label: b ?? "Todo" }))} />}
      />
      <Compare
        name="Chips guardados + campo con +"
        use="Escribir un valor nuevo o elegir uno ya guardado, con cruz para borrarlo. El estilo 1 usa el Input del sistema."
        proposal
        one={
          <div>
            <PFieldLabel>Marca</PFieldLabel>
            <PInputAdd value={text1} onChange={setText1} onAdd={() => setText1("")} placeholder="Agregar marca..." />
            <div className="mt-2 flex gap-2">
              {["Nike", "Adidas", "Vans"].map((b) => <PChipTag key={b} label={b} selected={chip1 === b} onSelect={() => setChip1(b)} onDelete={() => {}} />)}
            </div>
          </div>
        }
        two={
          <div>
            <FieldLabel>Marca</FieldLabel>
            <InputAdd value={text} onChange={setText} onAdd={() => setText("")} placeholder="Agregar marca..." />
            <div className="mt-2 flex gap-2">
              {["Nike", "Adidas", "Vans"].map((b) => <ChipTag key={b} label={b} selected={chip === b} onSelect={() => setChip(b)} onDelete={() => {}} />)}
            </div>
          </div>
        }
      />
      <Compare
        name="Botones"
        use="Acciones grandes de ancho completo. Principal negro, secundario gris, peligro rojo, agregar punteado."
        one={
          <>
            <div className="flex flex-col gap-3 rounded-box-s bg-card p-box-s">
            <div className="flex gap-2">
              <Button variant="destructive-outline" size="lg" className="flex-1">Cancelar</Button>
              <Button variant="secondary" size="lg" className="flex-1">Omitir</Button>
              <Button size="lg" className="flex-1">Siguiente</Button>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" size="lg" className="flex-1">Volver</Button>
              <Button variant="destructive" size="lg" className="flex-1">Eliminar</Button>
              <Button size="lg" disabled className="flex-1">Guardar</Button>
            </div>
            <Button variant="outline" size="lg" className="w-full border-dashed"><Plus className="size-4" /> Agregar nueva prenda</Button>
            <div className="flex items-center gap-3"><Button variant="outline" size="icon-sm" aria-label="Anterior"><ChevronLeft className="size-4" /></Button><span className="title-box">Zapatillas</span></div>
            </div>
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
        proposal
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
        proposal
        one={
          <>
            <PColorSwatches colors={SWATCHES} value={cols1} onToggle={toggle(setCols1)} />
            <PDateStrip days={DAYS} value={day1} onChange={setDay1} />
          </>
        }
        two={
          <>
            <ColorSwatches colors={SWATCHES} value={cols} onToggle={toggle(setCols)} />
            <DateStrip days={DAYS} value={day} onChange={setDay} />
          </>
        }
      />
      <Compare
        name="Hojas y ventanas"
        use="Hoja desde abajo, confirmación y ventana centrada. Tocá para abrirlas."
        proposal
        one={
          <div className="flex flex-wrap gap-2 rounded-box-s bg-card p-box-s">
            <Button variant="secondary" onClick={() => setSheet1("sheet")}>Hoja</Button>
            <Button variant="secondary" onClick={() => setSheet1("confirm")}>Confirmación</Button>
            <Button variant="secondary" onClick={() => setSheet1("modal")}>Ventana</Button>
          </div>
        }
        two={
          <div className="flex flex-wrap gap-2">
            <ActionButton tone="secondary" className="px-4" onClick={() => setSheet("sheet")}>Hoja</ActionButton>
            <ActionButton tone="secondary" className="px-4" onClick={() => setSheet("confirm")}>Confirmación</ActionButton>
            <ActionButton tone="secondary" className="px-4" onClick={() => setSheet("modal")}>Ventana</ActionButton>
          </div>
        }
      />
      <Compare
        name="Barra de abajo, vacío y aviso"
        use="Navegación con puntito, estado vacío y aviso flotante."
        proposal
        one={
          <>
            <PBottomNav value={nav1} onChange={setNav1} items={NAV_ITEMS} />
            <div className="rounded-box-s bg-card p-box-l"><PEmptyState icon={<Check className="size-8 text-primary" />} title="Outfit registrado" text="Podés modificarlo cuando quieras" /></div>
            <Button variant="outline" className="self-center" onClick={() => toast("Outfit guardado ✓")}>Mostrar aviso</Button>
          </>
        }
        two={
          <>
            <Panel><BottomNav fixed={false} value={nav} onChange={setNav} items={NAV_ITEMS} /></Panel>
            <Panel className="p-5"><EmptyState icon={<Check className="h-8 w-8" style={{ color: OUTFIT.success }} />} title="Outfit registrado" text="Podés modificarlo cuando quieras" /></Panel>
            <div className="flex justify-center"><Toast fixed={false} message="Outfit guardado ✓" /></div>
          </>
        }
      />
      <PBottomSheet open={sheet1 === "sheet"} onClose={() => setSheet1(null)} title="Zapatillas">
        <div className="rounded-box-m bg-inset p-box-m"><PItemRow item={ITEMS[0]} /></div>
      </PBottomSheet>
      <PConfirmSheet open={sheet1 === "confirm"} onClose={() => setSheet1(null)} title="Eliminar outfit" question="¿Estás seguro que querés eliminar este outfit?" detail="Recordá que podés volver a cargarlo nuevamente." confirmLabel="Eliminar" onConfirm={() => setSheet1(null)} />
      <PCenterModal open={sheet1 === "modal"} onClose={() => setSheet1(null)} title="Nueva prenda" subtitle="Zapatillas" footer={<Button size="lg" className="w-full" onClick={() => setSheet1(null)}>Agregar prenda</Button>}>
        <div><PFieldLabel>Marca</PFieldLabel><PInputAdd value={text1} onChange={setText1} onAdd={() => setText1("")} placeholder="Agregar marca..." /></div>
      </PCenterModal>
      <div style={{ fontFamily: OUTFIT_FONT }}>
        <BottomSheet open={sheet === "sheet"} onClose={() => setSheet(null)} title="Zapatillas">
          <div className="p-4 pb-8"><ItemRow item={ITEMS[0]} /></div>
        </BottomSheet>
        <ConfirmSheet open={sheet === "confirm"} onClose={() => setSheet(null)} title="Eliminar outfit" question="¿Estás seguro que querés eliminar este outfit?" detail="Recordá que podés volver a cargarlo nuevamente." confirmLabel="Eliminar" onConfirm={() => setSheet(null)} />
        <CenterModal open={sheet === "modal"} onClose={() => setSheet(null)} title="Nueva prenda" subtitle="Zapatillas" footer={<ActionButton className="w-full" onClick={() => setSheet(null)}>Agregar prenda</ActionButton>}>
          <div><FieldLabel>Marca</FieldLabel><InputAdd value={text} onChange={setText} onAdd={() => setText("")} placeholder="Agregar marca..." /></div>
        </CenterModal>
      </div>
    </div>
  )
}
