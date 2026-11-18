import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Chip } from "@/components/ui/chip"
import { Toggle } from "@/components/ui/toggle"
import { TabBar } from "@/components/controls/tab-bar"

// Inventario de letra chica: dónde se usa 12px y qué está fuera de la escala (12 · 15 · 18 · 20).
// Para tener a mano qué hay que decidir. Cada muestra usa el tamaño real del componente.

type Row = { name: string; size: string; where: string; sample: React.ReactNode }

function Table({ title, note, rows }: { title: string; note: string; rows: Row[] }) {
  return (
    <div className="flex flex-col gap-3">
      <div>
        <div className="text-lg font-medium">{title}</div>
        <div className="text-sm text-muted-foreground">{note}</div>
      </div>
      <div className="divide-y rounded-3xl bg-card">
        {rows.map((r) => (
          <div key={r.name + r.size} className="grid gap-3 p-5 sm:grid-cols-[200px_70px_1fr_200px] sm:items-center">
            <div className="text-sm font-medium">{r.name}</div>
            <div className="font-mono text-sm text-muted-foreground">{r.size}</div>
            <div className="text-sm text-muted-foreground">{r.where}</div>
            <div className="min-w-0">{r.sample}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function TypeAudit() {
  const [tab, setTab] = React.useState("contado")
  const twelve: Row[] = [
    {
      name: "Pestañas (TabBar)",
      size: "12px",
      where: "El total abajo de cada pestaña",
      sample: (
        <TabBar label="Ejemplo" value={tab} onChange={setTab} className="rounded-t-box-l"
          options={[{ value: "contado", label: "Contado", sub: "$943.200" }, { value: "tarjeta", label: "Tarjeta", sub: "$45.000" }]} />
      ),
    },
    { name: "Botón chico (sm)", size: "12px", where: "El texto del botón", sample: <Button size="sm">Chico</Button> },
    { name: "Botón muy chico (xs)", size: "12px", where: "El texto del botón", sample: <Button size="xs">Muy chico</Button> },
    { name: "Badge", size: "12px", where: "El texto de la etiqueta", sample: <Badge variant="secondary">Etiqueta</Badge> },
    { name: "Desplegable (Select)", size: "12px", where: "El título de un grupo de opciones adentro de la lista", sample: <span className="text-xs text-muted-foreground">Servicios</span> },
    { name: "Tira de fechas (outfit)", size: "12px", where: "El día y la fecha abajo", sample: <span className="flex flex-col items-center"><span className="text-xs font-medium">Lun</span><span className="text-xs text-muted-foreground">17/11</span></span> },
    { name: "Tarjeta de prenda grande (outfit)", size: "12px", where: "Marca y modelo · tipo", sample: <span className="flex flex-col"><span className="text-xs font-medium">Nike</span><span className="text-xs font-medium text-muted-foreground">Air Max · Zapatilla</span></span> },
    { name: "Slider de campo", size: "12px", where: "La etiqueta de abajo", sample: <span className="text-xs">Volumen</span> },
    { name: "Etiqueta simple (eyebrow-plain)", size: "12px", where: "Las etiquetas chicas de outfit", sample: <span className="eyebrow-plain">Total del mes</span> },
    { name: "Audio (LOOP)", size: "12px", where: "Perilla, selector, fader y toggle redondo: el valor o la etiqueta chica", sample: <span className="live-number font-mono text-xs font-semibold">450ms · 60%</span> },
  ]
  const off: Row[] = [
    { name: "Chip", size: "12.8px", where: "Todos los chips: filtros, personas en Análisis, chips con cruz de outfit", sample: <span className="flex gap-2"><Chip selected>Todos</Chip><Chip>Agus</Chip></span> },
    { name: "Toggle chico", size: "12.8px", where: "El texto del toggle en tamaño chico", sample: <Toggle size="sm">Toggle</Toggle> },
    { name: "Etiqueta en mayúsculas (eyebrow)", size: "11px", where: "Las etiquetas en mayúsculas de LOOP", sample: <span className="eyebrow">Total del mes</span> },
    { name: "Tarjeta de prenda (outfit)", size: "11px", where: "Marca, modelo y tipo en la ficha normal", sample: <span className="flex flex-col text-[11px] leading-[14px] font-medium"><span>Nike</span><span className="text-muted-foreground">Air Max</span></span> },
    { name: "Tarjeta de prenda chica (outfit)", size: "10px", where: "Lo mismo, en la ficha de 60px del historial", sample: <span className="flex flex-col text-[10px] leading-[14px] font-medium"><span>Nike</span><span className="text-muted-foreground">Air Max</span></span> },
    { name: "Afinador (LOOP)", size: "10px", where: "Los numeritos de la regla", sample: <span className="flex gap-4 font-mono text-[10px] text-muted-foreground"><span>-50</span><span>0</span><span>+50</span></span> },
    { name: "Dial (LOOP)", size: "11px", where: "La etiqueta abajo del número (el número crece con el dial)", sample: <span className="text-[11px] text-muted-foreground">BPM</span> },
    { name: "Pad XY (LOOP)", size: "11px", where: "Las etiquetas de los ejes", sample: <span className="flex gap-3 font-mono text-[11px] text-muted-foreground"><span>X · Filtro</span><span>Y · Eco</span></span> },
    { name: "Botoncitos de parámetro (LOOP)", size: "11px", where: "La letra adentro del círculo", sample: <span className="grid size-6 place-items-center rounded-full border bg-secondary font-mono text-[11px] leading-none font-bold">A</span> },
    { name: "Fleje", size: "25px", where: "El número de puntitos de cada sección (podría contar como título grande)", sample: <span className="font-readout text-[25px] leading-none">128</span> },
  ]
  return (
    <div className="flex flex-col gap-section">
      <Table title="Dónde se usa 12px" note="Todo lo que hoy va en 12px, el paso más chico de la escala." rows={twelve} />
      <Table title="Fuera de escala" note="Tamaños que no son 12, 15, 18 ni 20. Hay que decidir si pasan a 12 (o a 15)." rows={off} />
    </div>
  )
}
