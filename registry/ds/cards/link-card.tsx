import * as React from "react"
import { ExternalLink, Globe, Pencil, Trash2, createLucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

// Fichas de un link guardado (diseño de bookmarks, con la forma de las fichas del sistema): fondo `tile`,
// imagen del link, ícono del sitio + título, editar y borrar, descripción, y la categoría con la
// estrellita ✸ del color de la app (y la subcategoría abajo).
// - LinkCard: la ficha de la grilla (2 columnas), con la imagen apaisada (16:9) y el botón para abrir el link encima.
// - LinkRow: la fila de la lista (foto de 64px a la izquierda, como ItemRow), con abrir, editar y borrar a la derecha del título.
// Si el link no trae imagen: el ícono del sitio (o el de la página) y el dominio, en gris.

export type LinkSite = "twitter" | "youtube" | "github" | "web"

export type LinkItem = {
  url: string
  title?: string
  description?: string
  category?: string
  subcategory?: string
  thumbnail?: string | null
}

// Los logos de los sitios ya no vienen en lucide: el dibujo es el de lucide 0.263 (el que usaba bookmarks)
const Twitter = createLucideIcon("twitter", [["path", { d: "M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z", key: "a" }]])
const Youtube = createLucideIcon("youtube", [["path", { d: "M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17", key: "a" }], ["path", { d: "m10 15 5-3-5-3z", key: "b" }]])
const Github = createLucideIcon("github", [["path", { d: "M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4", key: "a" }], ["path", { d: "M9 18c-4.51 2-5-2-7-2", key: "b" }]])

export function domainOf(url: string) {
  try {
    return new URL(url).hostname.replace("www.", "")
  } catch {
    return url
  }
}

export function siteOf(url: string): LinkSite {
  const host = domainOf(url)
  if (host === "twitter.com" || host === "x.com") return "twitter"
  if (host === "youtube.com" || host === "youtu.be") return "youtube"
  if (host === "github.com") return "github"
  return "web"
}

// Ícono del sitio, con el color del logo llevado a la paleta (Twitter sky-500, YouTube red-600);
// GitHub del color del texto y cualquier otra página, un mundo gris.
export function SiteIcon({ url, className }: { url: string; className?: string }) {
  const site = siteOf(url)
  if (site === "twitter") return <Twitter aria-hidden className={cn("text-sky-500", className)} />
  if (site === "youtube") return <Youtube aria-hidden className={cn("text-red-600", className)} />
  if (site === "github") return <Github aria-hidden className={cn("text-foreground", className)} />
  return <Globe aria-hidden className={cn("text-muted-foreground", className)} />
}

// La imagen del link; sin imagen, el favicon de la página (o el logo del sitio) y el dominio
function LinkPhoto({ link, small, className }: { link: LinkItem; small?: boolean; className?: string }) {
  const [failed, setFailed] = React.useState(false)
  const site = siteOf(link.url)
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={-1}
      className={cn("relative flex flex-col items-center justify-center gap-box-xs overflow-hidden rounded-sm bg-raised", className)}
    >
      {link.thumbnail && !failed ? (
        <img src={link.thumbnail} alt="" draggable={false} onError={() => setFailed(true)} className="absolute inset-0 block size-full object-cover" />
      ) : (
        <>
          {site === "web" ? (
            <img src={`https://www.google.com/s2/favicons?domain=${domainOf(link.url)}&sz=128`} alt="" className={small ? "size-6" : "size-10"} />
          ) : (
            <SiteIcon url={link.url} className={small ? "size-6" : "size-9"} />
          )}
          {!small && <span className="max-w-full truncate px-box-xs text-2xs text-muted-foreground">{domainOf(link.url)}</span>}
        </>
      )}
    </a>
  )
}

