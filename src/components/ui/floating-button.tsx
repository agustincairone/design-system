import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

// Botón flotante para agregar (diseño de pay): abajo al centro, fijo mientras se desplaza la página,
// sin sombra. Abajo de todo (con la rayita de inicio del celular) o, con `aboveNav`, encima de la
// barra de abajo, a 16px (a la misma altura que el aviso). Lleva ícono + texto (ej: "+ Agregar gasto").
// `inline` lo dibuja en su lugar en vez de fijo (sólo para la guía).
export function FloatingButton({
  aboveNav,
  inline,
  className,
  ...props
}: React.ComponentProps<typeof Button> & { aboveNav?: boolean; inline?: boolean }) {
  return (
    <Button
      data-slot="floating-button"
      className={cn(!inline && "fixed left-1/2 z-40 -translate-x-1/2", !inline && (aboveNav ? "bottom-above-nav" : "bottom-screen-bottom mb-box-xs"), className)}
      {...props}
    />
  )
}
