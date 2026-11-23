import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../../lib/utils.js";
// Fila que se abre: va adentro de una caja, una abajo de la otra, con una línea entre fila y fila (el mismo
// estilo que la lista que se edita). Al tocarla, lo de adentro aparece abajo, corrido 16px a la derecha
// por cada nivel; el tercer nivel va en gris. Los montos de la derecha quedan todos en una misma columna
// (las filas que no se abren guardan el lugar de la flecha).
// Sin `children` la fila no se abre y no muestra la flecha.
// En qué nivel está la fila (0 = la de afuera): lo sabe sola por estar adentro de otra
const Level = React.createContext(0);
const INDENT = [
    "pl-box-m",
    "pl-[calc(var(--spacing-box-m)*2)]",
    "pl-[calc(var(--spacing-box-m)*3)]",
    "pl-[calc(var(--spacing-box-m)*4)]",
];
const indent = (level) => INDENT[Math.min(level, INDENT.length - 1)];
const ROW = "flex w-full items-center gap-box-s py-box-s pr-box-m text-left text-sm";
function RowText({ level, title, sub }) {
    return (_jsxs("div", { className: "min-w-0 flex-1", children: [_jsx("div", { className: cn("truncate", level === 0 && "font-medium", level >= 2 && "text-muted-foreground"), children: title }), sub && _jsx("div", { className: "mt-0.5 text-xs text-muted-foreground", children: sub })] }));
}
export function ExpandRow({ title, sub, right, children, defaultOpen = false, className, }) {
    const level = React.useContext(Level);
    const [open, setOpen] = React.useState(defaultOpen);
    const canOpen = children != null && children !== false;
    return (_jsxs("div", { "data-slot": "expand-row", className: cn("border-b border-border last:border-b-0", className), children: [_jsxs("button", { type: "button", "aria-expanded": canOpen ? open : undefined, disabled: !canOpen, onClick: () => setOpen((o) => !o), className: cn(ROW, indent(level), "outline-none focus-visible:bg-secondary disabled:cursor-default"), children: [_jsx(RowText, { level: level, title: title, sub: sub }), right && _jsx("div", { className: "shrink-0 text-right", children: right }), canOpen ? (_jsx(ChevronDown, { className: cn("size-4 shrink-0 text-muted-foreground transition-transform duration-200", open && "rotate-180") })) : (_jsx("span", { className: "w-4 shrink-0" }))] }), canOpen && open && (_jsx("div", { "data-slot": "expand-row-detail", className: "border-t border-border", children: _jsx(Level.Provider, { value: level + 1, children: children }) }))] }));
}
// Una línea simple de adentro: texto a la izquierda y monto a la derecha.
export function ExpandRowItem({ label, sub, value }) {
    const level = React.useContext(Level);
    return (_jsxs("div", { "data-slot": "expand-row-item", className: cn(ROW, indent(level), "border-b border-border last:border-b-0"), children: [_jsx(RowText, { level: level, title: label, sub: sub }), _jsx("div", { className: "shrink-0 font-medium text-muted-foreground", children: value }), _jsx("span", { className: "w-4 shrink-0" })] }));
}
