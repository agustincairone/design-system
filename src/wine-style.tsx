// Guía (temporal): "Estilo wine". Cada pieza de wine-tracker tal cual (estilo 2) al lado
// de cómo quedaría con lo que el sistema ya tiene, pintado con el color de wine (estilo 1).
// Cuando el usuario elija, lo elegido pasa a su sección y este archivo se borra.
import * as React from "react"
import { toast } from "sonner"
import { Bookmark, Check, SlidersHorizontal, Plus, Star, User, Wine } from "lucide-react"

import { useTheme } from "@/components/theme-provider"
import { BRANDS } from "@/brands"
import { AppHero, LiveDate, SectionHeader } from "@/components/ui/app-hero"
import { BottomNav } from "@/components/controls/bottom-nav"
import { TabBar } from "@/components/controls/tab-bar"
import { ExpandRow } from "@/components/controls/expand-row"
import { FieldSlider } from "@/components/controls/field-slider"
import { ItemCard } from "@/components/cards/item-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Chip, ChipGroup } from "@/components/ui/chip"
import { FieldLabel } from "@/components/ui/field-label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BottomSheet, ConfirmSheet } from "@/components/ui/bottom-sheet"
import { EmptyState } from "@/components/ui/empty-state"
import {
  PERFIL, WINE, WINE_FONT, type WineData, WineButton, WineCard, WineComment, WineDelete, WineDetailTabs, WineDialog, WineEmpty,
  WineFilterButtons, WineFilterSections, WineHeader, WineInfo, WineInput, WineLogin, WinePerfilChips, WinePerfilSlider, WineSearch,
  WineSectionCard, WineSelect, WineSheet, WineStarInput, WineStars, WineStepHeader, WineSummary, WineToast,
} from "@/wine-original"

const WINES: WineData[] = [
  { nombre: "Gran Enemigo", bodega: "El Enemigo", cosecha: "2019", uva: "Cabernet Franc", provincia: "Mendoza", rating: 5 },
  { nombre: "Catena Zapata Malbec", bodega: "Catena Zapata", cosecha: "2020", uva: "Malbec", provincia: "Mendoza", rating: 4 },
]
const PERF = { fruta: 4, acidez: 4, taninos: 4 }
const COSECHAS = ["2024", "2023", "2022", "2021", "2020", "2019"]
const FILTERS = [
  { key: "uva", label: "Uva", options: ["Malbec", "Cabernet Franc", "Bonarda", "Torrontés"] },
  { key: "bodega", label: "Bodega", options: ["Catena Zapata", "El Enemigo", "El Esteco"] },
  { key: "cosecha", label: "Cosecha", options: ["2018", "2019", "2020", "2021"] },
]
// El slider de wine necesita su CSS (está en el index.css de la app)
const SLIDER_CSS = `.wine-slider{-webkit-appearance:none;appearance:none;display:block;width:100%;height:4px;border-radius:2px;outline:none;cursor:pointer;margin:0;padding:0}
.wine-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:10px;height:10px;border-radius:50%;background:#722F37;cursor:pointer;border:1.5px solid #fff}
.wine-slider::-moz-range-thumb{width:10px;height:10px;border-radius:50%;background:#722F37;cursor:pointer;border:1.5px solid #fff}`

function Compare({ name, use, oneNote, one, two, bare }: {
  name: string; use: string; oneNote: string; one: React.ReactNode; two: React.ReactNode
  /** sin caja (pantallas y hojas, que traen su propio fondo) */
  bare?: boolean
}) {
  const { resolvedTheme } = useTheme()
  const v = BRANDS["wine-tracker"][resolvedTheme === "dark" ? "dark" : "light"]
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
          <span className="eyebrow">Estilo 2 · wine (original)</span>
          <div className={box} style={{ background: bare ? WINE.bg : "#FFFFFF", fontFamily: WINE_FONT, color: WINE.text, padding: bare ? 16 : undefined }}>{two}</div>
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
  const [nav, setNav] = React.useState("lista")
  return <BottomNav value={nav} onChange={setNav} items={[
    { key: "agregar", icon: Wine, label: "Agregar" }, { key: "lista", icon: Bookmark, label: "Mi lista" },
    { key: "probados", icon: Check, label: "Ya probé" }, { key: "perfil", icon: User, label: "Perfil" },
  ]} />
}

