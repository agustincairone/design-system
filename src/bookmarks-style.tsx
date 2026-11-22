// Guía (temporal): "Estilo bookmarks". Cada pieza de bookmarks tal cual (estilo 2) al lado
// de cómo quedaría con lo que el sistema ya tiene, pintado con el naranja de bookmarks (estilo 1).
// Cuando el usuario elija, lo elegido pasa a su sección y este archivo se borra.
import * as React from "react"
import { Bookmark, LogOut, Plus, SlidersHorizontal, Sparkles, Tags, User } from "lucide-react"

import { useTheme } from "@/components/theme-provider"
import { ThemeToggle } from "@/components/theme-toggle"
import { BRANDS } from "@/brands"
import { AppHero, LiveDate, SectionHeader } from "@/components/ui/app-hero"
import { BottomNav } from "@/components/controls/bottom-nav"
import { Segmented } from "@/components/controls/segmented"
import { ExpandRow, ExpandRowItem } from "@/components/controls/expand-row"
import { ItemCard, ItemRow } from "@/components/cards/item-card"
import { Button } from "@/components/ui/button"
import { Chip, ChipGroup } from "@/components/ui/chip"
import { FieldLabel } from "@/components/ui/field-label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { SearchInput } from "@/components/ui/search-input"
import { BottomSheet, ConfirmSheet, SheetSummary } from "@/components/ui/bottom-sheet"
import { EmptyState } from "@/components/ui/empty-state"
import {
  BM, BM_FONT, type BmData, BmAiField, BmButtons, BmCard, BmCategories, BmDuplicate, BmEmpty, BmFab, BmFilterBar, BmFilterChips,
  BmHeader, BmLineInput, BmLogin, BmMenu, BmPickChips, BmQuestion, BmSearch, BmSheet, BmSummary, BmViewToggle, getDomain,
} from "@/bookmarks-original"

