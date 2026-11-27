import * as React from "react"

import { EmptyState } from "@/components/ui/empty-state"
import { cn } from "@/lib/utils"

export type FileFact = { label: React.ReactNode; value: React.ReactNode }

// Vista previa de un archivo (de gesture), en una caja: arriba el nombre; en el medio la primera página
// (`preview`, ej: un canvas) sobre gris, en un recuadro horizontal; abajo los datos (páginas, peso…) en
// columnas, con el nombre en gris arriba y el valor abajo; y al final los botones (`actions`, ej: Cancelar y
// Presentar), que se reparten el ancho. Sin `name`, la misma caja muestra el estado vacío (`empty`).
// Va al lado de la caja para subir un archivo (DropZone): md:grid-cols-2 gap-box-gap.
export function FilePreview({
  name,
  preview,
  facts = [],
  actions,
  empty,
  className,
}: {
  name?: React.ReactNode
  preview?: React.ReactNode
  facts?: FileFact[]
  actions?: React.ReactNode
  empty?: { icon: React.ReactNode; title: string; text?: React.ReactNode }
  className?: string
}) {
  if (!name) {
    return (
      <div data-slot="file-preview" className={cn("flex flex-col items-center justify-center rounded-box-l bg-card", className)}>
        {empty && <EmptyState icon={empty.icon} title={empty.title} text={empty.text} />}
      </div>
    )
  }
  return (
    <div data-slot="file-preview" className={cn("flex flex-col gap-box-m rounded-box-l bg-card p-box-l", className)}>
      <p className="truncate text-lg font-medium">{name}</p>
      <div className="flex aspect-video items-center justify-center overflow-hidden rounded-box-s bg-inset p-box-s">{preview}</div>
      {facts.length > 0 && (
        <dl className="grid grid-cols-2 gap-box-s sm:grid-cols-4">
          {facts.map((f, i) => (
            <div key={i} className="flex min-w-0 flex-col gap-1">
              <dt className="text-xs text-muted-foreground">{f.label}</dt>
              <dd className="truncate text-sm font-medium">{f.value}</dd>
            </div>
          ))}
        </dl>
      )}
      {actions && <div className="mt-auto flex gap-box-xs *:flex-1">{actions}</div>}
    </div>
  )
}
