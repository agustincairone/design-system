import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { X } from "lucide-react";
import { OUTFIT as C } from "./palette.js";
import { ActionButton } from "./action-button.js";
// Hoja que sube desde abajo: título + cruz con línea abajo, y el contenido.
export function BottomSheet({ open, onClose, title, children }) {
    if (!open)
        return null;
    return (_jsx("div", { className: "fixed inset-0 flex items-end justify-center", style: { background: "rgba(0,0,0,0.4)", zIndex: 200 }, onClick: onClose, children: _jsxs("div", { className: "w-full rounded-t-[16px]", style: { background: C.white }, onClick: (e) => e.stopPropagation(), children: [_jsxs("div", { className: "flex items-center justify-between px-4 py-4", style: { borderBottom: "1px solid " + C.border }, children: [_jsx("span", { className: "text-sm font-medium", style: { color: C.ink }, children: title }), _jsx("button", { type: "button", "aria-label": "Cerrar", onClick: onClose, style: { background: "transparent", border: "none", padding: 0 }, children: _jsx(X, { style: { width: 20, height: 20, color: C.muted } }) })] }), children] }) }));
}
// Confirmación en hoja de abajo: pregunta, aclaración en gris, Volver + acción en rojo
export function ConfirmSheet({ open, onClose, title, question, detail, confirmLabel, onConfirm }) {
    return (_jsx(BottomSheet, { open: open, onClose: onClose, title: title, children: _jsxs("div", { className: "p-6 pb-10", children: [_jsx("p", { className: "mb-1 text-sm", style: { color: C.ink }, children: question }), _jsx("p", { className: "mb-6 text-sm", style: { color: C.muted }, children: detail }), _jsxs("div", { className: "flex gap-3", children: [_jsx(ActionButton, { tone: "secondary", className: "flex-1", onClick: onClose, children: "Volver" }), _jsx(ActionButton, { tone: "danger", className: "flex-1", onClick: onConfirm, children: confirmLabel })] })] }) }));
}
// Ventana centrada (ej: Nueva prenda): título + subtítulo, cruz, línea abajo
export function CenterModal({ open, onClose, title, subtitle, children, footer }) {
    if (!open)
        return null;
    return (_jsx("div", { className: "fixed inset-0 flex items-center justify-center p-4", style: { background: "rgba(0,0,0,0.5)", zIndex: 200 }, children: _jsxs("div", { className: "relative w-full max-w-sm rounded-[12px]", style: { background: C.white, maxHeight: "92vh", overflowY: "auto" }, children: [_jsxs("div", { className: "flex items-center justify-between border-b px-6 pt-6 pb-4", style: { borderColor: C.border }, children: [_jsxs("div", { children: [_jsx("h3", { className: "text-sm font-medium", style: { color: C.ink }, children: title }), subtitle && _jsx("p", { className: "mt-0.5 text-xs", style: { color: C.muted }, children: subtitle })] }), _jsx("button", { type: "button", "aria-label": "Cerrar", onClick: onClose, children: _jsx(X, { className: "h-5 w-5", style: { color: C.muted } }) })] }), _jsx("div", { className: "space-y-5 px-6 py-5", children: children }), footer && _jsx("div", { className: "px-6 pb-6", children: footer })] }) }));
}
