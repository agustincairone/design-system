// Guía, sección "Elegir opciones".
import * as React from "react"
import { Shirt, Wallet } from "lucide-react"

import { TileGroup } from "@/components/controls/tile-group"
import { Button } from "@/components/ui/button"
import { Chip, ChipGroup } from "@/components/ui/chip"
import { Demo, Section } from "@/guide/layout"
import { ColorsDaysDemo, PickManyDemo, TabsDemo } from "@/guide/guide-demos"
import { SegmentedIconsDemo } from "@/guide/link-demos"

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

// Una fila del ejemplo: el nombre a la izquierda y las piezas a la derecha
function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
      <span className="eyebrow w-40 shrink-0">{label}</span>
      <ChipGroup className="items-center">{children}</ChipGroup>
    </div>
  )
}

// Chips: sin ícono, con ícono, con cruz y en cada estado
function ChipsDemo() {
  const [on, setOn] = React.useState<string[]>(["Nike"])
  const [saved, setSaved] = React.useState(["Nike", "Adidas", "Vans"])
  const toggle = (v: string) => setOn((p) => (p.includes(v) ? p.filter((x) => x !== v) : [...p, v]))
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

export function ElegirSection() {
  return (
    <Section
      id="elegir"
      title="Elegir opciones"
      description="Para elegir una o varias opciones: píldora, pestañas, fichas, chips, casillas, colores y días."
    >
      <div className="grid gap-4">
        <Demo uses={["controls/segmented", "controls/tab-bar"]} label="Píldora y pestañas: hasta 3 opciones, píldora; más de 3, pestañas de ancho completo pegadas arriba de la caja" className="block">
          <TabsDemo />
        </Demo>
        <Demo uses={["controls/segmented"]} label="Píldora con íconos: con texto o sólo el ícono (ej: ver en grilla o en lista)">
          <SegmentedIconsDemo />
        </Demo>
        <Demo uses={["controls/tile-group"]} label="Fichas: compactas y a lo ancho (la elegida va del color de la app)" className="block">
          <TilesDemo />
        </Demo>
        <Demo uses={["ui/chip"]} label="Chips: se tocan para prender o apagar. Varios van en un ChipGroup, a 4px uno del otro" className="block">
          <ChipsDemo />
        </Demo>
        <Demo uses={["ui/checkbox"]} label="Elegir varias: cada opción en su caja S, toda la caja se puede tocar">
          <PickManyDemo />
        </Demo>
        <Demo uses={["controls/color-swatches", "controls/date-strip"]} label="Colores (hasta 3, el elegido con aro) y días (hoy con borde, con algo cargado = puntito)">
          <ColorsDaysDemo />
        </Demo>
      </div>
    </Section>
  )
}
