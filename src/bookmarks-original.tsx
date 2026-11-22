// Guía (temporal): piezas de bookmarks copiadas TAL CUAL de la app, para compararlas
// con el sistema en "Estilo bookmarks". Colores y medidas a mano a propósito: así está hoy la app.
// Se borra cuando el usuario elija con qué quedarse.
import * as React from "react"
import { ArrowLeft, Bookmark, Check, ChevronDown, ExternalLink, Globe, LayoutGrid, List, LogOut, Menu, Pencil, Plus, Search, Sparkles, Trash2, X, createLucideIcon } from "lucide-react"

// Los logos que usa bookmarks (lucide 0.263): la versión nueva de los íconos ya no los trae
const Twitter = createLucideIcon("twitter", [["path", { d: "M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z", key: "a" }]])
const Youtube = createLucideIcon("youtube", [["path", { d: "M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17", key: "a" }], ["path", { d: "m10 15 5-3-5-3z", key: "b" }]])
const Github = createLucideIcon("github", [["path", { d: "M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4", key: "a" }], ["path", { d: "M9 18c-4.51 2-5-2-7-2", key: "b" }]])

export const BM = { bg: "#FAFAFA", white: "#FFFFFF", border: "#E6E6E6", text: "#1A1A1A", muted: "#9E9E9E", light: "#F1F1F1", br: "#212121", orange: "#FF5E00", red: "#e53935", gray: "#a4a4a4", sub: "#757575" }
export const BM_FONT = "Inter, -apple-system, BlinkMacSystemFont, sans-serif"

export type BmData = { url: string; title: string; type: "twitter" | "youtube" | "github" | "web"; thumbnail?: string | null; description?: string; category: string; subcategories?: string[] }

export const getDomain = (url: string) => { try { return new URL(url).hostname.replace("www.", "") } catch { return url } }

