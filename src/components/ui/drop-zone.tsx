import * as React from "react"
import { FileUp } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Caja para subir un archivo (de gesture): grande, del color de la app, con una línea punteada adentro.
// En el medio, el ícono, un botón blanco para elegir el archivo y "o soltalo acá". Se toca toda la caja
// para elegir, o se suelta el archivo encima; al pasar el mouse o arrastrar algo encima, se aclara un tono.
// Con `loading`, muestra el texto de carga en lugar del botón.
export function DropZone({
  onFile,
  accept,
  label = "Elegir archivo",
  hint = "o soltalo acá",
  loading,
  loadingText = "Cargando...",
  icon,
  className,
}: {
  onFile: (file: File) => void
  accept?: string
  label?: React.ReactNode
  hint?: React.ReactNode
  loading?: boolean
  loadingText?: React.ReactNode
  icon?: React.ReactNode
  className?: string
}) {
  const [over, setOver] = React.useState(false)
  return (
    <label
      data-slot="drop-zone"
      data-over={over || undefined}
      onDragOver={(e) => {
        e.preventDefault()
        setOver(true)
      }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => {
        e.preventDefault()
        setOver(false)
        const file = e.dataTransfer.files[0]
        if (file) onFile(file)
      }}
      className={cn(
        "flex min-h-80 cursor-pointer rounded-box-l bg-brand p-box-s text-brand-foreground transition-colors hover:bg-brand-hover data-over:bg-brand-hover has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-brand",
        className,
      )}
    >
      <div className="flex flex-1 flex-col items-center justify-center gap-box-m rounded-box-s border border-dashed border-brand-foreground p-box-2xl text-center">
        {icon ?? <FileUp aria-hidden strokeWidth={1.5} className="size-12" />}
        {loading ? (
          <span className="text-sm">{loadingText}</span>
        ) : (
          <>
            <span className={cn(buttonVariants({ variant: "card" }), "pointer-events-none")}>{label}</span>
            <span className="text-sm">{hint}</span>
          </>
        )}
      </div>
      <input
        type="file"
        accept={accept}
        className="sr-only"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) onFile(file)
          e.target.value = ""
        }}
      />
    </label>
  )
}
