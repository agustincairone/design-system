// Guía: ejemplos de las piezas de gesture.
import * as React from "react"
import { CircleCheck, FileText } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DropZone } from "@/components/ui/drop-zone"
import { FilePreview } from "@/components/ui/file-preview"
import { IconList } from "@/components/ui/icon-list"

export function DropZoneDemo() {
  const [file, setFile] = React.useState<File | null>(null)
  const kb = file ? file.size / 1024 : 0
  return (
    <div className="grid w-full gap-box-gap md:grid-cols-2">
      <DropZone accept=".pdf" label={file ? "Elegir otro PDF" : "Elegir PDF"} onFile={setFile} />
      <FilePreview
        name={file?.name}
        preview={<div className="flex h-full w-full items-center justify-center bg-card text-sm">Primera página</div>}
        facts={[
          { label: "Páginas", value: "12" },
          { label: "Peso", value: kb > 1024 ? `${(kb / 1024).toFixed(1).replace(".", ",")} MB` : `${Math.max(1, Math.round(kb))} KB` },
          { label: "Formato", value: "Horizontal" },
          { label: "Modificado", value: file ? new Date(file.lastModified).toLocaleDateString("es-AR") : "" },
        ]}
        actions={
          <>
            <Button variant="secondary" onClick={() => setFile(null)}>Cancelar</Button>
            <Button>Presentar</Button>
          </>
        }
        empty={{ icon: <FileText />, title: "Todavía no subiste ningún PDF", text: "Cuando lo subas, acá vas a ver la primera página antes de presentar." }}
      />
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
