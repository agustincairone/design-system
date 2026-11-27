import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "../../lib/utils.js";
import { RollNumber } from "./roll-number.js";
import { Badge } from "./badge.js";
// Número grande de una pantalla (de no-coke: los días de racha). Va adentro de una caja que ocupa el alto
// que sobra y la llena: el número justo en el centro de la caja, en la letra de puntitos de Geist (Geist
// Pixel Circle) de 144, y gira al aparecer. Pegado abajo, qué cuenta (puede llevar una imagen, ej: el
// logo) y, si hace falta, una nota en píldora (ej: desde cuándo). Arriba a la derecha, un botón opcional
// (`action`, ej: "Ver mis recaídas").
export function HeroNumber({ value, label, note, action, className, }) {
    return (_jsxs("div", { "data-slot": "hero-number", className: cn("grid h-full grid-rows-[1fr_auto_1fr] gap-box-m text-center", className), children: [_jsx("div", { className: "flex items-start justify-end", children: action }), _jsx(RollNumber, { value: value, className: "font-clock text-hero" }), _jsxs("div", { className: "flex flex-col items-center justify-end gap-box-xs", children: [_jsx("div", { className: "flex items-center gap-box-xs text-sm font-medium", children: label }), note && _jsx(Badge, { variant: "secondary", children: note })] })] }));
}
