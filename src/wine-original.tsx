// Guía (temporal): piezas de wine-tracker copiadas TAL CUAL de la app, para compararlas
// con el sistema en "Estilo wine". Colores y medidas a mano a propósito: así está hoy la app.
// Se borra cuando el usuario elija con qué quedarse.
import * as React from "react"
import { Bookmark, Check, ChevronDown, ChevronLeft, Info, LogOut, Pencil, Plus, Search, Star, Trash2, Wine, X } from "lucide-react"

export const WINE = { brand: "#722F37", bg: "#FAFAFA", text: "#4A4A4A", gray: "#A4A4A4", hint: "#AAAAAA", light: "#BBBBBB", border: "#DDDDDD", line: "#F1F1F1" }
export const WINE_FONT = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"

export const PERFIL = [
  { key: "fruta", emoji: "🍒", name: "Fruta", min: "Poco frutado", max: "Muy frutado", desc: "Mide qué tan presentes son los aromas y sabores frutales." },
  { key: "acidez", emoji: "🍋", name: "Acidez", min: "Baja", max: "Alta", desc: "Mide la sensación de frescura del vino." },
  { key: "taninos", emoji: "🌿", name: "Taninos", min: "Suaves", max: "Intensos", desc: "Mide la sensación de sequedad o aspereza en la boca." },
]

export type WineData = { nombre: string; bodega?: string; cosecha?: string; uva?: string; provincia?: string; rating?: number }

// Encabezado: tres íconos para cambiar de pantalla y el botón para salir
export function WineHeader() {
  const [section, setSection] = React.useState("agregar")
  const tab = (id: string, Icon: typeof Wine) => (
    <button onClick={() => setSection(id)} className="rounded-full p-2" style={{ background: section === id ? "#F1F1F1" : "transparent" }}>
      <Icon className="h-6 w-6" style={{ color: WINE.brand }} />
    </button>
  )
  return (
    <div className="flex items-center justify-between" style={{ height: 75 }}>
      <div className="flex items-center gap-1">{tab("agregar", Wine)}{tab("lista", Bookmark)}{tab("probados", Check)}</div>
      <button className="rounded-full p-2" style={{ background: WINE.brand }}><LogOut className="h-5 w-5" style={{ color: "#FFFFFF" }} /></button>
    </div>
  )
}

// Caja blanca con el título adentro, en bordó
export function WineSectionCard({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <section className="rounded-xl p-5 shadow-sm" style={{ background: "#fff" }}>
      <h2 className="mb-4 text-base font-medium" style={{ color: WINE.brand }}>{title}</h2>
      {children}
    </section>
  )
}

// Campo de texto: sin título arriba, sólo el texto gris adentro
export function WineInput({ placeholder, defaultValue }: { placeholder: string; defaultValue?: string }) {
  return (
    <input defaultValue={defaultValue} placeholder={placeholder} className="w-full rounded-lg px-4 text-sm outline-none placeholder:text-[#AAAAAA]"
      style={{ background: WINE.bg, border: `1px solid ${WINE.border}`, color: WINE.text, height: 46 }} />
  )
}

