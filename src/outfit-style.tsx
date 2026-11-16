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
function Compare({ name, use, one, two }: { name: string; use: string; one?: React.ReactNode; two: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3 rounded-3xl bg-card p-5">
      <div>
        <div className="text-sm font-medium">{name}</div>
        <div className="text-xs text-muted-foreground">{use}</div>
      </div>
      <div className={"grid gap-3 " + (one ? "md:grid-cols-2" : "")}>
        {one && (
          <div className="flex flex-col gap-2">
            <span className="eyebrow">Estilo 1 · sistema</span>
            <div className="flex min-h-24 flex-col justify-center gap-3 rounded-box-m bg-inset p-box-m">{one}</div>
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

  return (
    <div className="grid gap-4">
      <Compare
        name="Tabs"
        use="Elegir una categoría o un período. Estilo 2: fila de ancho completo con divisores, la elegida en negro."
        one={<TileGroup columns={3} label="Categoría" value={cat} onChange={setCat} options={CATS.map((c) => ({ value: c, label: c }))} />}
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
        use="Escribir un valor nuevo o elegir uno ya guardado, con cruz para borrarlo."
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
            <div className="flex gap-2"><Button variant="destructive-outline" size="lg" className="flex-1">Cancelar</Button><Button size="lg" className="flex-1">Siguiente</Button></div>
            <Button variant="outline" size="lg" className="w-full border-dashed">Agregar nueva prenda</Button>
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
        two={
          <>
            <ColorSwatches colors={SWATCHES} value={cols} onToggle={(c) => setCols((p) => p.find((x) => x.hex === c.hex) ? p.filter((x) => x.hex !== c.hex) : p.length >= 3 ? p : [...p, c])} />
            <DateStrip days={DAYS} value={day} onChange={setDay} />
          </>
        }
      />
      <Compare
        name="Hojas y ventanas"
        use="Hoja desde abajo, confirmación y ventana centrada. Tocá para abrirlas."
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
        two={
          <>
            <Panel><BottomNav fixed={false} value={nav} onChange={setNav} items={[{ key: "registrar", icon: Shirt }, { key: "historial", icon: Calendar }, { key: "prendas", icon: LayoutGrid }, { key: "stats", icon: BarChart2 }, { key: "perfil", icon: User }]} /></Panel>
            <Panel className="p-5"><EmptyState icon={<Check className="h-8 w-8" style={{ color: OUTFIT.success }} />} title="Outfit registrado" text="Podés modificarlo cuando quieras" /></Panel>
            <div className="flex justify-center"><Toast fixed={false} message="Outfit guardado ✓" /></div>
          </>
        }
      />
      <div style={{ fontFamily: OUTFIT_FONT }}>
        <BottomSheet open={sheet === "sheet"} onClose={() => setSheet(null)} title="Zapatillas">
          <div className="p-4 pb-8"><ItemRow item={ITEMS[0]} /></div>
        </BottomSheet>
        <ConfirmSheet open={sheet === "confirm"} onClose={() => setSheet(null)} title="Eliminar outfit" question="¿Estás seguro que querés eliminar este outfit?" detail="Recordá que podés volver a cargarlo nuevamente." confirmLabel="Eliminar" onConfirm={() => setSheet(null)} />
        <CenterModal open={sheet === "modal"} onClose={() => setSheet(null)} title="Nueva prenda" subtitle="Zapatillas" footer={<ActionButton className="w-full" onClick={() => setSheet(null)}>Agregar prenda</ActionButton>}>
          <div><FieldLabel>Marca</FieldLabel><InputAdd value={text} onChange={setText} onAdd={() => setText("")} placeholder="Agregar marca..." /></div>
        </CenterModal>
      </div>
      <p className="text-xs text-muted-foreground">El segmentado del estilo 1 también sirve para Año / Mes: <Segmented size="sm" value={mode} onChange={setMode} options={[{ value: "year", label: "Año" }, { value: "month", label: "Mes" }]} /></p>
    </div>
  )
}
