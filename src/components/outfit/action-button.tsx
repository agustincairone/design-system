import * as React from "react"
import { ChevronLeft, Plus } from "lucide-react"
import { OUTFIT as C } from "./palette"

const TONES = {
  primary: { background: C.ink, color: C.white },
  secondary: { background: C.light, color: C.ink },
  soft: { background: C.soft, color: C.ink },
  "danger-soft": { background: C.soft, color: C.danger },
  danger: { background: C.danger, color: C.white },
  "danger-text": { background: "transparent", color: C.danger },
  disabled: { background: C.light, color: C.muted },
} as const

// Botón grande estilo outfit: ancho completo (o flex-1 en filas), alto 48, bordes 12px.
export function ActionButton({
  tone = "primary",
  className,
  style,
  disabled,
  ...props
}: React.ComponentProps<"button"> & { tone?: keyof typeof TONES }) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={"flex items-center justify-center gap-2 rounded-[12px] py-3 text-sm font-medium " + (className ?? "")}
      style={{ border: "none", ...(disabled ? TONES.disabled : TONES[tone]), ...style }}
      {...props}
    />
  )
}

// Botón punteado "Agregar nueva prenda"
export function DashedAddButton({ children = "Agregar nueva prenda", className, ...props }: React.ComponentProps<"button">) {
  return (
    <button
      type="button"
      className={"flex w-full items-center justify-center gap-2 rounded-[12px] py-3 text-sm " + (className ?? "")}
      style={{ border: "1.5px dashed " + C.border, color: C.muted, background: "transparent" }}
      {...props}
    >
      <Plus className="h-4 w-4" /> {children}
    </button>
  )
}

// Botón redondo gris para volver un paso
export function RoundBackButton({ disabled, ...props }: React.ComponentProps<"button">) {
  return (
    <button type="button" disabled={disabled} aria-label="Anterior" style={{ background: C.light, padding: 6, borderRadius: "50%", opacity: disabled ? 0.3 : 1 }} {...props}>
      <ChevronLeft className="h-4 w-4" style={{ color: C.ink }} />
    </button>
  )
}
