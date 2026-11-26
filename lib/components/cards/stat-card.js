import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { Info } from "lucide-react";
import { cn } from "../../lib/utils.js";
// Ficha de un dato (de no-coke): el número con su unidad, qué es y una línea gris abajo.
// Con `onInfo`, toda la ficha se toca para abrir la explicación y lleva una (i) arriba a la derecha.
// Van de a dos por fila: grid-cols-2 gap-box-gap.
export function StatCard({ value, unit, title, text, onInfo, className, }) {
    const body = (_jsxs(_Fragment, { children: [_jsxs("div", { className: "flex items-start justify-between gap-box-xs", children: [_jsxs("span", { className: "flex min-w-0 items-baseline gap-1", children: [_jsx("span", { className: "live-number truncate text-2xl font-semibold", children: value }), unit && _jsx("span", { className: "text-xs text-muted-foreground", children: unit })] }), onInfo && _jsx(Info, { "aria-hidden": true, className: "mt-1 size-4 shrink-0 text-muted-foreground" })] }), _jsx("div", { className: "text-xs font-medium", children: title }), text && _jsx("div", { className: "text-xs text-muted-foreground", children: text })] }));
    const box = "flex flex-col gap-1 rounded-box-l bg-card p-box-m text-left";
    return onInfo ? (_jsx("button", { type: "button", "data-slot": "stat-card", onClick: onInfo, className: cn(box, "transition-colors hover:bg-card-hover", className), children: body })) : (_jsx("div", { "data-slot": "stat-card", className: cn(box, className), children: body }));
}
