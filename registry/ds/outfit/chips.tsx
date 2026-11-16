import { X } from "lucide-react"
import { OUTFIT as C } from "./palette"

// Filtro con chips en una fila que se desliza (ej: marcas). El elegido va en negro.
export function FilterChips<T extends string | null>({
  options,
  value,
  onChange,
  transparent = false,
}: {
  options: { value: T; label: string }[]
  value: T
  onChange: (v: T) => void
  /** fondo transparente para los no elegidos (en Mis prendas) en vez de blanco */
  transparent?: boolean
}) {
  return (
    <div className="flex gap-2 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
      {options.map((o) => {
        const on = o.value === value
        return (
          <button
            key={String(o.value ?? "todo")}
            type="button"
            onClick={() => onChange(o.value)}
            className="flex-shrink-0 rounded-full px-3 py-1.5 text-xs font-medium"
            style={{
              background: on ? C.ink : transparent ? "transparent" : C.white,
              color: on ? C.white : C.text,
              border: "1px solid " + (on ? C.ink : C.border),
            }}
          >
            {o.label}
          </button>
        )
      })}
    </div>
  )
}

// Chip con borde negro y una cruz para borrarlo (marcas, modelos, tipos guardados)
export function ChipTag({
  label,
  selected,
  onSelect,
  onDelete,
}: {
  label: string
  selected?: boolean
  onSelect?: () => void
  onDelete?: () => void
}) {
  return (
    <div
      className="flex flex-shrink-0 items-center gap-1 rounded-full text-xs font-medium"
      style={{
        background: selected ? C.ink : C.white,
        color: selected ? C.white : C.ink,
        border: "1px solid " + C.ink,
        padding: "6px 8px 6px 10px",
      }}
    >
      <button type="button" onClick={onSelect}>{label}</button>
      {onDelete && (
        <button type="button" aria-label={"Borrar " + label} onClick={(e) => { e.stopPropagation(); onDelete() }} style={{ display: "flex", alignItems: "center", opacity: 0.5 }}>
          <X style={{ width: 10, height: 10 }} />
        </button>
      )}
    </div>
  )
}
