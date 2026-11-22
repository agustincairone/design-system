// Guía: ejemplos de las piezas que vinieron de bookmarks (ficha de link, campo de línea, botón de IA,
// botón flotante, píldora con íconos y resumen con nombres).
import * as React from "react"
import { LayoutGrid, List, Plus } from "lucide-react"

import { Segmented } from "@/components/controls/segmented"
import { LinkCard, LinkRow, type LinkItem } from "@/components/cards/link-card"
import { LineInput } from "@/components/ui/line-input"
import { AiButton } from "@/components/ui/ai-button"
import { FloatingButton } from "@/components/ui/floating-button"
import { Button } from "@/components/ui/button"
import { BottomSheet, SheetSummary } from "@/components/ui/bottom-sheet"

// Imágenes de ejemplo (en una app, cada link trae la suya)
const thumb = (bg: string, fg: string) =>
  "data:image/svg+xml;utf8," +
  encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="320" height="180" viewBox="0 0 320 180"><rect width="320" height="180" fill="${bg}"/><rect x="24" y="28" width="150" height="14" rx="7" fill="${fg}"/><rect x="24" y="52" width="100" height="10" rx="5" fill="${fg}" opacity=".5"/><rect x="24" y="96" width="272" height="60" rx="10" fill="${fg}" opacity=".25"/></svg>`)

export const SAMPLE_LINKS: LinkItem[] = [
  { url: "https://github.com/shadcn-ui/ui", title: "shadcn/ui", thumbnail: thumb("#e7e5e4", "#44403b"), description: "Componentes para copiar y pegar en tus apps.", category: "Diseño", subcategory: "Componentes" },
  { url: "https://www.youtube.com/watch?v=ejemplo", title: "Cómo armar un design system", thumbnail: thumb("#292524", "#d6d3d1"), description: "Charla sobre colores, letras y componentes.", category: "Diseño", subcategory: "Videos" },
  { url: "https://x.com/ejemplo/status/1", title: "Hilo sobre tipografía", description: "Cómo elegir la letra de una app.", category: "Lecturas", subcategory: "Tipografía" },
]

export function LinkCardsDemo() {
  return (
    <div className="flex w-full flex-col gap-box-m">
      <div className="grid max-w-md grid-cols-2 gap-box-gap">
        {SAMPLE_LINKS.slice(0, 2).map((l) => <LinkCard key={l.url} link={l} onEdit={() => {}} onDelete={() => {}} />)}
      </div>
      <div className="flex max-w-md flex-col gap-box-gap">
        {SAMPLE_LINKS.map((l) => <LinkRow key={l.url} link={l} onEdit={() => {}} onDelete={() => {}} />)}
      </div>
    </div>
  )
}

export function LineInputDemo() {
  const [url, setUrl] = React.useState("")
  const [title, setTitle] = React.useState("Cómo armar un design system")
  const [desc, setDesc] = React.useState("")
  const [busy, setBusy] = React.useState(false)
  const ai = () => { setBusy(true); setTimeout(() => setBusy(false), 1200) }
  return (
    <div className="flex w-full max-w-md flex-col gap-box-l rounded-box-l bg-card p-box-l">
      <LineInput label="Link" placeholder="https://..." value={url} onChange={setUrl} inputMode="url" />
      <LineInput label="Título" multiline maxLength={50} value={title} onChange={setTitle} right={<AiButton busy={busy} onClick={ai} />} />
      <LineInput label="Descripción" multiline align="left" maxLength={100} placeholder="Agregá una descripción" value={desc} onChange={setDesc} right={<AiButton onClick={() => {}} />} />
    </div>
  )
}

export function AiButtonDemo() {
  const [busy, setBusy] = React.useState(false)
  return (
    <>
      <AiButton busy={busy} onClick={() => { setBusy(true); setTimeout(() => setBusy(false), 1200) }} />
      <AiButton busy />
    </>
  )
}

export function FloatingButtonDemo() {
  return (
    <FloatingButton inline>
      <Plus className="size-4" /> Agregar bookmark
    </FloatingButton>
  )
}

export function SegmentedIconsDemo() {
  const [a, setA] = React.useState<"grilla" | "lista">("grilla")
  const [b, setB] = React.useState<"grilla" | "lista">("grilla")
  const opts = [{ value: "grilla" as const, label: "Grilla", icon: LayoutGrid }, { value: "lista" as const, label: "Lista", icon: List }]
  return (
    <>
      <Segmented size="sm" label="Vista" value={a} onChange={setA} options={opts} />
      <Segmented size="sm" iconOnly label="Vista" value={b} onChange={setB} options={opts} />
    </>
  )
}

export function SummaryFieldsDemo() {
  const l = SAMPLE_LINKS[1]
  return (
    <BottomSheet inline open onOpenChange={() => {}} title="Agregar bookmark" step={{ current: 6, total: 6 }} onBack={() => {}}>
      <SheetSummary
        image={l.thumbnail}
        fields={[
          { label: "Título", value: l.title, wide: true },
          { label: "Categoría", value: l.category },
          { label: "Subcategoría", value: l.subcategory },
          { label: "Descripción", value: l.description, wide: true },
        ]}
      />
      <Button className="w-full">Guardar</Button>
    </BottomSheet>
  )
}
