import * as React from "react"

import { cn } from "@/lib/utils"

// Label de un campo: letra normal en gris, del mismo tamaño que el texto del input
// (14px siempre), 6px arriba del input.
// `right` muestra algo a la derecha (ej: "2/3").

export function FieldLabel({
  children,
  right,
  htmlFor,
  className,
}: {
  children: React.ReactNode
  right?: React.ReactNode
  htmlFor?: string
  className?: string
}) {
  return (
    <div data-slot="field-label" className={cn("mb-1.5 flex items-center", className)}>
      <label htmlFor={htmlFor} className="text-sm text-muted-foreground">{children}</label>
      {right && <span className="ml-auto text-sm text-muted-foreground">{right}</span>}
    </div>
  )
}
