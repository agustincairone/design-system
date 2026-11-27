// Guía: ejemplos de las piezas de gesture.
import * as React from "react"
import { CircleCheck } from "lucide-react"

import { DropZone } from "@/components/ui/drop-zone"
import { IconList } from "@/components/ui/icon-list"

export function DropZoneDemo() {
  const [file, setFile] = React.useState<string | null>(null)
  return (
    <div className="flex w-full flex-col gap-box-s">
      <DropZone accept=".pdf" label="Elegir PDF" onFile={(f) => setFile(f.name)} />
      <p className="text-xs text-muted-foreground">{file ? `Elegiste: ${file}` : "Tocala o soltá un archivo encima."}</p>
    </div>
  )
}

export function IconListDemo() {
  return (
    <div className="grid w-full gap-section md:grid-cols-2">
      <IconList
        items={[
          { icon: <CircleCheck />, text: "Funciona en el navegador, sin instalar nada" },
          { icon: <CircleCheck />, text: "Tu PDF y la cámara no salen de tu compu" },
          { icon: <CircleCheck />, text: "También con el mouse o las flechas del teclado" },
        ]}
      />
      <IconList
        items={[
          { icon: "📄", title: "Subí un PDF", text: "Arrastralo a la caja o elegilo de tu compu." },
          { icon: "👌", title: "Hacé el gesto OK", text: "Costado izquierdo, vuelve; costado derecho, avanza." },
        ]}
      />
    </div>
  )
}
