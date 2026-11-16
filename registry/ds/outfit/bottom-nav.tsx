import type { LucideIcon } from "lucide-react"
import { OUTFIT as C } from "./palette"

// Barra de abajo: íconos de 24px, el activo en negro con un puntito de 4px debajo.
export function BottomNav<T extends string>({ items, value, onChange, fixed = true }: {
  items: { key: T; icon: LucideIcon; label?: string }[]; value: T; onChange: (k: T) => void; fixed?: boolean
}) {
  return (
    <nav style={{ position: fixed ? "fixed" : "relative", bottom: 0, left: 0, right: 0, height: 84, background: "transparent", display: "flex", alignItems: "center", zIndex: 50 }}>
      {items.map(({ key, icon: Icon, label }) => {
        const on = value === key
        return (
          <button key={key} type="button" aria-label={label} onClick={() => onChange(key)} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", background: "transparent", border: "none", gap: 6 }}>
            <Icon style={{ width: 24, height: 24, color: on ? C.ink : C.muted }} />
            <span style={{ width: 4, height: 4, borderRadius: "50%", background: on ? C.ink : "transparent" }} />
          </button>
        )
      })}
    </nav>
  )
}