function OpenButton({ url, className }: { url: string; className?: string }) {
  return (
    <Button asChild variant="card" size="icon-sm" className={className}>
      <a href={url} target="_blank" rel="noopener noreferrer" aria-label="Abrir link">
        <ExternalLink className="size-3.5" />
      </a>
    </Button>
  )
}

function Actions({ onEdit, onDelete, open }: { onEdit?: () => void; onDelete?: () => void; open?: string }) {
  if (!onEdit && !onDelete && !open) return null
  return (
    <div className="-my-1 -mr-1 flex shrink-0 items-center">
      {open && (
        <Button asChild variant="ghost" size="icon-sm" className="text-muted-foreground">
          <a href={open} target="_blank" rel="noopener noreferrer" aria-label="Abrir link">
            <ExternalLink className="size-3.5" />
          </a>
        </Button>
      )}
      {onEdit && (
        <Button variant="ghost" size="icon-sm" aria-label="Editar" className="text-muted-foreground" onClick={onEdit}>
          <Pencil className="size-3.5" />
        </Button>
      )}
      {onDelete && (
        <Button variant="ghost" size="icon-sm" aria-label="Borrar" className="text-destructive hover:text-destructive" onClick={onDelete}>
          <Trash2 className="size-3.5" />
        </Button>
      )}
    </div>
  )
}

function Title({ link }: { link: LinkItem }) {
  return (
    <div className="flex min-w-0 flex-1 items-center gap-1.5">
      <SiteIcon url={link.url} className="size-3.5 shrink-0" />
      <p className="truncate text-sm leading-tight font-medium">{link.title || domainOf(link.url)}</p>
    </div>
  )
}

// La categoría con la estrellita del color de la app
export function LinkCategory({ category, subcategory, inline }: { category?: string; subcategory?: string; inline?: boolean }) {
  if (!category) return null
  return (
    <div className={cn("flex min-w-0 text-xs leading-tight", inline ? "items-center gap-1" : "flex-col gap-0.5")}>
      <p className="flex min-w-0 items-center gap-1 font-medium">
        <span aria-hidden className="text-brand-text">✸</span>
        <span className="truncate">{category}</span>
      </p>
      {subcategory && <p className="truncate text-muted-foreground">{inline && "· "}{subcategory}</p>}
    </div>
  )
}

export function LinkCard({ link, onEdit, onDelete, className }: { link: LinkItem; onEdit?: () => void; onDelete?: () => void; className?: string }) {
  return (
    <div data-slot="link-card" className={cn("flex min-w-0 flex-col gap-2 rounded-box-s bg-tile p-box-s", className)}>
      <div className="relative">
        <LinkPhoto link={link} className="aspect-video w-full" />
        <OpenButton url={link.url} className="absolute top-box-xs right-box-xs" />
      </div>
      <div className="flex min-w-0 flex-col gap-box-xs">
        <div className="flex items-center gap-box-xs">
          <Title link={link} />
          <Actions onEdit={onEdit} onDelete={onDelete} />
        </div>
        {link.description && <p className="text-xs leading-snug text-muted-foreground">{link.description}</p>}
        <LinkCategory category={link.category} subcategory={link.subcategory} />
      </div>
    </div>
  )
}

export function LinkRow({ link, onEdit, onDelete, className }: { link: LinkItem; onEdit?: () => void; onDelete?: () => void; className?: string }) {
  return (
    <div data-slot="link-row" className={cn("flex items-stretch gap-3 rounded-box-s bg-tile p-box-s", className)}>
      <LinkPhoto link={link} small className="size-16 shrink-0" />
      <div className="flex min-w-0 flex-1 flex-col justify-between gap-box-2xs">
        <div className="flex items-center gap-box-xs">
          <Title link={link} />
          <Actions onEdit={onEdit} onDelete={onDelete} open={link.url} />
        </div>
        {link.description && <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">{link.description}</p>}
        <LinkCategory category={link.category} subcategory={link.subcategory} inline />
      </div>
    </div>
  )
}
