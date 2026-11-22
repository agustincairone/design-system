// Guía (temporal): "Estilo bookmarks". Ya se eligió todo menos la pantalla de categorías, que quedó
// pendiente para charlar: acá está la de bookmarks tal cual (estilo 2) al lado de cómo quedaría con el
// sistema (estilo 1). Cuando se decida, este archivo y bookmarks-original.tsx se borran.
import * as React from "react"
import { Plus } from "lucide-react"

import { useTheme } from "@/components/theme-provider"
import { BRANDS } from "@/brands"
import { SectionHeader } from "@/components/ui/app-hero"
import { ExpandRow, ExpandRowItem } from "@/components/controls/expand-row"
import { Button } from "@/components/ui/button"
import { BM, BM_FONT, BmCategories } from "@/bookmarks-original"

const CATS = [
  { name: "Diseño", count: 2, subs: [{ name: "Componentes", count: 1 }, { name: "Videos", count: 1 }] },
  { name: "Lecturas", count: 1, subs: [{ name: "Tipografía", count: 1 }] },
  { name: "Recetas", count: 0, subs: [] },
]
const plural = (n: number) => (n === 0 ? "sin bookmarks" : `${n} bookmark${n !== 1 ? "s" : ""}`)

function Compare({ name, use, oneNote, one, two, bare }: {
  name: string; use: string; oneNote: string; one: React.ReactNode; two: React.ReactNode
  /** sin caja (pantallas y hojas, que traen su propio fondo) */
  bare?: boolean
}) {
  const { resolvedTheme } = useTheme()
  const v = BRANDS.bookmarks[resolvedTheme === "dark" ? "dark" : "light"]
  const brand = {
    "--brand": v.brand, "--brand-text": v.text, "--brand-strong": v.strong, "--brand-hover": v.hover, "--brand-foreground": v.fg,
    "--primary": v.brand, "--primary-foreground": v.fg, "--ring": v.brand,
  } as React.CSSProperties
  const box = bare ? "flex flex-col gap-3 overflow-hidden rounded-box-l" : "flex min-h-24 flex-col justify-center gap-3 rounded-box-l bg-card p-box-l"
  return (
    <div className="flex flex-col gap-3">
      <div>
        <div className="text-sm font-medium">{name}</div>
        <div className="text-xs text-muted-foreground">{use}</div>
      </div>
      <div className="grid grid-cols-1 items-start gap-3 md:grid-cols-2">
        <div className="flex min-w-0 flex-col gap-2" style={brand}>
          <span className="eyebrow">Estilo 1 · {oneNote}</span>
          <div className={box}>{one}</div>
        </div>
        <div className="flex min-w-0 flex-col gap-2">
          <span className="eyebrow">Estilo 2 · bookmarks (original)</span>
          <div className={box} style={{ background: bare ? BM.bg : BM.white, fontFamily: BM_FONT, color: BM.text, padding: bare ? 0 : undefined }}>{two}</div>
        </div>
      </div>
    </div>
  )
}

export function BookmarksStyle() {
  return (
    <div className="flex flex-col gap-section">
      <Compare name="Pantalla de categorías" use="Cada categoría se abre y muestra sus subcategorías. En bookmarks, cada fila tiene lápiz para cambiarle el nombre y tacho para borrarla." oneNote="filas que se abren (las del análisis de gastos de pay)" bare
        one={<div className="flex flex-col gap-box-s bg-background p-box-m">
          <SectionHeader title="Categorías" label="categorías" value={CATS.length} />
          <div className="overflow-hidden rounded-box-l bg-card">
            {CATS.map((c, i) => (
              <ExpandRow key={c.name} title={c.name} sub={plural(c.count)} defaultOpen={i === 0}>
                {c.subs.map((s) => <ExpandRowItem key={s.name} label={s.name} value={<span className="text-muted-foreground">{s.count}</span>} />)}
                <div className="px-box-xs py-box-2xs"><Button variant="dashed" size="sm" className="w-full"><Plus /> Agregar subcategoría</Button></div>
              </ExpandRow>
            ))}
          </div>
          <Button variant="dashed" className="w-full"><Plus className="size-4" /> Agregar categoría</Button>
          <p className="text-sm text-muted-foreground">El sistema no tiene lápiz y tacho en la fila. Se puede hacer con una hoja al tocar la categoría (nombre + Guardar + Eliminar), o sumamos los íconos a la fila.</p>
        </div>}
        two={<BmCategories cats={CATS} />} />
    </div>
  )
}