const none: React.CSSProperties = { background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center" }
const lineInput: React.CSSProperties = { width: "100%", border: "none", borderBottom: `1.5px solid ${BM.border}`, padding: "10px 0", fontSize: 16, color: BM.text, background: "transparent", outline: "none", fontFamily: BM_FONT, textAlign: "center" }
const stepLabel: React.CSSProperties = { display: "block", fontSize: 14, fontWeight: 500, color: BM.gray, marginTop: 6, textAlign: "center" }
const primaryBtn: React.CSSProperties = { flex: 1, background: BM.orange, color: BM.white, border: "none", borderRadius: 999, padding: "13px", fontSize: 15, fontWeight: 500, cursor: "pointer", fontFamily: BM_FONT }
const secondaryBtn: React.CSSProperties = { flex: 1, background: BM.light, color: BM.text, border: "none", borderRadius: 999, padding: "13px", fontSize: 15, cursor: "pointer", fontFamily: BM_FONT, fontWeight: 500 }
const offBtn: React.CSSProperties = { ...primaryBtn, background: BM.light, color: BM.gray }
const chip = (on: boolean, filled?: boolean): React.CSSProperties => ({ border: filled ? "none" : `1px solid ${on ? BM.orange : BM.border}`, borderRadius: 999, background: on || filled ? BM.orange : BM.white, color: on || filled ? BM.white : BM.text, cursor: "pointer", fontSize: 14, fontWeight: 500, padding: "7px 14px", fontFamily: BM_FONT })
const inlineEditInput: React.CSSProperties = { flex: 1, border: "none", fontSize: 15, fontWeight: 500, color: BM.text, background: "transparent", outline: "none", fontFamily: BM_FONT, caretColor: BM.orange, padding: 0 }

function TypeIcon({ type, size = 14 }: { type: BmData["type"]; size?: number }) {
  if (type === "twitter") return <Twitter size={size} color="#1D9BF0" />
  if (type === "youtube") return <Youtube size={size} color="#FF0000" />
  if (type === "github") return <Github size={size} color={BM.text} />
  return <Globe size={size} color={BM.muted} />
}

function Thumbnail({ bm }: { bm: BmData }) {
  if (!bm.thumbnail) return (
    <div style={{ width: "100%", aspectRatio: "16/9", background: BM.light, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8 }}>
      <TypeIcon type={bm.type} size={36} />
      <span style={{ fontSize: 11, color: BM.muted }}>{getDomain(bm.url)}</span>
    </div>
  )
  return <img src={bm.thumbnail} alt="" style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover", display: "block" }} />
}

// Barra de arriba: menú, el nombre (Book en negro, marks en naranja) y grilla / lista
export function BmHeader() {
  const [grid, setGrid] = React.useState(true)
  return (
    <div style={{ background: BM.white, borderBottom: `1px solid ${BM.border}`, padding: "0 16px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <button style={none}><Menu size={22} color={BM.br} /></button>
        <span style={{ fontFamily: BM_FONT, fontSize: 24, fontWeight: 400, letterSpacing: "-0.5px" }}>
          <span style={{ color: BM.br }}>Book</span><span style={{ color: BM.orange }}>marks</span>
        </span>
      </div>
      <BmViewToggle grid={grid} setGrid={setGrid} />
    </div>
  )
}

export function BmViewToggle({ grid, setGrid }: { grid: boolean; setGrid: (g: boolean) => void }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
      <button onClick={() => setGrid(true)} style={none}><LayoutGrid size={20} color={grid ? BM.br : "#cccccc"} /></button>
      <button onClick={() => setGrid(false)} style={none}><List size={20} color={!grid ? BM.br : "#cccccc"} /></button>
    </div>
  )
}

// Barra de filtros: "Filtrar por: Categorías", la subcategoría y Limpiar
export function BmFilterBar({ filter, sub }: { filter?: string; sub?: string }) {
  return (
    <div style={{ height: 60, borderBottom: `1px solid ${BM.border}`, background: BM.white, display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
      <button style={{ ...none, gap: 4 }}>
        <span style={{ fontSize: 15, color: BM.gray }}>Filtrar por:</span>
        <span style={{ fontSize: 15, color: BM.br }}>{filter || "Categorías"}</span>
        <ChevronDown size={14} color={BM.br} />
      </button>
      {filter && (
        <button style={{ ...none, gap: 4 }}>
          <span style={{ fontSize: 15, color: BM.br }}>{sub || "Subcategorías"}</span>
          <ChevronDown size={14} color={BM.br} />
        </button>
      )}
      {filter && <button style={{ border: "none", borderRadius: 999, background: "#EEEEEE", color: BM.br, cursor: "pointer", fontSize: 13, fontWeight: 500, padding: "5px 12px" }}>Limpiar</button>}
    </div>
  )
}

// Buscador redondo, con la lupa naranja a la derecha (y la cruz cuando hay algo escrito)
export function BmSearch() {
  const [search, setSearch] = React.useState("")
  return (
    <div style={{ display: "flex", alignItems: "center", background: BM.white, border: `1px solid ${BM.border}`, borderRadius: 999, padding: "0 16px", height: 48 }}>
      <input placeholder="Buscar..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ flex: 1, border: "none", outline: "none", fontSize: 15, color: BM.text, background: "transparent", fontFamily: BM_FONT }} />
      {search
        ? <button onClick={() => setSearch("")} style={none}><X size={18} color={BM.orange} /></button>
        : <Search size={18} color={BM.orange} />}
    </div>
  )
}

// Ficha de cada bookmark: imagen 16:9 con botón para abrir, ícono del tipo, título, editar y borrar,
// descripción y la categoría con ✸ naranja
export function BmCard({ bm }: { bm: BmData }) {
  return (
    <div style={{ background: BM.white, border: `1px solid ${BM.border}`, borderRadius: 14, overflow: "hidden" }}>
      <div style={{ position: "relative" }}>
        <Thumbnail bm={bm} />
        <span style={{ position: "absolute", top: 10, right: 10, display: "flex", alignItems: "center", justifyContent: "center", width: 28, height: 28, borderRadius: 8, background: "rgba(0,0,0,0.35)", backdropFilter: "blur(4px)" }}>
          <ExternalLink size={14} color={BM.white} />
        </span>
      </div>
      <div style={{ padding: "10px 12px 12px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 6, marginBottom: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5, flex: 1, minWidth: 0 }}>
            <TypeIcon type={bm.type} />
            <span style={{ color: BM.text, fontSize: 14, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1 }}>{bm.title || getDomain(bm.url)}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            <button style={none}><Pencil size={16} color={BM.muted} /></button>
            <button style={none}><Trash2 size={16} color={BM.red} /></button>
          </div>
        </div>
        {bm.description ? <p style={{ fontSize: 13, color: BM.muted, lineHeight: 1.4, marginBottom: 8 }}>{bm.description}</p> : null}
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <span style={{ color: BM.orange, fontSize: 14, lineHeight: 1 }}>✸</span>
            <span style={{ fontSize: 14, fontWeight: 500, color: BM.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{bm.category}</span>
          </div>
          {(bm.subcategories || []).length > 0 && <span style={{ fontSize: 13, color: BM.sub, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{bm.subcategories![0]}</span>}
        </div>
      </div>
    </div>
  )
}

// Botón redondo naranja de 60px abajo a la derecha (en la app está fijo; acá, en su lugar)
export function BmFab() {
  return (
    <button style={{ background: BM.orange, color: BM.white, border: "none", borderRadius: "50%", width: 60, height: 60, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
      <Plus size={26} />
    </button>
  )
}

// Menú que sale de la izquierda: tu foto, nombre y mail, Categorías y Cerrar sesión
export function BmMenu() {
  return (
    <div style={{ width: 260, background: BM.white, height: 360, padding: 24, display: "flex", flexDirection: "column", gap: 24, boxShadow: "4px 0 20px rgba(0,0,0,0.1)" }}>
      <button style={{ ...none, alignSelf: "flex-end" }}><X size={20} color={BM.muted} /></button>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ width: 44, height: 44, borderRadius: "50%", background: BM.light, flexShrink: 0 }} />
        <div>
          <p style={{ fontSize: 14, fontWeight: 600, color: BM.text }}>Tu nombre</p>
          <p style={{ fontSize: 12, color: BM.muted }}>tu@mail.com</p>
        </div>
      </div>
      <button style={{ background: "none", border: "none", cursor: "pointer", padding: "12px 0", borderBottom: `1px solid ${BM.border}`, textAlign: "left" }}>
        <span style={{ fontSize: 14, color: BM.text, fontWeight: 500 }}>Categorías</span>
      </button>
      <button style={{ ...none, gap: 10, padding: "10px 0", marginTop: "auto" }}>
        <LogOut size={18} color={BM.muted} />
        <span style={{ fontSize: 14, color: BM.text }}>Cerrar sesión</span>
      </button>
    </div>
  )
}

// La ventana de abajo: blanca, 350px de alto, título de 15px y cruz gris clara
export function BmSheet({ title, children, footer, top }: { title: string; children: React.ReactNode; footer?: React.ReactNode; top?: boolean }) {
  return (
    <div style={{ background: "rgba(0,0,0,0.35)", display: "flex", alignItems: "flex-end", justifyContent: "center", padding: 20 }}>
      <div style={{ background: BM.white, borderRadius: 24, width: "100%", maxWidth: 480, height: 350, display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 20px 16px", flexShrink: 0 }}>
          <span style={{ fontSize: 15, fontWeight: 600, color: BM.text }}>{title}</span>
          <button style={none}><X size={20} color="#cccccc" /></button>
        </div>
        <div style={{ height: 1, background: BM.border, flexShrink: 0 }} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: top ? "flex-start" : "center", padding: "0 20px", overflowY: "auto", minHeight: 0 }}>{children}</div>
        {footer && <div style={{ padding: "12px 20px 20px", flexShrink: 0, display: "flex", gap: 10 }}>{footer}</div>}
      </div>
    </div>
  )
}

// Chips para filtrar: "Ver todos" y cada opción; la elegida en naranja
export function BmFilterChips({ options }: { options: string[] }) {
  const [sel, setSel] = React.useState<string | null>(null)
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, padding: "20px 0" }}>
      <button onClick={() => setSel(null)} style={{ ...chip(!sel), border: "none", background: !sel ? BM.orange : BM.light }}>Ver todos</button>
      {options.map((o) => <button key={o} onClick={() => setSel(o)} style={chip(sel === o)}>{o}</button>)}
    </div>
  )
}

// Campo de una línea: subrayado, centrado y con el nombre abajo
export function BmLineInput({ placeholder, label, defaultValue }: { placeholder: string; label: string; defaultValue?: string }) {
  return (
    <div>
      <input placeholder={placeholder} defaultValue={defaultValue} style={lineInput} />
      <span style={stepLabel}>{label}</span>
    </div>
  )
}

// Paso 1 cuando ya tenías ese sitio guardado
export function BmDuplicate({ bm }: { bm: BmData }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, padding: "0 0 10px", flex: 1 }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <BmLineInput placeholder="https://..." label="Link" defaultValue="https://github.com/shadcn-ui/ui" />
      </div>
      <div style={{ padding: "12px 14px", border: `1px solid ${BM.light}`, borderRadius: 12, textAlign: "center" }}>
        <p style={{ fontSize: 14, color: BM.gray, lineHeight: 1.5 }}>Ya tenés un bookmark similar guardado:</p>
        <a style={{ fontSize: 14, color: BM.orange, textDecoration: "underline", fontWeight: 500, wordBreak: "break-word" }}>{bm.title}</a>
      </div>
    </div>
  )
}

// Título o descripción: contador y "Generar con IA"
export function BmAiField({ placeholder, label, max, value: initial = "" }: { placeholder: string; label: string; max: number; value?: string }) {
  const [value, setValue] = React.useState(initial)
  const [busy, setBusy] = React.useState(false)
  return (
    <div>
      <textarea rows={1} placeholder={placeholder} value={value} maxLength={max} onChange={(e) => setValue(e.target.value)}
        style={{ ...lineInput, resize: "none", textAlign: max > 50 ? "left" : "center", lineHeight: 1.5, overflow: "hidden" }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 4 }}>
        <span style={stepLabel}>{label}</span>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 12, color: value.length >= max * 0.8 ? BM.orange : BM.muted }}>{value.length}/{max}</span>
          <button onClick={() => { setBusy(true); setTimeout(() => setBusy(false), 1200) }} style={{ display: "flex", alignItems: "center", gap: 4, background: "none", border: `1px solid ${BM.border}`, borderRadius: 999, padding: "4px 10px", cursor: "pointer", fontSize: 12, color: BM.muted, fontFamily: BM_FONT }}>
            <Sparkles size={12} color={busy ? BM.muted : BM.orange} />
            {busy ? "Generando..." : "Generar con IA"}
          </button>
        </div>
      </div>
    </div>
  )
}

// Elegir categoría: "+ Nueva categoría" en naranja y las que ya tenés
export function BmPickChips({ options, newLabel }: { options: string[]; newLabel: string }) {
  const [sel, setSel] = React.useState(options[0])
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, padding: "20px 0" }}>
      <button style={chip(false, true)}>+ {newLabel}</button>
      {options.map((o) => <button key={o} onClick={() => setSel(o)} style={chip(sel === o)}>{o}</button>)}
    </div>
  )
}

