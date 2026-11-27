import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { EmptyState } from "./empty-state.js";
import { cn } from "../../lib/utils.js";
// Vista previa de un archivo (de gesture), en una caja: arriba el nombre; en el medio la primera página
// (`preview`, ej: un canvas) sobre gris, en un recuadro horizontal; abajo los datos (páginas, peso…) en
// columnas, con el nombre en gris arriba y el valor abajo; y al final los botones (`actions`, ej: Cancelar y
// Presentar), que se reparten el ancho. Sin `name`, la misma caja muestra el estado vacío (`empty`).
// Va al lado de la caja para subir un archivo (DropZone): md:grid-cols-2 gap-box-gap.
export function FilePreview({ name, preview, facts = [], actions, empty, className, }) {
    if (!name) {
        return (_jsx("div", { "data-slot": "file-preview", className: cn("flex flex-col items-center justify-center rounded-box-l bg-card", className), children: empty && _jsx(EmptyState, { icon: empty.icon, title: empty.title, text: empty.text }) }));
    }
    return (_jsxs("div", { "data-slot": "file-preview", className: cn("flex flex-col gap-box-m rounded-box-l bg-card p-box-l", className), children: [_jsx("p", { className: "truncate text-lg font-medium", children: name }), _jsx("div", { className: "flex aspect-video items-center justify-center overflow-hidden rounded-box-s bg-inset p-box-s", children: preview }), facts.length > 0 && (_jsx("dl", { className: "grid grid-cols-2 gap-box-s sm:grid-cols-4", children: facts.map((f, i) => (_jsxs("div", { className: "flex min-w-0 flex-col gap-1", children: [_jsx("dt", { className: "text-xs text-muted-foreground", children: f.label }), _jsx("dd", { className: "truncate text-sm font-medium", children: f.value })] }, i))) })), actions && _jsx("div", { className: "mt-auto flex gap-box-xs *:flex-1", children: actions })] }));
}
