import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "../../lib/utils.js";
// Lista con ícono (de gesture): cada fila lleva a la izquierda un ícono (del color de la app) o un emoji,
// y a la derecha el texto. Con `title`, el título va arriba y el texto abajo en gris. Sirve para enumerar
// ventajas con un tilde (el inicio de gesture) o para explicar pasos (la ayuda de gesture).
export function IconList({ items, className }) {
    return (_jsx("ul", { "data-slot": "icon-list", className: cn("flex flex-col gap-box-m", className), children: items.map((item, i) => (_jsxs("li", { className: "flex gap-box-s text-sm", children: [_jsx("span", { "aria-hidden": true, className: "flex h-5 w-6 shrink-0 items-center justify-center text-xl leading-none text-brand [&_svg]:size-5", children: item.icon }), _jsxs("div", { className: "flex min-w-0 flex-col gap-1", children: [item.title && _jsx("span", { className: "font-medium", children: item.title }), _jsx("span", { className: cn(item.title && "text-muted-foreground"), children: item.text })] })] }, i))) }));
}
