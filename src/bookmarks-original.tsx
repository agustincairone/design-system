// Guía (temporal): la pantalla de categorías de bookmarks copiada TAL CUAL de la app, para charlarla
// en "Estilo bookmarks" (está pendiente). Colores y medidas a mano a propósito: así está hoy la app.
// Se borra cuando el usuario decida.
import * as React from "react"
import { ArrowLeft, Check, ChevronDown, Pencil, Trash2 } from "lucide-react"

export const BM = { bg: "#FAFAFA", white: "#FFFFFF", border: "#E6E6E6", text: "#1A1A1A", muted: "#9E9E9E", br: "#212121", orange: "#FF5E00", red: "#e53935", sub: "#757575" }
export const BM_FONT = "Inter, -apple-system, BlinkMacSystemFont, sans-serif"

const none: React.CSSProperties = { background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center" }
const inlineEditInput: React.CSSProperties = { flex: 1, border: "none", fontSize: 15, fontWeight: 500, color: BM.text, background: "transparent", outline: "none", fontFamily: BM_FONT, caretColor: BM.orange, padding: 0 }

// Pantalla de categorías: barra con flecha para volver y la lista que se abre, con editar y borrar en cada fila
export function BmCategories({ cats }: { cats: { name: string; count: number; subs: { name: string; count: number }[] }[] }) {
  const [open, setOpen] = React.useState<string | null>(cats[0]?.name ?? null)
  const [editing, setEditing] = React.useState<string | null>(null)
  const [value, setValue] = React.useState("")
  const sub = (n: number) => (n === 0 ? "sin bookmarks" : `${n} bookmark${n !== 1 ? "s" : ""}`)
  return (
    <div style={{ background: BM.bg }}>
      <div style={{ background: BM.white, borderBottom: `1px solid ${BM.border}`, padding: "0 16px", height: 60, display: "flex", alignItems: "center", gap: 12 }}>
        <button style={none}><ArrowLeft size={22} color={BM.br} /></button>
        <span style={{ fontSize: 17, fontWeight: 600, color: BM.text }}>Categorías</span>
      </div>
      <div style={{ padding: 14 }}>
        {cats.map((c, i) => {
          const isOpen = open === c.name
          const isEditing = editing === c.name
          const top = i === 0 ? 14 : 0
          return (
            <div key={c.name} style={{ background: BM.white, border: `1px solid ${BM.border}`, borderTop: i === 0 ? `1px solid ${BM.border}` : "none", borderRadius: `${top}px ${top}px 0 0` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "0 16px", minHeight: 54 }}>
                {isEditing ? (
                  <input autoFocus value={value} onChange={(e) => setValue(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" || e.key === "Escape") setEditing(null) }} style={inlineEditInput} />
                ) : (
                  <button onClick={() => setOpen(isOpen ? null : c.name)} style={{ ...none, flex: 1, gap: 6, textAlign: "left", minWidth: 0 }}>
                    <span style={{ color: BM.orange, fontSize: 14, flexShrink: 0 }}>✸</span>
                    <span style={{ fontSize: 15, fontWeight: 500, color: BM.text }}>{c.name}</span>
                    <span style={{ fontSize: 12, color: BM.muted, marginLeft: 2, flexShrink: 0 }}>{sub(c.count)}</span>
                    <ChevronDown size={14} color={BM.muted} style={{ marginLeft: "auto", transform: isOpen ? "rotate(180deg)" : "none", flexShrink: 0 }} />
                  </button>
                )}
                <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
                  {isEditing
                    ? <button onClick={() => setEditing(null)} style={none}><Check size={16} color={BM.orange} /></button>
                    : <button onClick={() => { setEditing(c.name); setValue(c.name) }} style={none}><Pencil size={16} color={BM.muted} /></button>}
                  <button style={none}><Trash2 size={16} color={BM.red} /></button>
                </div>
              </div>
              {isOpen && (
                <div style={{ borderTop: `1px solid ${BM.border}` }}>
                  {c.subs.map((s) => (
                    <div key={s.name} style={{ display: "flex", alignItems: "center", gap: 12, padding: "0 16px 0 32px", minHeight: 54, borderBottom: `1px solid ${BM.border}` }}>
                      <span style={{ flex: 1, fontSize: 14, color: BM.sub }}>{s.name} <span style={{ fontSize: 12, color: BM.muted }}>· {sub(s.count)}</span></span>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
                        <button style={none}><Pencil size={16} color={BM.muted} /></button>
                        <button style={none}><Trash2 size={16} color={BM.red} /></button>
                      </div>
                    </div>
                  ))}
                  <button style={{ width: "100%", display: "flex", alignItems: "center", minHeight: 54, padding: "0 16px 0 32px", background: BM.bg, border: "none", cursor: "pointer" }}>
                    <span style={{ fontSize: 14, color: BM.orange, fontWeight: 500 }}>+ Agregar nueva subcategoría</span>
                  </button>
                </div>
              )}
            </div>
          )
        })}
        <button style={{ display: "flex", alignItems: "center", minHeight: 54, padding: "0 16px", background: BM.white, border: `1px solid ${BM.border}`, borderTop: "none", borderRadius: "0 0 14px 14px", cursor: "pointer", width: "100%" }}>
          <span style={{ fontSize: 15, color: BM.orange, fontWeight: 500 }}>+ Agregar nueva categoría</span>
        </button>
      </div>
    </div>
  )
}
