// Guía (temporal): "Estilo bookmarks". Falta decidir la pantalla de categorías: acá está cómo está hoy
// en bookmarks (estilo 2, la forma original con los colores del sistema) al lado de cómo quedaría con
// las filas que se abren del análisis de gastos de pay (estilo 1). Cuando se decida, este archivo se borra.
import * as React from "react"
import { Check, ChevronDown, Pencil, Plus, Trash2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { useTheme } from "@/components/theme-provider"
import { BRANDS } from "@/brands"
import { SectionHeader } from "@/components/ui/app-hero"
import { Button } from "@/components/ui/button"

type Cat = { name: string; count: number; subs: { name: string; count: number }[] }
const CATS: Cat[] = [
  { name: "Diseño", count: 3, subs: [{ name: "Componentes", count: 1 }, { name: "Herramientas", count: 1 }, { name: "Videos", count: 1 }] },
  { name: "Lecturas", count: 2, subs: [{ name: "Referencia", count: 1 }, { name: "Tipografía", count: 1 }] },
  { name: "Recetas", count: 0, subs: [] },
]
const bookmarksCount = (n: number) => `${n} bookmark${n !== 1 ? "s" : ""}`
const subCount = (n: number) => (n === 0 ? "sin bookmarks" : bookmarksCount(n))

// Editar (o confirmar, mientras se escribe) y borrar: los mismos botones que en las fichas
function Actions({ editing, onEdit }: { editing?: boolean; onEdit?: () => void }) {
  return (
    <div className="-mr-1 flex shrink-0 items-center">
      {editing
        ? <Button variant="ghost" size="icon-sm" aria-label="Guardar" className="text-brand-text" onClick={onEdit}><Check className="size-3.5" /></Button>
        : <Button variant="ghost" size="icon-sm" aria-label="Editar" className="text-muted-foreground" onClick={onEdit}><Pencil className="size-3.5" /></Button>}
      <Button variant="ghost" size="icon-sm" aria-label="Borrar" className="text-destructive hover:text-destructive"><Trash2 className="size-3.5" /></Button>
    </div>
  )
}

// Estilo 1: la fila que se abre del análisis de pay (nombre con la cantidad abajo, el detalle en una
// cajita gris) + lápiz y tacho en la fila
function RowOne({ c, defaultOpen }: { c: Cat; defaultOpen?: boolean }) {
  const [open, setOpen] = React.useState(!!defaultOpen)
  return (
    <div className="border-b border-border last:border-b-0">
      <div className="flex items-center gap-3 px-4 py-3">
        <button type="button" onClick={() => setOpen((o) => !o)} className="flex min-w-0 flex-1 items-center gap-3 text-left text-sm">
          <div className="min-w-0 flex-1">
            <div className="truncate"><span className="text-brand-text">✸</span> {c.name}</div>
            <div className="mt-0.5 text-xs text-muted-foreground">{bookmarksCount(c.count)}</div>
          </div>
          <ChevronDown className={cn("size-4 shrink-0 text-muted-foreground transition-transform duration-200", open && "rotate-180")} />
        </button>
        <Actions />
      </div>
      {open && (
        <div className="mx-4 mb-3 rounded-box-m bg-inset py-1">
          {c.subs.map((s) => (
            <div key={s.name} className="flex items-center gap-3 py-1 pr-2 pl-4 text-sm">
              <div className="min-w-0 flex-1">
                <div className="truncate">{s.name}</div>
                <div className="mt-0.5 text-xs text-muted-foreground">{subCount(s.count)}</div>
              </div>
              <Actions />
            </div>
          ))}
          <div className="px-box-xs py-box-2xs"><Button variant="dashed" size="sm" className="w-full"><Plus /> Agregar subcategoría</Button></div>
        </div>
      )}
    </div>
  )
}

function StyleOne() {
  return (
    <>
      <div className="overflow-hidden rounded-box-l bg-card">
        {CATS.map((c, i) => <RowOne key={c.name} c={c} defaultOpen={i === 0} />)}
      </div>
      <Button variant="dashed" className="w-full"><Plus className="size-4" /> Agregar categoría</Button>
    </>
  )
}

// Estilo 2: como está hoy en bookmarks (la forma original, ya con los colores del sistema)
function RowTwo({ c, defaultOpen }: { c: Cat; defaultOpen?: boolean }) {
  const [open, setOpen] = React.useState(!!defaultOpen)
  const [editing, setEditing] = React.useState(false)
  return (
    <div className="border-b border-border">
      <div className="flex min-h-14 items-center gap-3 px-4">
        {editing ? (
          <input autoFocus defaultValue={c.name} className="min-w-0 flex-1 bg-transparent font-medium caret-brand outline-none" />
        ) : (
          <button onClick={() => setOpen((o) => !o)} className="flex min-w-0 flex-1 items-center gap-1.5 self-stretch text-left">
            <span className="shrink-0 text-brand-text">✸</span>
            <span className="truncate font-medium">{c.name}</span>
            <span className="shrink-0 text-xs text-muted-foreground">{bookmarksCount(c.count)}</span>
            <ChevronDown className={cn("ml-auto size-4 shrink-0 text-muted-foreground transition-transform duration-200", open && "rotate-180")} />
          </button>
        )}
        <Actions editing={editing} onEdit={() => setEditing((e) => !e)} />
      </div>
      {open && (
        <div className="border-t border-border">
          {c.subs.map((s) => (
            <div key={s.name} className="flex min-h-14 items-center gap-3 border-b border-border pr-4 pl-8">
              <span className="min-w-0 flex-1 text-muted-foreground">{s.name} <span className="text-xs">· {subCount(s.count)}</span></span>
              <Actions />
            </div>
          ))}
          <button className="flex min-h-14 w-full items-center bg-inset pr-4 pl-8 font-medium text-brand-text hover:bg-card-hover">+ Agregar nueva subcategoría</button>
        </div>
      )}
    </div>
  )
}

function StyleTwo() {
  return (
    <div className="overflow-hidden rounded-box-l bg-card text-sm">
      {CATS.map((c, i) => <RowTwo key={c.name} c={c} defaultOpen={i === 0} />)}
      <button className="flex min-h-14 w-full items-center px-4 font-medium text-brand-text hover:bg-card-hover">+ Agregar nueva categoría</button>
    </div>
  )
}

export function BookmarksStyle() {
  const { resolvedTheme } = useTheme()
  const v = BRANDS.bookmarks[resolvedTheme === "dark" ? "dark" : "light"]
  const brand = {
    "--brand": v.brand, "--brand-text": v.text, "--brand-strong": v.strong, "--brand-hover": v.hover, "--brand-foreground": v.fg,
    "--primary": v.brand, "--primary-foreground": v.fg, "--ring": v.brand,
  } as React.CSSProperties
  const screen = (label: string, body: React.ReactNode) => (
    <div className="flex min-w-0 flex-col gap-2" style={brand}>
      <span className="eyebrow">{label}</span>
      <div className="flex flex-col gap-box-s overflow-hidden rounded-box-l bg-background p-box-m">
        <SectionHeader title="Categorías" label="categorías" value={CATS.length} />
        {body}
      </div>
    </div>
  )
  return (
    <div className="flex flex-col gap-3">
      <div>
        <div className="text-sm font-medium">Pantalla de categorías</div>
        <div className="text-xs text-muted-foreground">Cada categoría se abre y muestra sus subcategorías; lápiz para cambiarle el nombre y tacho para borrarla. Tocá las filas para abrirlas.</div>
      </div>
      <div className="grid grid-cols-1 items-start gap-3 md:grid-cols-2">
        {screen("Estilo 1 · como el análisis de gastos de pay", <StyleOne />)}
        {screen("Estilo 2 · como está hoy en bookmarks", <StyleTwo />)}
      </div>
    </div>
  )
}
