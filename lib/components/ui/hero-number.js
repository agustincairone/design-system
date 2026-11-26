import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "../../lib/utils.js";
import { RollNumber } from "./roll-number.js";
import { Badge } from "./badge.js";
// Número grande de una pantalla (de no-coke: los días de racha). El número va en puntitos (como los del
// fleje), con la letra de 48 de los números grandes, y gira al aparecer. Abajo, qué cuenta (puede llevar
// una imagen, ej: el logo) y, si hace falta, una nota en píldora (ej: desde cuándo). Todo centrado, a 8px.
export function HeroNumber({ value, label, note, className, }) {
    return (_jsxs("div", { "data-slot": "hero-number", className: cn("flex flex-col items-center gap-box-xs text-center", className), children: [_jsx(RollNumber, { value: value, className: "font-readout text-5xl font-bold" }), _jsx("div", { className: "flex items-center gap-box-xs text-sm font-medium", children: label }), note && _jsx(Badge, { variant: "secondary", children: note })] }));
}
