import { OUTFIT as C } from "./palette"

// Tab estilo outfit: una fila que ocupa todo el ancho, con divisores finos.
// La elegida se pinta de negro con texto blanco. (Tab estilo 1 = TileGroup.)
export function TabBar<T extends string>({
  options,
  value,
  onChange,
  className,
}: {
  options: { value: T; label: string }[]
  value: T
  onChange: (v: T) => void
  className?: string
}) {
  return (
    <div role="tablist" className={"flex flex-shrink-0 border-b " + (className ?? "")} style={{ borderColor: C.border }}>
      {options.map((o, i) => {
        const on = o.value === value
        return (
          <button
            key={o.value}
            type="button"
            role="tab"
            aria-selected={on}
            onClick={() => onChange(o.value)}
            className="flex flex-1 items-center justify-center px-2 py-4"
            style={{
              fontSize: 14,
              fontWeight: 400,
              background: on ? C.ink : C.white,
              color: on ? C.white : C.muted,
              borderRight: i < options.length - 1 ? "1px solid " + C.border : "none",
            }}
          >
            {o.label}
          </button>
        )
      })}
    </div>
  )
}
