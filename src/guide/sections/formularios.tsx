// Guía, sección "Formularios".
import * as React from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { FieldLabel } from "@/components/ui/field-label"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { Demo, Section } from "@/guide/layout"
import { SavedValuesDemo, SearchDemo, SuggestDemo } from "@/guide/guide-demos"
import { LineInputDemo } from "@/guide/link-demos"
import { DropZoneDemo } from "@/guide/gesture-demos"

export function FormulariosSection() {
  const [volume, setVolume] = React.useState([70])
  return (
    <Section
      id="formularios"
      title="Formularios"
      description="Campos de texto, selectores, casillas y sliders, todos con el mismo alto, borde y foco."
    >
      <div className="grid gap-4">
        <Demo uses={["ui/field-label", "ui/input", "ui/select", "ui/slider", "ui/search-input", "ui/suggest-input", "ui/textarea", "ui/checkbox"]} label="Campos: label gris a 4px arriba del campo, todos del mismo alto" className="grid gap-5 sm:grid-cols-2">
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
            <FieldLabel>Buscador: lupa adelante y cruz para borrar lo escrito</FieldLabel>
            <SearchDemo />
          </div>
          <div className="sm:col-span-2">
            <FieldLabel htmlFor="bodega-demo">Con sugerencias: sin ícono; lo ya cargado aparece en la lista de los desplegables</FieldLabel>
            <SuggestDemo />
          </div>
          <div className="sm:col-span-2">
            <FieldLabel htmlFor="notes">Notas (varias líneas: alto fijo; con límite, cuenta las letras)</FieldLabel>
            <Textarea id="notes" maxLength={200} placeholder="Algo para recordar…" />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="paid" defaultChecked />
            <Label htmlFor="paid">Ya está pagado</Label>
          </div>
        </Demo>
        <Demo uses={["ui/input", "ui/chip"]} label="Campo con + para agregar, y lo guardado como chips con cruz">
          <SavedValuesDemo />
        </Demo>
        <Demo uses={["ui/drop-zone"]} label="Caja para subir un archivo (de gesture): grande, del color de la app, con una línea punteada adentro, el botón blanco y “o soltalo acá”. Se toca toda la caja o se suelta el archivo encima; al pasar el mouse se aclara un tono">
          <DropZoneDemo />
        </Demo>
        <Demo uses={["ui/line-input"]} label="Campo de línea: el otro campo de texto. Sin caja, una línea abajo y el nombre abajo en gris. Para los pasos de una hoja que piden un solo dato; crece con el texto y cuenta las letras" className="block">
          <LineInputDemo />
        </Demo>
      </div>
    </Section>
  )
}
