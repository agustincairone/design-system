// Guía: "Estilo aplicado" = lo que ya se eligió. Usa el color que esté elegido arriba en la guía.
import * as React from "react"
import { ImageIcon } from "lucide-react"

import { Segmented } from "@/components/controls/segmented"
import { TabBar } from "@/components/controls/tab-bar"
import { Chip } from "@/components/ui/chip"
import { PFieldLabel, PInputAdd } from "@/outfit-proposals"
import { Button } from "@/components/ui/button"
import { ColorDots, ItemCard, ItemCardSmall, ItemRow, type Item } from "@/components/cards/item-card"
import { ChevronLeft, Plus } from "lucide-react"

const ITEMS: Item[] = [
  { marca: "Nike", modelo: "Air Force", colors: [{ hex: "#FFFFFF" }] },
  { marca: "Levis", modelo: "501", tipo: "Jean", colors: [{ hex: "#23466A" }] },
  { marca: "Uniqlo", modelo: "U", tipo: "Lisa", colors: [{ hex: "#1A1A1A" }, { hex: "#C0392B" }] },
]
const CATS = ["Zapatillas", "Abajo", "Remera", "Camisa", "Arriba", "Campera"]

function Rule({ title, rule, children }: { title: string; rule: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <div>
        <div className="text-sm font-medium">{title}</div>
        <div className="text-xs text-muted-foreground">{rule}</div>
      </div>
      {children}
    </div>
  )
}

export function AppliedStyle() {
  const [cat, setCat] = React.useState("Zapatillas")
  const [mode, setMode] = React.useState("year")
  const [range, setRange] = React.useState("mes")
  const [brand, setBrand] = React.useState("Todo")
  const [text, setText] = React.useState("")
  const [saved, setSaved] = React.useState(["Nike", "Adidas", "Vans"])
  const [pick, setPick] = React.useState("Nike")
  const [sel, setSel] = React.useState(1)

  return (
    <>
      <div className="grid gap-10">
        <Rule title="Tabs" rule="Hasta 3 opciones → píldora con opciones (normal). Más de 3 → tab de ancho completo (diseño outfit), pegada arriba de la caja.">
          <div className="grid items-start gap-3 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <span className="eyebrow">2 opciones · píldora</span>
              <div className="rounded-box-l bg-card p-box-l">
                <Segmented label="Período" value={mode} onChange={setMode} options={[{ value: "year", label: "Año" }, { value: "month", label: "Mes" }]} />
              </div>
              <span className="eyebrow pt-2">3 opciones · píldora</span>
              <div className="rounded-box-l bg-card p-box-l">
                <Segmented label="Rango" value={range} onChange={setRange} options={[{ value: "mes", label: "Este mes" }, { value: "anio", label: "Este año" }, { value: "todo", label: "Todo" }]} />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <span className="eyebrow">6 opciones · tab de ancho completo</span>
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
            </div>
          </div>
        </Rule>

        <Rule title="Filtro con chips" rule="Estilo 1: el Chip del sistema. Uno elegido a la vez; el elegido va del color de la app.">
          <div className="rounded-box-l bg-card p-box-l md:max-w-[calc(50%-6px)]">
            <div className="flex flex-wrap gap-2">
              {["Todo", "Adidas", "Nike", "Vans"].map((b) => <Chip key={b} selected={brand === b} onClick={() => setBrand(b)}>{b}</Chip>)}
            </div>
          </div>
        </Rule>

        <Rule title="Chips guardados + campo con +" rule="Estilo 1: Input + botón + (gris mientras está vacío) + Chips con cruz. Al pasar el mouse por un chip con cruz sólo se pinta el fondo de gris.">
          <div className="rounded-box-l bg-card p-box-l md:max-w-[calc(50%-6px)]">
            <PFieldLabel>Marca</PFieldLabel>
            <PInputAdd value={text} onChange={setText} onAdd={() => { const v = text.trim(); if (v && !saved.includes(v)) setSaved((p) => [...p, v]); setPick(v); setText("") }} placeholder="Agregar marca..." />
            <div className="mt-2 flex flex-wrap gap-2">
              {saved.map((b) => <Chip key={b} selected={pick === b} onClick={() => setPick(b)} onRemove={() => setSaved((p) => p.filter((x) => x !== b))} removeLabel={"Borrar " + b}>{b}</Chip>)}
            </div>
          </div>
        </Rule>

        <Rule title="Botones" rule="Estilo 1, todos de 40px de alto con letra de 14px. Cancelar tiene dos opciones: con borde o suave (gris con texto rojo). Guardar deshabilitado = grises. Agregar = punteado con texto gris.">
          <div className="flex flex-col gap-3 rounded-box-l bg-card p-box-l md:max-w-[calc(50%-6px)]">
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
            <div className="flex items-center gap-3">
              <span className="eyebrow-plain">Cancelar, la otra opción:</span>
              <Button variant="destructive-soft">Cancelar</Button>
            </div>
            <div className="flex items-center gap-3"><Button variant="outline" size="icon-sm" aria-label="Anterior"><ChevronLeft className="size-4" /></Button><span className="text-sm font-medium">Zapatillas</span></div>
          </div>
        </Rule>

        <Rule title="Fichas de prenda" rule="Estilo 1. Fondo gris más claro que las cajas (tile), elegida con borde de 1,5px del color de la app, puntitos de color sin borde.">
          <div className="flex flex-col gap-3 rounded-box-l bg-card p-box-l md:max-w-[calc(50%-6px)]">
            <div className="grid max-w-[360px] grid-cols-3 gap-box-gap">
              {ITEMS.map((it, i) => <ItemCard key={i} item={it} selected={sel === i} onClick={() => setSel(i)} />)}
            </div>
            <div className="flex gap-4">{ITEMS.map((it, i) => <ItemCardSmall key={i} item={it} />)}</div>
            <div className="max-w-[360px]"><ItemRow item={ITEMS[1]} right={<span className="text-sm font-semibold">12x</span>} /></div>
            <div className="flex items-center gap-3"><ColorDots colors={ITEMS[2].colors} size={18} /><span className="text-xs text-muted-foreground">puntitos de color</span></div>
          </div>
        </Rule>
      </div>
    </>
  )
}