// Lista para elegir con buscador adentro
export function WineSelect({ placeholder, options }: { placeholder: string; options: string[] }) {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")
  const [value, setValue] = React.useState("")
  const filtered = search ? options.filter((o) => o.toLowerCase().includes(search.toLowerCase())) : options
  return (
    <div style={{ position: "relative", width: "100%" }}>
      <div className="rounded-lg" style={{ background: WINE.bg, border: `1px solid ${WINE.border}`, height: 46, position: "relative" }}>
        <input value={open ? search : value} onChange={(e) => setSearch(e.target.value)} onFocus={() => { setOpen(true); setSearch("") }} onBlur={() => setTimeout(() => { setOpen(false); setSearch("") }, 150)}
          placeholder={open ? value || placeholder : placeholder} className="bg-transparent text-sm outline-none placeholder:text-[#AAAAAA]"
          style={{ color: open || value ? WINE.text : WINE.hint, position: "absolute", left: 16, right: 36, top: 0, bottom: 0, width: "calc(100% - 52px)" }} />
        <ChevronDown style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", width: 16, height: 16, color: WINE.gray, pointerEvents: "none" }} />
      </div>
      {open && (
        <div style={{ position: "absolute", top: "100%", left: 0, right: 0, marginTop: 4, background: "#FFFFFF", border: `1px solid ${WINE.border}`, borderRadius: 8, zIndex: 200, maxHeight: 200, overflowY: "auto", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}>
          {filtered.map((o) => (
            <button type="button" key={o} onMouseDown={() => { setValue(o); setOpen(false); setSearch("") }} className="w-full px-4 py-2.5 text-left text-sm" style={{ color: o === value ? WINE.brand : WINE.text, fontWeight: o === value ? 500 : "normal" }}>{o}</button>
          ))}
          {filtered.length === 0 && <p className="px-4 py-2.5 text-sm" style={{ color: WINE.hint }}>Sin resultados</p>}
        </div>
      )}
    </div>
  )
}

// Botones: con borde bordó, lleno bordó, y apagados (blanco con borde gris)
export function WineButton({ kind = "primary", disabled, children }: { kind?: "primary" | "outline" | "gray"; disabled?: boolean; children: React.ReactNode }) {
  const style: React.CSSProperties = disabled
    ? { background: "#FFFFFF", border: `1px solid ${WINE.border}`, color: WINE.hint }
    : kind === "primary" ? { background: WINE.brand, border: `1px solid ${WINE.brand}`, color: "#FFFFFF" }
    : kind === "outline" ? { background: "#FFFFFF", border: `1px solid ${WINE.brand}`, color: WINE.brand }
    : { background: "#F1F1F1", color: WINE.gray }
  return <button disabled={disabled} className="flex flex-1 items-center justify-center gap-1 rounded-lg text-sm font-medium" style={{ ...style, height: 46 }}>{children}</button>
}

// Buscador con lupa y cruz para borrar
export function WineSearch() {
  const [q, setQ] = React.useState("Malbec")
  return (
    <div className="relative">
      <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" style={{ color: WINE.hint }} />
      <input type="text" placeholder="Buscar por nombre, bodega, uva o cosecha..." value={q} onChange={(e) => setQ(e.target.value)} className="w-full rounded-lg py-3 pl-10 text-sm outline-none placeholder:text-[#AAAAAA]" style={{ background: WINE.bg, border: `1px solid ${WINE.border}`, color: WINE.text }} />
      {q && <button onClick={() => setQ("")} className="absolute top-1/2 right-3 -translate-y-1/2"><X className="h-4 w-4" style={{ color: WINE.hint }} /></button>}
    </div>
  )
}

// Botón Filtrar (con la cantidad de filtros) y Limpiar
export function WineFilterButtons({ count }: { count: number }) {
  return (
    <div className="flex gap-2">
      <button className="flex flex-1 items-center justify-center gap-2 rounded-lg text-sm font-medium" style={{ height: 46, background: WINE.bg, border: `1px solid ${WINE.border}`, color: WINE.text }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 3h12M3 7h8M5 11h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
        Filtrar{count > 0 ? ` (${count})` : ""}
      </button>
      {count > 0 && <button className="rounded-lg text-sm font-medium" style={{ height: 46, padding: "0 14px", background: WINE.bg, border: `1px solid ${WINE.border}`, color: WINE.brand }}>Limpiar</button>}
    </div>
  )
}

// Estrellas chicas (sólo mirar)
export function WineStars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => <Star key={s} style={{ width: size, height: size, color: WINE.brand }} fill={s <= rating ? WINE.brand : "none"} />)}
    </div>
  )
}

// Estrellas grandes para puntuar
export function WineStarInput() {
  const [hover, setHover] = React.useState(0)
  const [sel, setSel] = React.useState(4)
  return (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((s) => (
        <button key={s} onMouseEnter={() => setHover(s)} onMouseLeave={() => setHover(0)} onClick={() => setSel(s)} className="p-1">
          <Star strokeWidth={1.5} fill={s <= (hover || sel) ? WINE.brand : "none"} style={{ width: 28, height: 28, color: s <= (hover || sel) ? WINE.brand : "#CCCCCC" }} />
        </button>
      ))}
    </div>
  )
}