function DsDetailSheet() {
  const [tab, setTab] = React.useState("info")
  return (
    <BottomSheet inline open onOpenChange={() => {}} title="Ficha del vino">
      <TabBar label="Ficha" value={tab} onChange={setTab} className="-mx-box-l -mt-4 w-auto" options={[{ value: "info", label: "Info" }, { value: "editar", label: "Editar" }, { value: "borrar", label: "Borrar" }]} />
      <div>
        <div className="flex items-start justify-between gap-box-xs">
          <span className="text-lg font-medium">{WINES[0].nombre}</span>
          <span className="text-brand-text">★★★★★</span>
        </div>
        <p className="mt-box-xs text-sm text-muted-foreground">El Enemigo · 2019 · Cabernet Franc</p>
        <p className="mt-box-2xs text-sm text-muted-foreground">Mendoza · Valle de Uco</p>
      </div>
      <Button className="w-full"><Bookmark /> Mi lista</Button>
    </BottomSheet>
  )
}

function DsFilterSheet() {
  const [sel, setSel] = React.useState<string[]>(["Malbec"])
  const toggle = (o: string) => setSel((p) => (p.includes(o) ? p.filter((x) => x !== o) : [...p, o]))
  return (
    <BottomSheet inline open onOpenChange={() => {}} title="Filtrar por">
      <div className="-my-box-xs">
        {FILTERS.map((f, i) => (
          <ExpandRow key={f.key} title={f.label} sub={f.key === "uva" && sel.length ? sel.join(", ") : undefined} defaultOpen={i === 0}>
            <ChipGroup className="px-box-m py-box-xs">
              {f.options.map((o) => <Chip key={o} selected={f.key === "uva" && sel.includes(o)} onClick={() => f.key === "uva" && toggle(o)}>{o}</Chip>)}
            </ChipGroup>
          </ExpandRow>
        ))}
      </div>
      <Button className="w-full">Confirmar</Button>
    </BottomSheet>
  )
}

function DsPerfilSlider() {
  const [v, setV] = React.useState(4)
  return (
    <div className="rounded-box-m bg-inset p-box-m">
      <FieldSlider label="🍒 Fruta" value={v} min={1} max={5} onChange={setV} format={(n) => n + "/5"} />
      <div className="mt-box-xs flex justify-between text-xs text-muted-foreground"><span>Poco frutado</span><span>Muy frutado</span></div>
    </div>
  )
}

