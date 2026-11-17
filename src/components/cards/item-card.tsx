import * as React from "react"
import { Archive, ImageIcon } from "lucide-react"

import { cn } from "@/lib/utils"

// Fichas de algo con foto (ej: una prenda): foto cuadrada, puntitos de color y hasta 3 líneas de texto.
// Fondo `tile` (un gris más claro que el de las cajas). Elegida = borde de 1,5px del color principal
// (blanco en modo oscuro) + puntito arriba a la derecha de la foto.

export type Item = {
  marca?: string
  modelo?: string
  tipo?: string
  imageUrl?: string
  imageZoom?: number
  imagePanX?: number
  imagePanY?: number
  archived?: boolean
  colors?: { name?: string; hex: string }[]
}

// Puntitos de color superpuestos. Sin borde, salvo el blanco (y el negro en modo oscuro): borde de 1px gris (el de los divisores)
const isWhite = (hex: string) => /^#(fff|ffffff)$/i.test(hex)
// negros y casi negros (#1A1A1A, #0D2137…) se pierden sobre el fondo oscuro
const isBlack = (hex: string) => /^#(000|000000|1a1a1a|0d2137)$/i.test(hex)

export function ColorDots({ colors, size = 14 }: { colors?: { hex: string }[]; size?: number }) {
  if (!colors?.length) return null
  const step = size - Math.round(size * 0.45)
  return (
    <span className="relative inline-flex shrink-0" style={{ width: size + (colors.length - 1) * step, height: size }}>
      {colors.map((c, i) => (
        <span key={i} className={"absolute rounded-full" + (isWhite(c.hex) ? " border border-border" : isBlack(c.hex) ? " dark:border dark:border-border" : "")} style={{ left: i * step, width: size, height: size, background: c.hex, zIndex: i }} />
      ))}
    </span>
  )
}

export function ItemPhoto({ item, className, gray, framed = true, selected }: { item: Item; className?: string; gray?: boolean; framed?: boolean; selected?: boolean }) {
  return (
    <div className={cn("relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-sm bg-card", className)}>
      {item.imageUrl ? (
        <img
          src={item.imageUrl}
          alt=""
          draggable={false}
          className={cn("absolute inset-0 block size-full object-cover", gray && "grayscale")}
          style={framed ? { transform: `scale(${item.imageZoom || 1}) translate(${item.imagePanX || 0}px, ${item.imagePanY || 0}px)`, transformOrigin: "center center" } : undefined}
        />
      ) : (
        <ImageIcon className="size-5 text-muted-foreground" />
      )}
      {item.archived && (
        <span className="absolute top-1 right-1 flex size-5 items-center justify-center rounded-full bg-card">
          <Archive className="size-3 text-muted-foreground" />
        </span>
      )}
      {selected && <span className="dot absolute top-1.5 right-1.5 bg-primary dark:bg-foreground" />}
    </div>
  )
}

function ItemText({ item, className }: { item: Item; className?: string }) {
  return (
    <div className={cn("flex min-w-0 flex-col items-center gap-0.5 text-center text-[11px] leading-[14px] font-medium", className)}>
      {item.marca && <p className="max-w-full truncate text-foreground">{item.marca}</p>}
      {item.modelo && <p className="max-w-full truncate text-muted-foreground">{item.modelo}</p>}
      {item.tipo && <p className="max-w-full truncate text-muted-foreground/70">{item.tipo}</p>}
    </div>
  )
}

// Ficha de las grillas de 3 columnas
export function ItemCard({ item, selected, onClick, className, style }: { item: Item; selected?: boolean; onClick?: () => void; className?: string; style?: React.CSSProperties }) {
  const Tag = onClick ? "button" : "div"
  return (
    <Tag
      type={onClick ? "button" : undefined}
      onClick={onClick}
      style={style}
      className={cn(
        "flex min-w-0 flex-col items-center gap-2 rounded-box-s bg-tile p-box-s outline-none transition-shadow",
        onClick && "cursor-pointer hover:ring-[1.5px] hover:ring-brand focus-visible:ring-[1.5px] focus-visible:ring-brand",
        selected && "ring-[1.5px] ring-primary hover:ring-primary dark:ring-foreground dark:hover:ring-foreground",
        className
      )}
    >
      <ItemPhoto item={item} selected={selected} />
      <ColorDots colors={item.colors} size={11} />
      <ItemText item={item} />
    </Tag>
  )
}

// Ficha chiquita (ej: tabla del historial), foto de 60px
export function ItemCardSmall({ item }: { item: Item }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <ItemPhoto item={item} className="size-[60px] bg-tile" />
      <ColorDots colors={item.colors} size={10} />
      <ItemText item={item} className="text-[10px]" />
    </div>
  )
}

// Fila horizontal: foto de 64px, texto y algo a la derecha (ej: cantidad de usos)
export function ItemRow({ item, right, gray }: { item: Item; right?: React.ReactNode; gray?: boolean }) {
  return (
    <div className="flex items-stretch gap-3 rounded-box-s bg-tile p-box-s">
      <ItemPhoto item={item} gray={gray} framed={false} className="size-16 shrink-0" />
      <div className="flex min-w-0 flex-1 flex-col justify-between">
        <ColorDots colors={item.colors} size={11} />
        <div className="flex flex-col gap-0.5">
          {item.marca && <p className={cn("truncate text-xs font-medium", item.archived && "text-muted-foreground")}>{item.marca}</p>}
          <p className="truncate text-xs font-medium text-muted-foreground">{[item.modelo, item.tipo].filter(Boolean).join(" · ")}</p>
        </div>
      </div>
      {right && <div className="flex shrink-0 flex-col items-end justify-between">{right}</div>}
    </div>
  )
}
