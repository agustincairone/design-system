import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { Star } from "lucide-react";
import { cn } from "../../lib/utils.js";
// Estrellas (diseño de wine con los colores del sistema): llenas del color de la app,
// vacías sólo con el borde gris.
// Para mostrar un puntaje: 14px (en las fichas) o 16px (en el detalle)
function Stars({ value, max = 5, size = "sm", className }) {
    return (_jsx("span", { role: "img", "aria-label": `${value} de ${max} estrellas`, className: cn("inline-flex shrink-0 gap-0.5", className), children: Array.from({ length: max }, (_, i) => (_jsx(Star, { "aria-hidden": true, strokeWidth: i < value ? 2 : 1.5, className: cn(size === "sm" ? "size-3.5" : "size-4", i < value ? "fill-current text-brand-text" : "text-muted-foreground") }, i))) }));
}
// Para puntuar: estrellas de 28px con 6px entre una y otra; al pasar el mouse se ve cómo quedaría
function StarRating({ value, onChange, max = 5, className }) {
    const [hover, setHover] = React.useState(0);
    const shown = hover || value;
    return (_jsx("div", { role: "radiogroup", "aria-label": "Puntaje", className: cn("flex", className), onMouseLeave: () => setHover(0), children: Array.from({ length: max }, (_, i) => {
            const n = i + 1;
            return (_jsx("button", { type: "button", role: "radio", "aria-checked": value === n, "aria-label": n === 1 ? "1 estrella" : `${n} estrellas`, onMouseEnter: () => setHover(n), onClick: () => onChange(n), className: "rounded-full px-[3px] py-1 outline-none focus-visible:ring-3 focus-visible:ring-ring/50", children: _jsx(Star, { strokeWidth: 1.5, className: cn("size-7 transition-colors", n <= shown ? "fill-current text-brand-text" : "text-muted-foreground") }) }, n));
        }) }));
}
export { Stars, StarRating };
