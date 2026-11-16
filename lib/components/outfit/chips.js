import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { X } from "lucide-react";
import { OUTFIT as C } from "./palette.js";
// Filtro con chips en una fila que se desliza (ej: marcas). El elegido va en negro.
export function FilterChips({ options, value, onChange, transparent = false, }) {
    return (_jsx("div", { className: "flex gap-2 overflow-x-auto", style: { scrollbarWidth: "none" }, children: options.map((o) => {
            const on = o.value === value;
            return (_jsx("button", { type: "button", onClick: () => onChange(o.value), className: "flex-shrink-0 rounded-full px-3 py-1.5 text-xs font-medium", style: {
                    background: on ? C.ink : transparent ? "transparent" : C.white,
                    color: on ? C.white : C.text,
                    border: "1px solid " + (on ? C.ink : C.border),
                }, children: o.label }, String(o.value ?? "todo")));
        }) }));
}
// Chip con borde negro y una cruz para borrarlo (marcas, modelos, tipos guardados)
export function ChipTag({ label, selected, onSelect, onDelete, }) {
    return (_jsxs("div", { className: "flex flex-shrink-0 items-center gap-1 rounded-full text-xs font-medium", style: {
            background: selected ? C.ink : C.white,
            color: selected ? C.white : C.ink,
            border: "1px solid " + C.ink,
            padding: "6px 8px 6px 10px",
        }, children: [_jsx("button", { type: "button", onClick: onSelect, children: label }), onDelete && (_jsx("button", { type: "button", "aria-label": "Borrar " + label, onClick: (e) => { e.stopPropagation(); onDelete(); }, style: { display: "flex", alignItems: "center", opacity: 0.5 }, children: _jsx(X, { style: { width: 10, height: 10 } }) }))] }));
}
