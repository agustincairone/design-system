import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "../../lib/utils.js";
// Pantalla vacía o de "listo": ícono en un círculo gris de 64px, título de 18px (como el de caja, 2px más chico) y texto gris.
export function EmptyState({ icon, title, text, children, className, }) {
    return (_jsxs("div", { "data-slot": "empty-state", className: cn("flex flex-col items-center gap-4 text-center", className), children: [_jsx("div", { className: "flex size-16 items-center justify-center rounded-full bg-inset [&_svg]:size-8", children: icon }), _jsxs("div", { children: [_jsx("p", { className: "mb-1 text-lg leading-[1.2] font-semibold tracking-[-0.03em]", children: title }), text && _jsx("p", { className: "text-sm text-muted-foreground", children: text })] }), children] }));
}