// Ficha de un vino en la grilla de 2 columnas
export function WineCard({ wine }: { wine: WineData }) {
  return (
    <div className="cursor-pointer overflow-hidden rounded-xl" style={{ background: WINE.bg }}>
      <div style={{ padding: 12 }}>
        <div className="flex w-full items-center justify-center" style={{ aspectRatio: "3/4", background: "#FFFFFF", borderRadius: 8 }}>
          <Plus className="h-6 w-6" style={{ color: WINE.border }} />
        </div>
        <div style={{ marginTop: 8 }}>
          <p className="truncate text-sm leading-tight font-medium" style={{ color: WINE.text }}>{wine.nombre}</p>
          {(wine.bodega || wine.cosecha) && <p className="truncate text-xs leading-tight" style={{ color: WINE.gray, marginTop: 4 }}>{[wine.bodega, wine.cosecha].filter(Boolean).join(" · ")}</p>}
          {!!wine.rating && <div style={{ marginTop: 4 }}><WineStars rating={wine.rating} /></div>}
          {wine.provincia && <p className="truncate text-xs leading-tight" style={{ color: WINE.light, marginTop: 4 }}>{wine.provincia}</p>}
        </div>
      </div>
    </div>
  )
}

// Marco de las ventanas: título bordó, cruz gris, línea abajo
export function WineSheet({ title, children, footer }: { title: string; children: React.ReactNode; footer?: React.ReactNode }) {
  return (
    <div className="flex w-full flex-col overflow-hidden rounded-xl" style={{ background: "#FFFFFF" }}>
      <div style={{ padding: 16, display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `1px solid ${WINE.line}` }}>
        <span className="text-base" style={{ fontWeight: 500, color: WINE.brand }}>{title}</span>
        <button><X className="h-5 w-5" style={{ color: "#CCCCCC" }} /></button>
      </div>
      {children}
      {footer && <div style={{ borderTop: `1px solid ${WINE.line}`, padding: 20, display: "flex", gap: 8 }}>{footer}</div>}
    </div>
  )
}

// Pestañas de la ficha: ícono arriba, texto abajo, raya bordó en la elegida
export function WineDetailTabs() {
  const [tab, setTab] = React.useState("info")
  return (
    <div className="flex" style={{ borderBottom: `1px solid ${WINE.line}` }}>
      {[{ id: "info", Icon: Wine, label: "Info" }, { id: "editar", Icon: Pencil, label: "Editar" }, { id: "borrar", Icon: Trash2, label: "Borrar" }].map(({ id, Icon, label }) => (
        <button key={id} onClick={() => setTab(id)} className="flex flex-1 flex-col items-center gap-1 py-3" style={{ color: tab === id ? WINE.brand : "#CCCCCC", borderBottom: `2px solid ${tab === id ? WINE.brand : "transparent"}`, marginBottom: -1 }}>
          <Icon className="h-4 w-4" />
          <span className="text-xs font-medium">{label}</span>
        </button>
      ))}
    </div>
  )
}

// Datos del vino adentro de la ficha
export function WineInfo({ wine, perfil }: { wine: WineData; perfil: Record<string, number> }) {
  return (
    <div style={{ padding: 20 }}>
      <div className="flex items-start justify-between gap-2">
        <h2 className="text-lg leading-tight font-medium" style={{ color: WINE.text }}>{wine.nombre}</h2>
        {!!wine.rating && <WineStars rating={wine.rating} size={16} />}
      </div>
      <p className="text-sm leading-tight" style={{ color: WINE.gray, marginTop: 8 }}>{[wine.bodega, wine.cosecha, wine.uva].filter(Boolean).join(" · ")}</p>
      <p className="text-sm leading-tight" style={{ color: WINE.light, marginTop: 8 }}>{wine.provincia}</p>
      <WinePerfilChips perfil={perfil} />
      <p className="text-sm italic" style={{ color: WINE.gray, marginTop: 12 }}>"Increíble, mucha fruta roja y especias."</p>
    </div>
  )
}

// Perfil en fichitas: "🍒 Fruta | 4/5"
export function WinePerfilChips({ perfil }: { perfil: Record<string, number> }) {
  return (
    <div className="no-scrollbar" style={{ display: "flex", gap: 8, overflowX: "auto", marginTop: 12, scrollbarWidth: "none" }}>
      {PERFIL.map((s) => (
        <div key={s.key} style={{ flexShrink: 0, background: WINE.bg, border: "1px solid #EEEEEE", borderRadius: 20, display: "flex", alignItems: "center", overflow: "hidden" }}>
          <p style={{ fontSize: 13, color: WINE.hint, whiteSpace: "nowrap", padding: "6px 10px 6px 12px" }}>{s.emoji} {s.name}</p>
          <div style={{ width: 1, alignSelf: "stretch", background: "#EEEEEE" }} />
          <p style={{ fontSize: 13, fontWeight: 500, color: WINE.brand, whiteSpace: "nowrap", padding: "6px 12px 6px 10px" }}>{perfil[s.key]}<span style={{ color: WINE.light, fontWeight: 400 }}>/5</span></p>
        </div>
      ))}
    </div>
  )
}

