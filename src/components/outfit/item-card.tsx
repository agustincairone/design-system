import * as React from "react"
import { Archive, ImageIcon } from "lucide-react"
import { OUTFIT as C } from "./palette"

export type OutfitItem = {
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

// Puntitos de color superpuestos (hasta 3 colores de una prenda)
export function ColorDots({ colors, size = 14 }: { colors?: { hex: string }[]; size?: number }) {
  if (!colors || colors.length === 0) return null
  const overlap = Math.round(size * 0.45)
  const totalWidth = size + (colors.length - 1) * (size - overlap)
  return (
    <span style={{ display: "inline-flex", position: "relative", width: totalWidth, height: size, flexShrink: 0 }}>
      {colors.map((c, i) => (
        <span
          key={i}
          style={{
            position: "absolute", left: i * (size - overlap), width: size, height: size, borderRadius: "50%",
            background: c.hex, boxShadow: c.hex === "#FFFFFF" ? `inset 0 0 0 1px ${C.border}` : undefined, zIndex: i,
          }}
        />
      ))}
    </span>
  )
}

function photoStyle(item: OutfitItem, framed = true): React.CSSProperties {
  return {
    position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block",
    ...(framed ? { transform: `scale(${item.imageZoom || 1}) translate(${item.imagePanX || 0}px, ${item.imagePanY || 0}px)`, transformOrigin: "center center" } : {}),
  }
}

function ArchivedBadge({ size = 18 }: { size?: number }) {
  return (
    <span style={{ position: "absolute", top: 4, right: 4, width: size, height: size, borderRadius: "50%", background: C.white, border: "1px solid " + C.light, boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1 }}>
      <Archive style={{ width: size * 0.6, height: size * 0.6, color: C.muted }} />
    </span>
  )
}

const line = (color: string, size = 11): React.CSSProperties => ({ fontSize: size, fontWeight: 500, color, lineHeight: "14px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "100%" })

// Ficha de prenda de las grillas de 3 columnas. `selected` = borde negro + puntito.
export function ItemCard({ item, selected, onClick, style }: { item: OutfitItem; selected?: boolean; onClick?: () => void; style?: React.CSSProperties }) {
  return (
    <div
      onClick={onClick}
      style={{ background: C.bg, border: "1.5px solid " + (selected ? C.ink : "transparent"), borderRadius: 12, padding: 8, textAlign: "center", minWidth: 0, cursor: onClick ? "pointer" : undefined, ...style }}
    >
      <div style={{ width: "100%", aspectRatio: "1/1", borderRadius: 8, background: C.soft, marginBottom: 16, position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {item.imageUrl ? <img src={item.imageUrl} alt="" style={photoStyle(item)} /> : <ImageIcon style={{ width: 24, height: 24, color: C.muted }} />}
        {item.archived && <ArchivedBadge />}
        {selected && <span style={{ position: "absolute", top: 4, right: 4, width: 6, height: 6, borderRadius: "50%", background: C.ink, zIndex: 1 }} />}
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <div style={{ display: "flex", justifyContent: "center" }}><ColorDots colors={item.colors} size={11} /></div>
        {item.marca && <p style={line(C.ink)}>{item.marca}</p>}
        {item.modelo && <p style={line(C.subtle)}>{item.modelo}</p>}
        {item.tipo && <p style={line(C.muted)}>{item.tipo}</p>}
      </div>
    </div>
  )
}

// Prenda chiquita de la tabla del historial (foto 60px)
export function ItemCardSmall({ item }: { item: OutfitItem }) {
  return (
    <div className="flex flex-col items-center">
      <div style={{ width: 60, height: 60, borderRadius: 6, background: C.soft, overflow: "hidden", position: "relative", flexShrink: 0, marginBottom: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {item.imageUrl ? <img src={item.imageUrl} alt="" style={photoStyle(item)} /> : <ImageIcon style={{ width: 20, height: 20, color: C.muted }} />}
        {item.archived && <ArchivedBadge size={16} />}
      </div>
      <div className="flex flex-col items-center" style={{ gap: 3 }}>
        <div className="flex justify-center" style={{ height: 10 }}><ColorDots colors={item.colors} size={10} /></div>
        {item.marca && <span style={{ color: C.ink, fontSize: 10, lineHeight: "14px", fontWeight: 500 }}>{item.marca}</span>}
        {item.modelo && <span style={{ color: C.subtle, fontSize: 10, fontWeight: 500, lineHeight: "14px" }}>{item.modelo}</span>}
        {item.tipo && <span style={{ color: C.muted, fontSize: 10, fontWeight: 500, lineHeight: "14px" }}>{item.tipo}</span>}
      </div>
    </div>
  )
}

// Fila de lista con foto 64px a la izquierda y algo a la derecha (estadísticas, archivadas)
export function ItemRow({ item, right, gray }: { item: OutfitItem; right?: React.ReactNode; gray?: boolean }) {
  return (
    <div className="flex rounded-[12px]" style={{ background: C.bg, gap: 8, padding: 8, alignItems: "stretch" }}>
      <div style={{ width: 64, height: 64, borderRadius: 8, background: C.soft, flexShrink: 0, overflow: "hidden", position: "relative" }}>
        {item.imageUrl && <img src={item.imageUrl} alt="" style={{ ...photoStyle(item, false), filter: gray ? "grayscale(100%)" : undefined }} />}
      </div>
      <div className="min-w-0 flex-1" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div><ColorDots colors={item.colors} size={11} /></div>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {item.marca && <p style={{ ...line(item.archived ? C.muted : C.ink, 12), lineHeight: "15px" }}>{item.marca}</p>}
          <p style={{ ...line(C.muted, 12), lineHeight: "15px" }}>
            {item.modelo && <span style={{ color: C.subtle }}>{item.modelo}</span>}
            {item.modelo && item.tipo && <span> · </span>}
            {item.tipo && <span>{item.tipo}</span>}
          </p>
        </div>
      </div>
      {right && <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "flex-end", justifyContent: "space-between" }}>{right}</div>}
    </div>
  )
}