// Último paso: el resumen en dos columnas
export function BmSummary({ bm }: { bm: BmData }) {
  const label: React.CSSProperties = { fontSize: 12, fontWeight: 500, color: BM.muted, display: "block", marginBottom: 4 }
  const val: React.CSSProperties = { fontSize: 13, color: BM.text, display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }
  return (
    <div style={{ display: "flex", gap: 16, padding: "20px 0" }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12, minWidth: 0 }}>
        <div><span style={label}>Título</span><span style={val}>{bm.title}</span></div>
        <div>
          <span style={label}>Imagen</span>
          <div style={{ width: "100%", maxWidth: 178, aspectRatio: "16/9", borderRadius: 10, overflow: "hidden", background: BM.light }}>
            {bm.thumbnail ? <img src={bm.thumbnail} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} /> : null}
          </div>
        </div>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12, minWidth: 0 }}>
        {[["Categoría", bm.category], ["Subcategoría", bm.subcategories?.[0] || "—"], ["Descripción", bm.description || "—"]].map(([l, v]) => (
          <div key={l}><span style={label}>{l}</span><span style={val}>{v}</span></div>
        ))}
      </div>
    </div>
  )
}

// Botones de abajo: gris y naranja, redondos; apagados en gris clarito
export function BmButtons({ back = "Atrás", next = "Siguiente", off, danger }: { back?: string; next?: string; off?: boolean; danger?: boolean }) {
  return (
    <div style={{ display: "flex", gap: 10, width: "100%" }}>
      <button style={secondaryBtn}>{back}</button>
      <button style={off ? offBtn : danger ? { ...primaryBtn, background: BM.red } : primaryBtn}>{next}</button>
    </div>
  )
}

// Pregunta para confirmar, centrada
export function BmQuestion({ question, detail }: { question: string; detail: string }) {
  return (
    <div style={{ textAlign: "center" }}>
      <p style={{ fontSize: 17, fontWeight: 600, color: BM.text, marginBottom: 8 }}>{question}</p>
      <p style={{ fontSize: 14, color: BM.muted, lineHeight: 1.5 }}>{detail}</p>
    </div>
  )
}

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

// Sin bookmarks: sólo un texto gris
export function BmEmpty({ text }: { text: string }) {
  return <p style={{ textAlign: "center", color: BM.muted, padding: "60px 0", fontSize: 14 }}>{text}</p>
}

// Entrada: el ícono, el nombre y el botón negro
export function BmLogin() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: 300, background: BM.bg, gap: 20, width: "100%" }}>
      <Bookmark size={44} color={BM.br} />
      <p style={{ fontSize: 22, fontWeight: 700, color: BM.text }}>Bookmarks</p>
      <button style={{ background: BM.br, color: BM.white, border: "none", borderRadius: 12, padding: "12px 28px", fontSize: 15, fontWeight: 500, cursor: "pointer" }}>Entrar con Google</button>
    </div>
  )
}
