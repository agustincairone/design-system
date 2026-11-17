import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { X } from "lucide-react";
import { Dialog as SheetPrimitive } from "radix-ui";
import { cn } from "../../lib/utils.js";
import { Button } from "./button.js";
// Hoja desde abajo: la única ventana del sistema (detalle, confirmación, formulario).
// Flota con 16px de aire a los costados y abajo, título de 16px y cruz en un botón
// redondo con borde (igual al de volver).
// `inline` la dibuja dentro de la página en vez de flotando (sólo para la guía).
function SheetHeaderRow({ title, onClose }) {
    return (_jsxs("div", { className: "flex items-center justify-between gap-3", children: [_jsx("span", { className: "min-w-0 truncate text-base font-medium tracking-tight", children: title }), _jsx(Button, { variant: "outline", size: "icon-sm", "aria-label": "Cerrar", onClick: onClose, children: _jsx(X, { className: "size-4" }) })] }));
}
const PANEL = "flex w-full max-w-md flex-col gap-4 rounded-box-l bg-card p-box-l text-sm text-card-foreground shadow-lg";
function BottomSheet({ open, onOpenChange, title, children, inline, className, }) {
    if (inline) {
        if (!open)
            return null;
        return (_jsx("div", { className: "flex h-full items-end justify-center bg-black/10 p-4", children: _jsxs("div", { className: cn(PANEL, className), children: [_jsx(SheetHeaderRow, { title: title, onClose: () => onOpenChange(false) }), children] }) }));
    }
    return (_jsx(SheetPrimitive.Root, { open: open, onOpenChange: onOpenChange, children: _jsxs(SheetPrimitive.Portal, { children: [_jsx(SheetPrimitive.Overlay, { className: "fixed inset-0 z-50 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0" }), _jsxs(SheetPrimitive.Content, { "aria-describedby": undefined, className: cn(PANEL, "fixed inset-x-4 bottom-4 z-50 mx-auto max-h-[calc(100dvh-32px)] overflow-y-auto outline-none duration-200 data-open:animate-in data-open:fade-in-0 data-open:slide-in-from-bottom-10 data-closed:animate-out data-closed:fade-out-0 data-closed:slide-out-to-bottom-10", className), children: [_jsx(SheetPrimitive.Title, { asChild: true, children: _jsx("div", { children: _jsx(SheetHeaderRow, { title: title, onClose: () => onOpenChange(false) }) }) }), children] })] }) }));
}
// Confirmación: pregunta, aclaración en gris, y Volver + la acción en rojo
function ConfirmSheet({ open, onOpenChange, title, question, detail, confirmLabel, onConfirm, cancelLabel = "Volver", inline, }) {
    return (_jsxs(BottomSheet, { open: open, onOpenChange: onOpenChange, title: title, inline: inline, children: [_jsxs("div", { className: "flex flex-col gap-1", children: [_jsx("p", { className: "text-sm", children: question }), detail && _jsx("p", { className: "text-sm text-muted-foreground", children: detail })] }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { variant: "secondary", className: "flex-1", onClick: () => onOpenChange(false), children: cancelLabel }), _jsx(Button, { variant: "destructive", className: "flex-1", onClick: onConfirm, children: confirmLabel })] })] }));
}
export { BottomSheet, ConfirmSheet };
