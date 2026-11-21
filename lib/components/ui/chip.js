import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { X } from "lucide-react";
import { cn } from "../../lib/utils.js";
// Chip: opción chiquita que se prende y se apaga (filtros, valores guardados).
// Apagado = borde gris; elegido = relleno del color principal.
// Con `icon` lleva un ícono adelante; con `onRemove`, una cruz (del mismo color que el texto) para borrarlo.
// Relleno de 8px a los costados. Varios chips van siempre adentro de un ChipGroup (4px entre uno y otro).
function Chip({ selected = false, icon: Icon, onRemove, removeLabel = "Borrar", className, children, disabled, ...props }) {
    return (_jsxs("button", { type: "button", "data-slot": "chip", "aria-pressed": selected, disabled: disabled, className: cn("inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full border px-box-xs text-xs font-medium whitespace-nowrap transition-colors outline-none select-none focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50", selected
            ? "border-transparent bg-primary text-primary-foreground hover:bg-brand-hover"
            : onRemove
                ? "border-input bg-transparent text-foreground hover:bg-card-hover dark:border-input dark:in-data-[variant=inset]:border-raised" // con cruz: al pasar el mouse sólo se pinta el fondo de gris
                : "border-input bg-transparent text-foreground hover:border-brand hover:text-brand dark:border-input dark:in-data-[variant=inset]:border-raised", // adentro de una caja gris, en oscuro, el borde sube un tono (si no, se pierde)
        className), ...props, children: [Icon && _jsx(Icon, { className: "size-3.5" }), children, onRemove && (_jsx("span", { role: "button", "aria-label": removeLabel, onClick: (e) => {
                    e.stopPropagation();
                    onRemove();
                }, className: "-mr-0.5 flex size-4 items-center justify-center rounded-full", children: _jsx(X, { className: "size-3" }) }))] }));
}
// Fila de chips: siempre a 4px uno del otro. Con `scroll`, en una sola línea que se desliza de costado.
function ChipGroup({ scroll = false, className, ...props }) {
    return (_jsx("div", { "data-slot": "chip-group", className: cn("flex gap-box-2xs", scroll ? "overflow-x-auto [scrollbar-width:none]" : "flex-wrap", className), ...props }));
}
// Dato con puntaje (ej: "🍒 Fruta | 4/5"): el nombre en gris, una rayita y el número del color de la app.
// Mismo alto y borde que los chips, pero no se toca. Varios van en un ChipGroup (`scroll` = una sola línea).
function ScoreChip({ label, value, max, className }) {
    return (_jsxs("span", { "data-slot": "score-chip", className: cn("inline-flex h-8 shrink-0 items-stretch overflow-hidden rounded-full border border-input text-xs whitespace-nowrap dark:in-data-[variant=inset]:border-raised", className), children: [_jsx("span", { className: "flex items-center pr-box-xs pl-box-s text-muted-foreground", children: label }), _jsx("span", { "aria-hidden": true, className: "w-px bg-input dark:in-data-[variant=inset]:bg-raised" }), _jsxs("span", { className: "flex items-center pr-box-s pl-box-xs font-medium text-brand-text", children: [value, max != null && _jsxs("span", { className: "font-normal text-muted-foreground", children: ["/", max] })] })] }));
}
export { Chip, ChipGroup, ScoreChip };