// Imágenes de ejemplo (en la app, cada link trae la suya)
const thumb = (bg: string, fg: string) =>
  "data:image/svg+xml;utf8," +
  encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="320" height="180" viewBox="0 0 320 180"><rect width="320" height="180" fill="${bg}"/><rect x="24" y="28" width="150" height="14" rx="7" fill="${fg}"/><rect x="24" y="52" width="100" height="10" rx="5" fill="${fg}" opacity=".5"/><rect x="24" y="96" width="272" height="60" rx="10" fill="${fg}" opacity=".25"/></svg>`)

const BOOKMARKS: BmData[] = [
  { url: "https://github.com/shadcn-ui/ui", title: "shadcn/ui", type: "github", thumbnail: thumb("#e7e5e4", "#44403b"), description: "Componentes para copiar y pegar en tus apps.", category: "Diseño", subcategories: ["Componentes"] },
  { url: "https://www.youtube.com/watch?v=ejemplo", title: "Cómo armar un design system", type: "youtube", thumbnail: thumb("#292524", "#d6d3d1"), description: "Charla sobre colores, letras y componentes.", category: "Diseño", subcategories: ["Videos"] },
]
const CATEGORIAS = ["Diseño", "Lecturas", "Recetas"]
const SUBCATS = ["Componentes", "Videos"]
const CATS = [
  { name: "Diseño", count: 2, subs: [{ name: "Componentes", count: 1 }, { name: "Videos", count: 1 }] },
  { name: "Lecturas", count: 1, subs: [{ name: "Tipografía", count: 1 }] },
  { name: "Recetas", count: 0, subs: [] },
]
const plural = (n: number) => (n === 0 ? "sin bookmarks" : `${n} bookmark${n !== 1 ? "s" : ""}`)
const asItem = (b: BmData) => ({ marca: b.title, modelo: [b.category, b.subcategories?.[0]].filter(Boolean).join(" · "), tipo: getDomain(b.url), imageUrl: b.thumbnail ?? undefined })

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

// Lo que el sistema todavía no tiene
function Missing({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-muted-foreground">{children}</p>
}

function DsNav() {
  const [nav, setNav] = React.useState("inicio")
  return <BottomNav value={nav} onChange={setNav} items={[
    { key: "inicio", icon: Bookmark, label: "Bookmarks" }, { key: "categorias", icon: Tags, label: "Categorías" }, { key: "perfil", icon: User, label: "Perfil" },
  ]} />
}

function DsView() {
  const [view, setView] = React.useState<"grilla" | "lista">("grilla")
  return <Segmented size="sm" label="Vista" value={view} onChange={setView} options={[{ value: "grilla", label: "Grilla" }, { value: "lista", label: "Lista" }]} />
}

function DsSearch() {
  const [q, setQ] = React.useState("")
  return <SearchInput value={q} onChange={setQ} />
}

function DsFilterSheet() {
  const [cat, setCat] = React.useState<string | null>("Diseño")
  const [sub, setSub] = React.useState<string | null>(null)
  return (
    <BottomSheet inline open onOpenChange={() => {}} title="Filtrar por">
      <div>
        <FieldLabel>Categoría</FieldLabel>
        <ChipGroup>{CATEGORIAS.map((c) => <Chip key={c} selected={cat === c} onClick={() => { setCat(cat === c ? null : c); setSub(null) }}>{c}</Chip>)}</ChipGroup>
      </div>
      {cat && (
        <div>
          <FieldLabel>Subcategoría</FieldLabel>
          <ChipGroup>{SUBCATS.map((s) => <Chip key={s} selected={sub === s} onClick={() => setSub(sub === s ? null : s)}>{s}</Chip>)}</ChipGroup>
        </div>
      )}
      <Button className="w-full">Confirmar</Button>
    </BottomSheet>
  )
}

function DsPick() {
  const [sel, setSel] = React.useState(CATEGORIAS[0])
  return (
    <ChipGroup>
      <Chip icon={Plus}>Nueva categoría</Chip>
      {CATEGORIAS.map((c) => <Chip key={c} selected={sel === c} onClick={() => setSel(c)}>{c}</Chip>)}
    </ChipGroup>
  )
}

function DsAiButton() {
  const [busy, setBusy] = React.useState(false)
  return (
    <Button variant="secondary" size="sm" disabled={busy} onClick={() => { setBusy(true); setTimeout(() => setBusy(false), 1200) }}>
      <Sparkles /> {busy ? "Generando..." : "Generar con IA"}
    </Button>
  )
}

export function BookmarksStyle() {
  const [title, setTitle] = React.useState("Cómo armar un design system")
  return (
    <div className="flex flex-col gap-section">
      <Compare name="Encabezado y navegación" use="Arriba de todo, y cómo se pasa del inicio a Categorías. En bookmarks se entra a Categorías desde el menú (☰)." oneNote="fleje + título + barra de abajo (como wine)" bare
        one={<div className="flex flex-col gap-box-m bg-background p-box-m">
          <AppHero name="Bookmarks" jp="ブックマーク" stats={[{ value: <LiveDate />, label: "links guardados" }]} />
          <SectionHeader title="Bookmarks" label="guardados" value={12} />
          <DsNav />
        </div>}
        two={<BmHeader />} />

      <Compare name="Ver en grilla o en lista" use="Arriba a la derecha: 2 columnas o 1." oneNote="píldora del sistema"
        one={<div><DsView /></div>}
        two={<BmViewToggle grid setGrid={() => {}} />} />

      <Compare name="Buscador" use="Busca en el título, la descripción, la categoría y el link." oneNote="buscador del sistema (lupa a la izquierda)"
        one={<DsSearch />}
        two={<BmSearch />} />

      <Compare name="Filtrar" use="Abre el filtro. Limpiar aparece cuando hay algo elegido." oneNote="botón gris + link (como wine)" bare
        one={<div className="flex items-center gap-box-s bg-background p-box-m"><Button variant="secondary" className="flex-1"><SlidersHorizontal /> Filtrar (1)</Button><Button variant="link">Limpiar</Button></div>}
        two={<BmFilterBar filter="Diseño" />} />

      <Compare name="Filtro (ventana)" use="En bookmarks son dos ventanas: una para la categoría y otra para la subcategoría." oneNote="una sola hoja con las dos" bare
        one={<div className="bg-background p-box-m"><DsFilterSheet /></div>}
        two={<BmSheet title="Filtrar por categoría"><BmFilterChips options={CATEGORIAS} /></BmSheet>} />

      <Compare name="Ficha de cada bookmark" use="La grilla del inicio. En el sistema la ficha no lleva botones adentro: al tocarla se abriría una hoja con Abrir, Editar y Borrar (como la ficha de wine)." oneNote="ficha alta de wine (la foto queda vertical)"
        one={<div className="grid grid-cols-2 gap-box-gap">{BOOKMARKS.map((b) => <ItemCard key={b.url} layout="tall" item={asItem(b)} onClick={() => {}} />)}</div>}
        two={<div className="grid grid-cols-2 gap-3">{BOOKMARKS.map((b) => <BmCard key={b.url} bm={b} />)}</div>} />

      <Compare name="Vista de lista" use="Cuando elegís lista: una ficha abajo de la otra." oneNote="fila con foto chica (como outfit)"
        one={<div className="flex flex-col gap-box-gap">{BOOKMARKS.map((b) => <ItemRow key={b.url} item={asItem(b)} />)}</div>}
        two={<BmCard bm={BOOKMARKS[0]} />} />

      <Compare name="Botón para agregar" use="Abajo, siempre a mano, para cargar un bookmark nuevo." oneNote="botón con texto flotando (como pay)"
        one={<div className="flex justify-center"><Button className="shadow-lg"><Plus className="size-4" /> Agregar bookmark</Button></div>}
        two={<div className="flex justify-end"><BmFab /></div>} />

      <Compare name="Tu cuenta" use="En bookmarks es el menú que sale de la izquierda (☰). En las otras apps es la pestaña Perfil." oneNote="pestaña Perfil (como wine), con claro / oscuro" bare
        one={<div className="bg-background p-box-m"><div className="overflow-hidden rounded-box-l bg-card">
          <div className="flex items-center gap-box-s border-b border-border p-box-m">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-inset"><User className="size-5" /></div>
            <div className="min-w-0"><p className="truncate text-sm font-medium">Tu nombre</p><p className="truncate text-xs text-muted-foreground">tu@mail.com</p></div>
          </div>
          <div className="flex items-center justify-between gap-box-s border-b border-border p-box-m"><span className="text-sm font-medium">Tema</span><ThemeToggle /></div>
          <button className="flex w-full items-center gap-box-xs p-box-m text-left text-sm font-medium hover:bg-card-hover"><LogOut className="size-4" /> Cerrar sesión</button>
        </div></div>}
        two={<BmMenu />} />

      <Compare name="Campos de texto" use="El link, el nombre de una categoría nueva o de una subcategoría nueva." oneNote="título gris arriba del campo"
        one={<div><FieldLabel>Link</FieldLabel><Input placeholder="https://..." /></div>}
        two={<BmLineInput placeholder="https://..." label="Link" />} />

      <Compare name="Título y descripción, con IA" use="Paso 2 y paso 5: hasta 50 letras el título y 100 la descripción, con un botón para que la IA los escriba." oneNote="campo + botón chico gris"
        one={<>
          <div><FieldLabel right={<DsAiButton />}>Título</FieldLabel><Input value={title} maxLength={50} onChange={(e) => setTitle(e.target.value)} /></div>
          <div><FieldLabel right={<DsAiButton />}>Descripción</FieldLabel><Textarea maxLength={100} placeholder="Agregá una descripción" /></div>
          <Missing>El campo de una línea no tiene contador (50 letras): sólo lo tiene el de varias líneas. Si lo querés, lo sumamos.</Missing>
        </>}
        two={<div className="flex flex-col gap-6"><BmAiField placeholder="Título del bookmark" label="Título" max={50} value="Cómo armar un design system" /><BmAiField placeholder="Agregá una descripción" label="Descripción" max={100} /></div>} />

      <Compare name="Elegir categoría" use="Paso 3 y paso 4: tocás una que ya tenés o creás una nueva." oneNote="chips del sistema"
        one={<DsPick />}
        two={<BmPickChips options={CATEGORIAS} newLabel="Nueva categoría" />} />

      <Compare name="Agregar un bookmark (pasos)" use="Los 6 pasos en la misma ventana: link, título, categoría, subcategoría, descripción y resumen." oneNote="hoja con pasos (volver arriba y Paso 2/6)" bare
        one={<div className="bg-background p-box-m"><BottomSheet inline open onOpenChange={() => {}} title="Agregar bookmark" step={{ current: 2, total: 6 }} onBack={() => {}}>
          <div><FieldLabel right={<DsAiButton />}>Título</FieldLabel><Input defaultValue="Cómo armar un design system" /></div>
          <Button className="w-full">Siguiente</Button>
        </BottomSheet></div>}
        two={<BmSheet title="Agregar bookmark" footer={<BmButtons />}><BmAiField placeholder="Título del bookmark" label="Título" max={50} value="Cómo armar un design system" /></BmSheet>} />

      <Compare name="Ya lo tenías guardado" use="Paso 1: si el sitio ya está en tus bookmarks, avisa y te deja cargarlo igual." oneNote="hoja + resumen en caja gris (como el vino duplicado)" bare
        one={<div className="bg-background p-box-m"><BottomSheet inline open onOpenChange={() => {}} title="Agregar bookmark" step={{ current: 1, total: 6 }}>
          <div><FieldLabel>Link</FieldLabel><Input defaultValue="https://github.com/shadcn-ui/ui" /></div>
          <p>Ya tenés un bookmark parecido guardado:</p>
          <SheetSummary title={BOOKMARKS[0].title} lines={[getDomain(BOOKMARKS[0].url), "Diseño · Componentes"]} />
          <div className="grid grid-cols-2 gap-box-xs"><Button variant="secondary">Cancelar</Button><Button>Cargar igual</Button></div>
        </BottomSheet></div>}
        two={<BmSheet title="Agregar bookmark" footer={<BmButtons back="Cancelar" next="Cargar igualmente" />}><BmDuplicate bm={BOOKMARKS[0]} /></BmSheet>} />

      <Compare name="Resumen (último paso)" use="Paso 6: lo que cargaste, antes de guardar." oneNote="fila con foto chica + datos" bare
        one={<div className="bg-background p-box-m"><BottomSheet inline open onOpenChange={() => {}} title="Agregar bookmark" step={{ current: 6, total: 6 }} onBack={() => {}}>
          <ItemRow item={asItem(BOOKMARKS[1])} />
          <SheetSummary title="Descripción" lines={[BOOKMARKS[1].description]} />
          <Button className="w-full">Guardar</Button>
        </BottomSheet></div>}
        two={<BmSheet title="Agregar bookmark" top footer={<BmButtons back="Cancelar" next="Guardar" />}><BmSummary bm={BOOKMARKS[1]} /></BmSheet>} />

      <Compare name="Botones" use="Atrás y Siguiente. Abajo, cómo se ven apagados (falta completar el paso). En las hojas del sistema, volver es la flecha de arriba." oneNote="gris y del color de la app"
        one={<><div className="flex gap-box-xs"><Button variant="secondary" className="flex-1">Atrás</Button><Button className="flex-1">Siguiente</Button></div>
          <div className="flex gap-box-xs"><Button variant="secondary" className="flex-1">Atrás</Button><Button className="flex-1" disabled>Siguiente</Button></div></>}
        two={<><BmButtons /><BmButtons off /></>} />

      <Compare name="Abandonar la carga" use="Si tocás la cruz o afuera mientras cargás un bookmark." oneNote="confirmación del sistema" bare
        one={<div className="bg-background p-box-m"><ConfirmSheet inline open onOpenChange={() => {}} title="Agregar bookmark" question="¿Querés abandonar la carga del bookmark?" detail="Lo que cargaste no se va a poder recuperar." cancelLabel="Seguir editando" confirmLabel="Abandonar" onConfirm={() => {}} /></div>}
        two={<BmSheet title="Agregar bookmark" footer={<BmButtons back="Seguir editando" next="Abandonar" danger />}><BmQuestion question="¿Querés abandonar la carga del bookmark?" detail="Recordá que los datos cargados no vas a poder recuperarlos." /></BmSheet>} />

      <Compare name="Borrar" use="Un bookmark, una categoría o una subcategoría (las tres ventanas son iguales)." oneNote="confirmación del sistema + lo que se borra" bare
        one={<div className="bg-background p-box-m"><ConfirmSheet inline open onOpenChange={() => {}} title="Eliminar bookmark" question="¿Querés eliminar este bookmark?" detail="No se puede deshacer." cancelLabel="Cancelar" confirmLabel="Eliminar" onConfirm={() => {}}>
          <SheetSummary title={BOOKMARKS[0].title} lines={[getDomain(BOOKMARKS[0].url)]} />
        </ConfirmSheet></div>}
        two={<BmSheet title="Eliminar bookmark" footer={<BmButtons back="Cancelar" next="Eliminar" danger />}><BmQuestion question="¿Querés eliminar este bookmark?" detail="Recordá que esta acción no se puede deshacer." /></BmSheet>} />

      <Compare name="Pantalla de categorías" use="Cada categoría se abre y muestra sus subcategorías. En bookmarks, cada fila tiene lápiz para cambiarle el nombre y tacho para borrarla." oneNote="filas que se abren (como pay)" bare
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
          <Missing>El sistema no tiene lápiz y tacho en la fila. Se puede hacer con una hoja al tocar la categoría (nombre + Guardar + Eliminar), o sumamos los íconos a la fila.</Missing>
        </div>}
        two={<BmCategories cats={CATS} />} />

      <Compare name="Lista vacía" use="Cuando todavía no hay bookmarks, o la búsqueda no encontró nada." oneNote="estado vacío del sistema"
        one={<EmptyState icon={<Bookmark className="text-primary" />} title="No hay bookmarks todavía" text="Tocá Agregar bookmark para guardar el primero" />}
        two={<BmEmpty text="No hay bookmarks todavía" />} />

      <Compare name="Entrada" use="La pantalla para entrar con Google." oneNote="caja L con el emoji grande (como wine)" bare
        one={<div className="flex justify-center bg-background p-box-m"><div className="flex w-full max-w-sm flex-col items-center gap-box-xs rounded-box-l bg-card p-box-l text-center">
          <span className="text-emoji">🔖</span><p className="title-box">Bookmarks</p><p className="text-sm text-muted-foreground">Guardá y organizá tus links</p>
          <Button className="mt-box-m w-full">Continuar con Google</Button>
        </div></div>}
        two={<BmLogin />} />
    </div>
  )
}
