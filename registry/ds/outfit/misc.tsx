import * as React from "react"
import { Plus } from "lucide-react"
import { OUTFIT as C } from "./palette"

// Caja blanca de sección (bordes 12px, sombra suave)
export function Panel({ className, style, ...props }: React.ComponentProps<"div">) {
  return <div className={"rounded-[12px] shadow-sm " + (className ?? "")} style={{ background: C.white, ...style }} {...props} />
}

// Etiqueta gris chiquita arriba de un campo
export function FieldLabel({ children, right }: { children: React.ReactNode; right?: React.ReactNode }) {
  return (
    <div className="mb-2 flex items-center">
      <p className="text-xs" style={{ color: C.muted }}>{children}</p>
      {right && <span className="ml-auto text-xs">{right}</span>}
    </div>
  )
}

// Campo de texto + botón cuadrado "+" (negro si hay texto)
export function InputAdd({ value, onChange, onAdd, placeholder }: { value: string; onChange: (v: string) => void; onAdd: () => void; placeholder?: string }) {
  const has = value.trim() !== ""
  return (
    <div className="flex gap-2">
      <input
        type="text" placeholder={placeholder} value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => { if (e.key === "Enter") onAdd() }}
        className="flex-1 rounded-[8px] px-3 py-2 text-sm outline-none"
        style={{ background: C.bg, border: "1px solid " + C.border, color: C.text }}
      />
      <button type="button" onClick={onAdd} disabled={!has} className="rounded-[8px] px-3 py-2" style={{ background: has ? C.ink : C.light, color: has ? C.white : C.muted }}>
        <Plus className="h-4 w-4" />
      </button>
    </div>
  )
}

// Estado vacío: círculo gris con ícono, título y texto
export function EmptyState({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full" style={{ background: C.soft }}>{icon}</div>
      <div>
        <p className="mb-1 text-base font-medium" style={{ color: C.text }}>{title}</p>
        <p className="text-sm" style={{ color: C.muted }}>{text}</p>
      </div>
    </div>
  )
}

// Aviso flotante en forma de píldora abajo al centro
export function Toast({ message, fixed = true }: { message: string; fixed?: boolean }) {
  return (
    <div
      className={(fixed ? "fixed bottom-6 left-1/2 " : "inline-block ") + "rounded-full px-5 py-3 text-sm font-medium"}
      style={{ background: C.soft, color: C.ink, transform: fixed ? "translateX(-50%) translateY(" + (message ? "0px" : "24px") + ")" : undefined, opacity: message ? 1 : 0, transition: "all 0.3s ease", pointerEvents: "none", zIndex: 60 }}
    >
      {message}
    </div>
  )
}