// Filtro: secciones que se abren, con píldoras para elegir varias
export function WineFilterSections({ sections }: { sections: { key: string; label: string; options: string[] }[] }) {
  const [open, setOpen] = React.useState<string | null>(sections[0]?.key ?? null)
  const [sel, setSel] = React.useState<Record<string, string[]>>({ uva: ["Malbec"] })
  const toggle = (k: string, o: string) => setSel((p) => ({ ...p, [k]: (p[k] || []).includes(o) ? p[k].filter((x) => x !== o) : [...(p[k] || []), o] }))
  return (
    <>
      {sections.map(({ key, label, options }) => {
        const chosen = sel[key] || []
        return (
          <div key={key} style={{ borderTop: `1px solid ${WINE.line}` }}>
            <button onClick={() => setOpen((s) => (s === key ? null : key))} style={{ width: "100%", display: "flex", alignItems: "flex-start", justifyContent: "space-between", padding: "16px 20px" }}>
              <div style={{ flex: 1, display: "flex", alignItems: "baseline", gap: 4, textAlign: "left" }}>
                <span className="text-sm font-medium" style={{ color: "#1A1A1A" }}>{label}</span>
                {chosen.length > 0 && <><span className="text-sm" style={{ color: WINE.border }}>—</span><span className="text-sm" style={{ color: WINE.hint }}>{chosen.join(", ")}</span></>}
              </div>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d={open === key ? "M4 10l4-4 4 4" : "M4 6l4 4 4-4"} stroke="#4A4A4A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            {open === key && (
              <div style={{ padding: "0 20px 16px 20px", display: "flex", flexWrap: "wrap", gap: 8 }}>
                {options.map((o) => {
                  const on = chosen.includes(o)
                  return <button key={o} onClick={() => toggle(key, o)} style={{ padding: "6px 14px", borderRadius: 999, border: `1px solid ${on ? WINE.brand : WINE.border}`, background: on ? WINE.brand : WINE.bg, color: on ? "#fff" : WINE.text, fontSize: 13 }}>{o}</button>
                })}
              </div>
            )}
          </div>
        )
      })}
    </>
  )
}

// Una barra del perfil del vino: nombre con emoji, ⓘ, barrita de 1 a 5 con marcas y los extremos
export function WinePerfilSlider({ s }: { s: (typeof PERFIL)[number] }) {
  const [v, setV] = React.useState(4)
  const [tip, setTip] = React.useState(false)
  const pct = (v - 1) * 25
  return (
    <div style={{ background: WINE.bg, borderRadius: 10, padding: "12px 14px", display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <p style={{ fontSize: 13, fontWeight: 500, color: WINE.text }}>{s.emoji} {s.name}</p>
        <button onClick={() => setTip((t) => !t)} style={{ display: "flex", padding: 2 }}><Info style={{ width: 14, height: 14, color: WINE.brand }} /></button>
      </div>
      {tip && <div style={{ background: "#FFFFFF", border: "1px solid #EEEEEE", borderRadius: 8, padding: "10px 12px" }}><p style={{ fontSize: 12, color: "#888888", lineHeight: 1.5 }}>{s.desc}</p></div>}
      <input type="range" min="1" max="5" step="1" value={v} onChange={(e) => setV(Number(e.target.value))} className="wine-slider" style={{ background: `linear-gradient(to right, ${WINE.brand} ${pct}%, #E8E8E8 ${pct}%)` }} />
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "0 5px", marginBottom: 3 }}>{[0, 1, 2, 3, 4].map((t) => <div key={t} style={{ width: 1, height: 4, background: WINE.border }} />)}</div>
        <div style={{ display: "flex", justifyContent: "space-between" }}><p style={{ fontSize: 13, color: WINE.hint }}>{s.min}</p><p style={{ fontSize: 13, color: WINE.hint }}>{s.max}</p></div>
      </div>
    </div>
  )
}

