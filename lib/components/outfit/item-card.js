import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Archive, ImageIcon } from "lucide-react";
import { OUTFIT as C } from "./palette.js";
// Puntitos de color superpuestos (hasta 3 colores de una prenda)
export function ColorDots({ colors, size = 14 }) {
    if (!colors || colors.length === 0)
        return null;
    const overlap = Math.round(size * 0.45);
    const totalWidth = size + (colors.length - 1) * (size - overlap);
    return (_jsx("span", { style: { display: "inline-flex", position: "relative", width: totalWidth, height: size, flexShrink: 0 }, children: colors.map((c, i) => (_jsx("span", { style: {
                position: "absolute", left: i * (size - overlap), width: size, height: size, borderRadius: "50%",
                background: c.hex, boxShadow: c.hex === "#FFFFFF" ? `inset 0 0 0 1px ${C.border}` : undefined, zIndex: i,
            } }, i))) }));
}
function photoStyle(item, framed = true) {
    return {
        position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block",
        ...(framed ? { transform: `scale(${item.imageZoom || 1}) translate(${item.imagePanX || 0}px, ${item.imagePanY || 0}px)`, transformOrigin: "center center" } : {}),
    };
}
function ArchivedBadge({ size = 18 }) {
    return (_jsx("span", { style: { position: "absolute", top: 4, right: 4, width: size, height: size, borderRadius: "50%", background: C.white, border: "1px solid " + C.light, boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1 }, children: _jsx(Archive, { style: { width: size * 0.6, height: size * 0.6, color: C.muted } }) }));
}
const line = (color, size = 11) => ({ fontSize: size, fontWeight: 500, color, lineHeight: "14px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "100%" });
// Ficha de prenda de las grillas de 3 columnas. `selected` = borde negro + puntito.
export function ItemCard({ item, selected, onClick, style }) {
    return (_jsxs("div", { onClick: onClick, style: { background: C.bg, border: "1.5px solid " + (selected ? C.ink : "transparent"), borderRadius: 12, padding: 8, textAlign: "center", minWidth: 0, cursor: onClick ? "pointer" : undefined, ...style }, children: [_jsxs("div", { style: { width: "100%", aspectRatio: "1/1", borderRadius: 8, background: C.soft, marginBottom: 16, position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }, children: [item.imageUrl ? _jsx("img", { src: item.imageUrl, alt: "", style: photoStyle(item) }) : _jsx(ImageIcon, { style: { width: 24, height: 24, color: C.muted } }), item.archived && _jsx(ArchivedBadge, {}), selected && _jsx("span", { style: { position: "absolute", top: 4, right: 4, width: 6, height: 6, borderRadius: "50%", background: C.ink, zIndex: 1 } })] }), _jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }, children: [_jsx("div", { style: { display: "flex", justifyContent: "center" }, children: _jsx(ColorDots, { colors: item.colors, size: 11 }) }), item.marca && _jsx("p", { style: line(C.ink), children: item.marca }), item.modelo && _jsx("p", { style: line(C.subtle), children: item.modelo }), item.tipo && _jsx("p", { style: line(C.muted), children: item.tipo })] })] }));
}
// Prenda chiquita de la tabla del historial (foto 60px)
export function ItemCardSmall({ item }) {
    return (_jsxs("div", { className: "flex flex-col items-center", children: [_jsxs("div", { style: { width: 60, height: 60, borderRadius: 6, background: C.soft, overflow: "hidden", position: "relative", flexShrink: 0, marginBottom: 6, display: "flex", alignItems: "center", justifyContent: "center" }, children: [item.imageUrl ? _jsx("img", { src: item.imageUrl, alt: "", style: photoStyle(item) }) : _jsx(ImageIcon, { style: { width: 20, height: 20, color: C.muted } }), item.archived && _jsx(ArchivedBadge, { size: 16 })] }), _jsxs("div", { className: "flex flex-col items-center", style: { gap: 3 }, children: [_jsx("div", { className: "flex justify-center", style: { height: 10 }, children: _jsx(ColorDots, { colors: item.colors, size: 10 }) }), item.marca && _jsx("span", { style: { color: C.ink, fontSize: 10, lineHeight: "14px", fontWeight: 500 }, children: item.marca }), item.modelo && _jsx("span", { style: { color: C.subtle, fontSize: 10, fontWeight: 500, lineHeight: "14px" }, children: item.modelo }), item.tipo && _jsx("span", { style: { color: C.muted, fontSize: 10, fontWeight: 500, lineHeight: "14px" }, children: item.tipo })] })] }));
}
// Fila de lista con foto 64px a la izquierda y algo a la derecha (estadísticas, archivadas)
export function ItemRow({ item, right, gray }) {
    return (_jsxs("div", { className: "flex rounded-[12px]", style: { background: C.bg, gap: 8, padding: 8, alignItems: "stretch" }, children: [_jsx("div", { style: { width: 64, height: 64, borderRadius: 8, background: C.soft, flexShrink: 0, overflow: "hidden", position: "relative" }, children: item.imageUrl && _jsx("img", { src: item.imageUrl, alt: "", style: { ...photoStyle(item, false), filter: gray ? "grayscale(100%)" : undefined } }) }), _jsxs("div", { className: "min-w-0 flex-1", style: { display: "flex", flexDirection: "column", justifyContent: "space-between" }, children: [_jsx("div", { children: _jsx(ColorDots, { colors: item.colors, size: 11 }) }), _jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 2 }, children: [item.marca && _jsx("p", { style: { ...line(item.archived ? C.muted : C.ink, 12), lineHeight: "15px" }, children: item.marca }), _jsxs("p", { style: { ...line(C.muted, 12), lineHeight: "15px" }, children: [item.modelo && _jsx("span", { style: { color: C.subtle }, children: item.modelo }), item.modelo && item.tipo && _jsx("span", { children: " \u00B7 " }), item.tipo && _jsx("span", { children: item.tipo })] })] })] }), right && _jsx("div", { style: { flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "flex-end", justifyContent: "space-between" }, children: right })] }));
}
