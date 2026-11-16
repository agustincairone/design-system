import * as React from "react"
import { cn } from "@/lib/utils"

// Columna para un control vertical (ej: FieldSlider orientation="vertical" hideText):
// nombre y valor arriba, afuera del control; el control llena el alto; botones abajo.
// Con `off`, el valor muestra `offText` y el control se atenúa.

export function FieldColumn({
  label,
  value,
  off,
  offText = "OFF",
  hint,
  buttons,
  className,
  children,
}: {
  label: React.ReactNode
  value: React.ReactNode
  off?: boolean
  offText?: React.ReactNode
  hint?: string
  buttons?: React.ReactNode
  className?: string
  children: React.ReactNode
}) {
  return (
    <div data-slot="field-column" title={hint} className={cn("flex h-full flex-col items-center gap-1", className)}>
      <span className="eyebrow">{label}</span>
      <span className={cn("live-number font-mono text-sm font-semibold", off && "text-muted-foreground")}>{off ? offText : value}</span>
      <div className={cn("my-1 flex min-h-0 flex-1 [&_[data-slot=field-slider]]:min-h-0", off && "pointer-events-none opacity-40")}>{children}</div>
      {buttons}
    </div>
  )
}
