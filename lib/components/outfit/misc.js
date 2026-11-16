import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Plus } from "lucide-react";
import { OUTFIT as C } from "./palette.js";
// Caja blanca de sección (bordes 12px, sombra suave)
export function Panel({ className, style, ...props }) {
    return _jsx("div", { className: "rounded-[12px] shadow-sm " + (className ?? ""), style: { background: C.white, ...style }, ...props });
}
// Etiqueta gris chiquita arriba de un campo
export function FieldLabel({ children, right }) {
    return (_jsxs("div", { className: "mb-2 flex items-center", children: [_jsx("p", { className: "text-xs", style: { color: C.muted }, children: children }), right && _jsx("span", { className: "ml-auto text-xs", children: right })] }));
}
// Campo de texto + botón cuadrado "+" (negro si hay texto)
export function InputAdd({ value, onChange, onAdd, placeholder }) {
    const has = value.trim() !== "";
    return (_jsxs("div", { className: "flex gap-2", children: [_jsx("input", { type: "text", placeholder: placeholder, value: value, onChange: (e) => onChange(e.target.value), onKeyDown: (e) => { if (e.key === "Enter")
                    onAdd(); }, className: "flex-1 rounded-[8px] px-3 py-2 text-sm outline-none", style: { background: C.bg, border: "1px solid " + C.border, color: C.text } }), _jsx("button", { type: "button", onClick: onAdd, disabled: !has, className: "rounded-[8px] px-3 py-2", style: { background: has ? C.ink : C.light, color: has ? C.white : C.muted }, children: _jsx(Plus, { className: "h-4 w-4" }) })] }));
}
// Estado vacío: círculo gris con ícono, título y texto
export function EmptyState({ icon, title, text }) {
    return (_jsxs("div", { className: "flex flex-col items-center justify-center gap-4 text-center", children: [_jsx("div", { className: "flex h-16 w-16 items-center justify-center rounded-full", style: { background: C.soft }, children: icon }), _jsxs("div", { children: [_jsx("p", { className: "mb-1 text-base font-medium", style: { color: C.text }, children: title }), _jsx("p", { className: "text-sm", style: { color: C.muted }, children: text })] })] }));
}
// Aviso flotante en forma de píldora abajo al centro
export function Toast({ message, fixed = true }) {
    return (_jsx("div", { className: (fixed ? "fixed bottom-6 left-1/2 " : "inline-block ") + "rounded-full px-5 py-3 text-sm font-medium", style: { background: C.soft, color: C.ink, transform: fixed ? "translateX(-50%) translateY(" + (message ? "0px" : "24px") + ")" : undefined, opacity: message ? 1 : 0, transition: "all 0.3s ease", pointerEvents: "none", zIndex: 60 }, children: message }));
}