// Encabezado de los pasos para agregar un vino: volver, título y "2 / 3"
export function WineStepHeader({ title, step, back }: { title: string; step: string; back?: boolean }) {
  return (
    <div style={{ borderBottom: `1px solid ${WINE.line}`, padding: 16, display: "flex", alignItems: "center", gap: 8 }}>
      {back && <button><ChevronLeft className="h-5 w-5" style={{ color: WINE.brand }} /></button>}
      <p className="text-sm font-medium" style={{ color: WINE.text, flex: 1 }}>{title}</p>
      <p className="text-sm font-medium" style={{ color: WINE.hint }}>{step}</p>
      <button><X className="h-5 w-5" style={{ color: "#CCCCCC" }} /></button>
    </div>
  )
}

// Comentario con contador
export function WineComment() {
  const [t, setT] = React.useState("")
  return (
    <div>
      <textarea placeholder="Escribí un comentario" value={t} onChange={(e) => setT(e.target.value.slice(0, 200))} className="w-full resize-none rounded-lg px-4 py-3 text-sm outline-none placeholder:text-[#AAAAAA]" style={{ background: WINE.bg, border: `1px solid ${WINE.border}`, color: WINE.text, height: 100 }} />
      <p className="w-full text-right text-xs" style={{ color: WINE.hint }}>{t.length}/200</p>
    </div>
  )
}

// Ventana centrada (ej: vino duplicado)
export function WineDialog({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex w-full max-w-sm flex-col rounded-xl" style={{ background: "#FFFFFF" }}>
      <div style={{ borderBottom: `1px solid ${WINE.line}`, padding: 16, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <p className="text-sm font-medium" style={{ color: WINE.text }}>{title}</p>
        <button><X className="h-5 w-5" style={{ color: "#CCCCCC" }} /></button>
      </div>
      <div className="flex flex-col" style={{ padding: 20, gap: 16 }}>{children}</div>
    </div>
  )
}

// Resumen del vino en una cajita gris (duplicado, borrar)
export function WineSummary({ wine, center }: { wine: WineData; center?: boolean }) {
  return (
    <div className={center ? "text-center" : ""} style={{ background: WINE.bg, border: "1px solid #EEEEEE", borderRadius: 10, padding: 12 }}>
      <p className="text-sm leading-tight font-medium" style={{ color: WINE.text }}>{wine.nombre}</p>
      <p className="text-xs" style={{ color: WINE.gray, marginTop: 4 }}>{[wine.bodega, wine.cosecha].filter(Boolean).join(" · ")}</p>
      <p className="text-xs" style={{ color: WINE.light, marginTop: 2 }}>{[wine.uva, wine.provincia].filter(Boolean).join(" · ")}</p>
    </div>
  )
}

// Pestaña Borrar de la ficha: tacho en un círculo gris y la pregunta en bordó
export function WineDelete({ wine }: { wine: WineData }) {
  return (
    <div className="flex flex-col items-center justify-center text-center" style={{ padding: 20 }}>
      <div className="mb-4 flex items-center justify-center" style={{ width: 56, height: 56, borderRadius: "50%", background: WINE.bg }}><Trash2 className="h-6 w-6" style={{ color: WINE.gray }} /></div>
      <p className="text-sm" style={{ color: WINE.brand, marginBottom: 16 }}>¿Querés eliminar este vino?</p>
      <WineSummary wine={wine} center />
    </div>
  )
}

// Aviso que aparece abajo: píldora bordó
export function WineToast() {
  return <div className="rounded-full px-5 py-3 text-sm font-medium shadow-lg" style={{ background: WINE.brand, color: "#FFFFFF" }}>Vino agregado con éxito 🍷</div>
}

// Pantalla de entrada
export function WineLogin() {
  return (
    <div className="w-full max-w-sm rounded-xl p-8 text-center shadow-sm" style={{ background: "#FFFFFF" }}>
      <Wine className="mx-auto mb-4 h-12 w-12" style={{ color: WINE.brand }} />
      <h1 className="mb-1 text-xl font-medium" style={{ color: WINE.text }}>Mi Diario de Vinos</h1>
      <p className="mb-8 text-sm" style={{ color: WINE.gray }}>Guardá y organizá tus vinos favoritos</p>
      <button className="flex w-full items-center justify-center gap-3 rounded-lg py-3 text-sm font-medium" style={{ background: WINE.brand, color: "#FFFFFF" }}>Continuar con Google</button>
    </div>
  )
}

// Sin vinos todavía: sólo un texto gris
export function WineEmpty() {
  return <p className="py-8 text-center text-sm" style={{ color: WINE.gray }}>Tu lista está vacía</p>
}
