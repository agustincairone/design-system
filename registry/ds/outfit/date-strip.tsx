import { OUTFIT as C } from "./palette"

export type DayOption = { dateStr: string; dayName: string; label: string; isToday?: boolean; marked?: boolean }

// Fila de días que se desliza. Elegido = negro; hoy = borde negro; con outfit = puntito.
export function DateStrip({ days, value, onChange }: { days: DayOption[]; value: string; onChange: (d: string) => void }) {
  return (
    <div className="flex gap-2 overflow-x-auto" style={{ scrollbarWidth: "none", padding: "4px 0" }}>
      {days.map((d) => {
        const sel = value === d.dateStr
        return (
          <button
            key={d.dateStr}
            type="button"
            data-today={d.isToday}
            onClick={() => onChange(d.dateStr)}
            className="flex flex-shrink-0 flex-col items-center px-3 py-2 transition-all"
            style={{ background: sel ? C.ink : d.isToday ? C.soft : C.white, border: "1px solid " + (sel ? C.ink : d.isToday ? C.ink : C.border), minWidth: 54, position: "relative", borderRadius: 8 }}
          >
            {d.marked && <span style={{ position: "absolute", top: 4, right: 4, width: 6, height: 6, borderRadius: "50%", background: sel ? C.white : C.ink }} />}
            <span className="text-xs font-medium" style={{ color: sel ? C.white : C.ink }}>{d.dayName.slice(0, 3)}</span>
            <span className="mt-0.5 text-xs" style={{ color: sel ? "rgba(255,255,255,0.7)" : C.muted }}>{d.label}</span>
          </button>
        )
      })}
    </div>
  )
}
