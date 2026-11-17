import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Archive, ImageIcon } from "lucide-react";
import { cn } from "../../lib/utils.js";
// Puntitos de color superpuestos. Sin borde, salvo el blanco (y el negro en modo oscuro): borde de 1px gris (el de los divisores)
const isWhite = (hex) => /^#(fff|ffffff)$/i.test(hex);
// negros y casi negros (#1A1A1A, #0D2137…) se pierden sobre el fondo oscuro
const isBlack = (hex) => /^#(000|000000|1a1a1a|0d2137)$/i.test(hex);
export function ColorDots({ colors, size = 14 }) {
    if (!colors?.length)
        return null;
    const step = size - Math.round(size * 0.45);
    return (_jsx("span", { className: "relative inline-flex shrink-0", style: { width: size + (colors.length - 1) * step, height: size }, children: colors.map((c, i) => (_jsx("span", { className: "absolute rounded-full" + (isWhite(c.hex) ? " border border-border" : isBlack(c.hex) ? " dark:border dark:border-border" : ""), style: { left: i * step, width: size, height: size, background: c.hex, zIndex: i } }, i))) }));
}
export function ItemPhoto({ item, className, gray, framed = true, selected }) {
    return (_jsxs("div", { className: cn("relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-sm bg-raised", className), children: [item.imageUrl ? (_jsx("img", { src: item.imageUrl, alt: "", draggable: false, className: cn("absolute inset-0 block size-full object-cover", gray && "grayscale"), style: framed ? { transform: `scale(${item.imageZoom || 1}) translate(${item.imagePanX || 0}px, ${item.imagePanY || 0}px)`, transformOrigin: "center center" } : undefined })) : (_jsx(ImageIcon, { className: "size-5 text-muted-foreground" })), item.archived && (_jsx("span", { className: "absolute top-1 right-1 flex size-5 items-center justify-center rounded-full bg-card", children: _jsx(Archive, { className: "size-3 text-muted-foreground" }) })), selected && _jsx("span", { className: "dot absolute top-1.5 right-1.5 bg-primary dark:bg-foreground" })] }));
}
function ItemText({ item, className }) {
    return (_jsxs("div", { className: cn("flex min-w-0 flex-col items-center gap-0.5 text-center text-[11px] leading-[14px] font-medium", className), children: [item.marca && _jsx("p", { className: "max-w-full truncate text-foreground", children: item.marca }), item.modelo && _jsx("p", { className: "max-w-full truncate text-muted-foreground", children: item.modelo }), item.tipo && _jsx("p", { className: "max-w-full truncate text-muted-foreground/70", children: item.tipo })] }));
}
// Ficha de las grillas de 3 columnas
export function ItemCard({ item, selected, onClick, className, style }) {
    const Tag = onClick ? "button" : "div";
    return (_jsxs(Tag, { type: onClick ? "button" : undefined, onClick: onClick, style: style, className: cn("flex min-w-0 flex-col items-center gap-2 rounded-box-s bg-tile p-box-s outline-none transition-shadow", onClick && "cursor-pointer hover:ring-[1.5px] hover:ring-brand focus-visible:ring-[1.5px] focus-visible:ring-brand", selected && "ring-[1.5px] ring-primary hover:ring-primary dark:ring-foreground dark:hover:ring-foreground", className), children: [_jsx(ItemPhoto, { item: item, selected: selected }), _jsx(ColorDots, { colors: item.colors, size: 11 }), _jsx(ItemText, { item: item })] }));
}
// Ficha chiquita (ej: tabla del historial), foto de 60px
export function ItemCardSmall({ item }) {
    return (_jsxs("div", { className: "flex flex-col items-center gap-1.5", children: [_jsx(ItemPhoto, { item: item, className: "size-[60px] bg-tile" }), _jsx(ColorDots, { colors: item.colors, size: 10 }), _jsx(ItemText, { item: item, className: "text-[10px]" })] }));
}
// Fila horizontal: foto de 64px, texto y algo a la derecha (ej: cantidad de usos)
export function ItemRow({ item, right, gray }) {
    return (_jsxs("div", { className: "flex items-stretch gap-3 rounded-box-s bg-tile p-box-s", children: [_jsx(ItemPhoto, { item: item, gray: gray, framed: false, className: "size-16 shrink-0" }), _jsxs("div", { className: "flex min-w-0 flex-1 flex-col justify-between", children: [_jsx(ColorDots, { colors: item.colors, size: 11 }), _jsxs("div", { className: "flex flex-col gap-0.5", children: [item.marca && _jsx("p", { className: cn("truncate text-xs font-medium", item.archived && "text-muted-foreground"), children: item.marca }), _jsx("p", { className: "truncate text-xs font-medium text-muted-foreground", children: [item.modelo, item.tipo].filter(Boolean).join(" · ") })] })] }), right && _jsx("div", { className: "flex shrink-0 flex-col items-end justify-between", children: right })] }));
}
