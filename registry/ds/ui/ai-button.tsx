import * as React from "react"
import { Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"

// Generar con IA: el botón chico gris con el destello del color de la app (al pasar el mouse el botón
// se pinta del color de la app y el destello pasa a blanco). Mientras trabaja (`busy`) queda apagado
// y dice "Generando...". Va a la derecha del nombre del campo que completa (ej: título, descripción).
export function AiButton({
  busy,
  busyLabel = "Generando...",
  children = "Generar con IA",
  ...props
}: Omit<React.ComponentProps<typeof Button>, "variant" | "size"> & { busy?: boolean; busyLabel?: string }) {
  return (
    <Button data-slot="ai-button" variant="secondary" size="sm" disabled={busy || props.disabled} {...props}>
      <Sparkles className="text-brand-text group-hover/button:text-current group-disabled/button:text-current" />
      {busy ? busyLabel : children}
    </Button>
  )
}
