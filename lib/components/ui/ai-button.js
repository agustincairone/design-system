import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Sparkles } from "lucide-react";
import { Button } from "./button.js";
// Generar con IA: el botón chico gris con el destello del color de la app (al pasar el mouse el botón
// se pinta del color de la app y el destello pasa a blanco). Mientras trabaja (`busy`) queda apagado
// y dice "Generando...". Va a la derecha del nombre del campo que completa (ej: título, descripción).
export function AiButton({ busy, busyLabel = "Generando...", children = "Generar con IA", ...props }) {
    return (_jsxs(Button, { "data-slot": "ai-button", variant: "secondary", size: "sm", disabled: busy || props.disabled, ...props, children: [_jsx(Sparkles, { className: "text-brand-text group-hover/button:text-current group-disabled/button:text-current" }), busy ? busyLabel : children] }));
}
