import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "../../lib/utils.js";
// Ficha cuadrada con ícono arriba (16px, color de la app) y nombre abajo.
// Para elegir algo de un catálogo (ej: "agregar un sonido"). Llena su columna:
// ponela en una grilla (grid-cols-3 gap-box-gap) y se vuelve cuadrada sola.
// Al pasar el mouse se pinta del color de la app y el ícono queda blanco.
export function IconTile({ icon: Icon, label, className, ...props }) {
    return (_jsxs("button", { type: "button", "data-slot": "icon-tile", className: cn("group/tile flex aspect-square min-w-0 cursor-pointer flex-col items-start justify-between rounded-box-s bg-secondary p-box-s text-left text-sm font-medium text-foreground transition-colors outline-none", "hover:bg-brand hover:text-brand-foreground active:bg-brand-strong focus-visible:ring-2 focus-visible:ring-brand", "in-data-[variant=inset]:bg-card in-data-[variant=inset]:hover:bg-brand", className), ...props, children: [_jsx(Icon, { className: "size-4 text-brand group-hover/tile:text-brand-foreground group-active/tile:text-brand-foreground" }), _jsx("span", { children: label })] }));
}