export function WineStyle() {
  const [cosecha, setCosecha] = React.useState<string>()
  return (
    <div className="flex flex-col gap-section">
      <style>{SLIDER_CSS}</style>

      <Compare name="Encabezado y navegación" use="Arriba de todo, para cambiar entre Agregar, Mi lista y Ya probé." oneNote="fleje + barra de abajo (como pay y outfit)" bare
        one={<div className="flex flex-col gap-box-m bg-background p-box-m">
          <AppHero name="Wine" jp="ワイン日記" stats={[{ value: <LiveDate />, label: "diario de vinos" }]} />
          <DsNav />
        </div>}
        two={<WineHeader />} />

      <Compare name="Título de cada pantalla" use="Agregar nuevo vino, Mi lista, Ya probé." oneNote="título arriba de la caja, con un dato a la derecha" bare
        one={<div className="flex flex-col gap-box-s bg-background p-box-m">
          <SectionHeader title="Mi lista" label="vinos" value={4} />
          <div className="rounded-box-l bg-card p-box-l text-sm text-muted-foreground">…</div>
        </div>}
        two={<WineSectionCard title="Mi lista"><p className="text-sm" style={{ color: WINE.gray }}>…</p></WineSectionCard>} />

      <Compare name="Campos de texto" use="Nombre del vino y bodega." oneNote="título gris arriba de cada campo"
        one={<><div><FieldLabel>Nombre del vino</FieldLabel><Input placeholder="Ej: Gran Enemigo" /></div><div><FieldLabel>Bodega</FieldLabel><Input placeholder="Ej: El Enemigo" /></div></>}
        two={<div className="space-y-3"><WineInput placeholder="Nombre del vino *" /><WineInput placeholder="Bodega" /></div>} />

      <Compare name="Elegir de una lista" use="Cosecha, uva, provincia, región. En wine se puede escribir para buscar adentro de la lista." oneNote="selector del sistema (sin buscador)"
        one={<div><FieldLabel>Cosecha</FieldLabel><Select value={cosecha} onValueChange={setCosecha}><SelectTrigger className="w-full"><SelectValue placeholder="Elegí una" /></SelectTrigger><SelectContent>{COSECHAS.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select></div>}
        two={<WineSelect placeholder="Cosecha" options={COSECHAS} />} />

      <Compare name="Botones" use="Guardar en Mi lista o en Ya probé. Abajo, cómo se ven apagados (falta el nombre)." oneNote="gris y del color de la app"
        one={<><div className="flex gap-box-xs"><Button variant="secondary" className="flex-1"><Plus /> Mi lista</Button><Button className="flex-1"><Star /> Ya lo probé</Button></div>
          <div className="flex gap-box-xs"><Button variant="secondary" className="flex-1" disabled><Plus /> Mi lista</Button><Button className="flex-1" disabled><Star /> Ya lo probé</Button></div></>}
        two={<><div className="flex gap-3"><WineButton kind="outline"><Plus className="h-4 w-4" /> Mi lista</WineButton><WineButton><Star className="h-4 w-4" /> Ya lo probé</WineButton></div>
          <div className="flex gap-3"><WineButton disabled><Plus className="h-4 w-4" /> Mi lista</WineButton><WineButton disabled><Star className="h-4 w-4" /> Ya lo probé</WineButton></div></>} />

      <Compare name="Buscador" use="Buscar en Mi lista o Ya probé por nombre, bodega, uva o cosecha." oneNote="no existe"
        one={<Missing>El sistema no tiene buscador. Si te gusta el de wine, lo sumamos.</Missing>}
        two={<WineSearch />} />

      <Compare name="Filtrar" use="Abre la hoja de filtros. Limpiar aparece cuando hay algún filtro puesto." oneNote="botón gris + link"
        one={<div className="flex items-center gap-box-s"><Button variant="secondary" className="flex-1"><SlidersHorizontal /> Filtrar (1)</Button><Button variant="link">Limpiar</Button></div>}
        two={<WineFilterButtons count={1} />} />

      <Compare name="Ficha de cada vino" use="La grilla de Mi lista y Ya probé (2 columnas en el celular)." oneNote="ficha de outfit (sin estrellas)"
        one={<div className="grid grid-cols-2 gap-box-gap">{WINES.map((w) => <ItemCard key={w.nombre} item={{ marca: w.nombre, modelo: [w.bodega, w.cosecha].join(" · "), tipo: w.provincia }} />)}</div>}
        two={<div className="grid grid-cols-2 gap-3">{WINES.map((w) => <WineCard key={w.nombre} wine={w} />)}</div>} />

      <Compare name="Estrellas" use="El puntaje en la ficha y para puntuar un vino." oneNote="no existe"
        one={<Missing>El sistema no tiene estrellas. Si te gustan las de wine, las sumamos.</Missing>}
        two={<><WineStars rating={4} /><WineStarInput /></>} />

      <Compare name="Ficha del vino (ventana)" use="Se abre al tocar un vino: Info, Editar y Borrar." oneNote="hoja del sistema + pestañas de ancho completo" bare
        one={<div className="bg-background p-box-m"><DsDetailSheet /></div>}
        two={<WineSheet title="Ficha del vino" footer={<WineButton><Bookmark className="h-4 w-4" /> Mi lista</WineButton>}><WineDetailTabs /><WineInfo wine={WINES[0]} perfil={PERF} /></WineSheet>} />

      <Compare name="Perfil en fichitas" use="Adentro de la ficha: cómo es el vino de 1 a 5." oneNote="labels del sistema"
        one={<ChipGroup scroll>{PERFIL.map((s) => <Badge key={s.key} variant="secondary">{s.emoji} {s.name} · {PERF[s.key as keyof typeof PERF]}/5</Badge>)}</ChipGroup>}
        two={<WinePerfilChips perfil={PERF} />} />

      <Compare name="Filtro (ventana)" use="Uva, bodega y cosecha: se abre una y se eligen varias." oneNote="hoja + filas que se abren + chips" bare
        one={<div className="bg-background p-box-m"><DsFilterSheet /></div>}
        two={<WineSheet title="Filtrar por:" footer={<WineButton>Confirmar</WineButton>}><WineFilterSections sections={FILTERS} /></WineSheet>} />

      <Compare name="Perfil del vino (barra de 1 a 5)" use="Al cargar un vino que ya probaste, y en Editar." oneNote="slider del sistema en una caja M"
        one={<DsPerfilSlider />}
        two={<WinePerfilSlider s={PERFIL[0]} />} />

      <Compare name="Pasos para agregar un vino" use="Imagen (1/3), perfil (2/3) y puntaje (3/3), en la misma ventana." oneNote="no existe"
        one={<Missing>Las hojas del sistema no tienen pasos (volver y "2 / 3"). Si te gusta, lo sumamos.</Missing>}
        two={<div className="overflow-hidden rounded-xl" style={{ background: "#FFFFFF" }}><WineStepHeader title="Perfil del vino" step="2 / 3" back /></div>} />

      <Compare name="Comentario" use="Al puntuar: un comentario opcional de hasta 200 letras." oneNote="campo del sistema"
        one={<div><FieldLabel>Comentario (opcional)</FieldLabel><Textarea placeholder="Escribí un comentario" /></div>}
        two={<WineComment />} />

      <Compare name="Borrar un vino" use="La pestaña Borrar de la ficha. En wine el botón de eliminar es bordó; en el sistema, borrar es siempre rojo." oneNote="confirmación del sistema" bare
        one={<div className="bg-background p-box-m"><ConfirmSheet inline open onOpenChange={() => {}} title="Eliminar vino" question="¿Eliminar Gran Enemigo?" detail="No se puede deshacer." confirmLabel="Eliminar" onConfirm={() => {}} /></div>}
        two={<WineSheet title="Ficha del vino" footer={<><WineButton kind="gray">Cancelar</WineButton><WineButton>Eliminar</WineButton></>}><WineDelete wine={WINES[0]} /></WineSheet>} />

      <Compare name="Vino duplicado" use="Si cargás un vino que ya tenías." oneNote="hoja del sistema" bare
        one={<div className="bg-background p-box-m"><BottomSheet inline open onOpenChange={() => {}} title="Vino duplicado">
          <p>Parece que ya cargaste este vino en <span className="font-medium text-brand-text">Ya probé</span>.</p>
          <div className="rounded-box-s bg-inset p-box-s"><p className="font-medium">{WINES[0].nombre}</p><p className="text-xs text-muted-foreground">El Enemigo · 2019</p></div>
          <div className="grid grid-cols-2 gap-box-xs"><Button variant="secondary">Guardar igual</Button><Button>Ver vino</Button></div>
        </BottomSheet></div>}
        two={<WineDialog title="Vino duplicado">
          <p className="text-sm">Parece que ya cargaste este vino en <span style={{ fontWeight: 500, color: WINE.brand }}>Ya probé</span>.</p>
          <WineSummary wine={WINES[0]} />
          <div className="flex gap-2"><WineButton disabled>Guardar igual</WineButton><WineButton>Ver vino</WineButton></div>
        </WineDialog>} />

      <Compare name="Aviso" use="Aparece abajo un ratito al guardar un vino." oneNote="aviso del sistema (tocá para verlo)"
        one={<Button variant="secondary" onClick={() => toast("Vino agregado 🍷")}>Mostrar aviso</Button>}
        two={<div className="flex justify-center"><WineToast /></div>} />

      <Compare name="Lista vacía" use="Cuando todavía no hay vinos en Mi lista o Ya probé." oneNote="estado vacío del sistema"
        one={<EmptyState icon={<Wine className="text-primary" />} title="Tu lista está vacía" text="Agregá un vino para verlo acá" />}
        two={<WineEmpty />} />

      <Compare name="Entrada" use="La pantalla para entrar con Google." oneNote="caja L con el emoji grande" bare
        one={<div className="flex justify-center bg-background p-box-m"><div className="flex w-full max-w-sm flex-col items-center gap-box-xs rounded-box-l bg-card p-box-l text-center">
          <span className="text-emoji">🍷</span><p className="title-box">Wine</p><p className="text-sm text-muted-foreground">Guardá y organizá tus vinos favoritos</p>
          <Button className="mt-box-m w-full">Continuar con Google</Button>
        </div></div>}
        two={<div className="flex justify-center"><WineLogin /></div>} />
    </div>
  )
}
