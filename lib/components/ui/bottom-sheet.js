import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { ChevronDown, ChevronLeft, X } from "lucide-react";
import { Dialog as SheetPrimitive } from "radix-ui";
import { cn } from "../../lib/utils.js";
import { Button } from "./button.js";
import { Chip, ChipGroup } from "./chip.js";
import { ScrollFade, useMoreBelow } from "./scroll-fade.js";
// Encabezado de un paso: volver (desde el paso 2), título de 18px, "Paso 2/3" y la cruz si se puede cerrar.
// Es el mismo en las hojas y en los pasos que van adentro de una caja de la página (ej: cargar un outfit).
function StepHeader({ title, onClose, onBack, step, className }) {
    return (_jsxs("div", { "data-slot": "step-header", className: cn("flex items-center gap-3", className), children: [onBack && (_jsx(Button, { variant: "outline", size: "icon-sm", "aria-label": "Volver", onClick: onBack, children: _jsx(ChevronLeft, { className: "size-4" }) })), _jsx("span", { className: "min-w-0 flex-1 truncate text-lg font-medium tracking-tight", children: title }), step && _jsxs("span", { className: "shrink-0 text-xs text-muted-foreground", children: ["Paso ", step.current, "/", step.total] }), onClose && (_jsx(Button, { variant: "secondary", size: "icon-sm", "aria-label": "Cerrar", onClick: onClose, children: _jsx(X, { className: "size-4" }) }))] }));
}
function SheetHeaderRow({ title, onClose, onBack, step }) {
    // en las hojas, con una línea divisoria de lado a lado debajo del título
    return _jsx(StepHeader, { className: "-mx-box-l border-b border-border px-box-l pb-4", title: title, onClose: onClose, onBack: onBack, step: step });
}
const PANEL = "flex max-w-md flex-col gap-4 rounded-box-l bg-card p-box-l text-sm text-card-foreground shadow-lg";
function BottomSheet({ open, onOpenChange, title, children, inline, className, onBack, step, }) {
    if (inline) {
        if (!open)
            return null;
        return (_jsx("div", { className: "flex h-full items-end justify-center bg-overlay p-4", children: _jsxs("div", { className: cn(PANEL, "w-full", className), children: [_jsx(SheetHeaderRow, { title: title, onClose: () => onOpenChange(false), onBack: onBack, step: step }), children] }) }));
    }
    return (_jsx(SheetPrimitive.Root, { open: open, onOpenChange: onOpenChange, children: _jsxs(SheetPrimitive.Portal, { children: [_jsx(SheetPrimitive.Overlay, { className: "fixed inset-0 z-50 bg-overlay duration-100 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0" }), _jsxs(SheetPrimitive.Content, { "aria-describedby": undefined, onOpenAutoFocus: (e) => e.preventDefault(), className: cn(PANEL, "fixed inset-x-4 bottom-4 z-50 mx-auto max-h-[calc(100dvh-32px)] overflow-y-auto outline-none duration-200 data-open:animate-in data-open:fade-in-0 data-open:slide-in-from-bottom-10 data-closed:animate-out data-closed:fade-out-0 data-closed:slide-out-to-bottom-10", className), children: [_jsx(SheetPrimitive.Title, { asChild: true, children: _jsx("div", { children: _jsx(SheetHeaderRow, { title: title, onClose: () => onOpenChange(false), onBack: onBack, step: step }) }) }), children] })] }) }));
}
// Resumen de algo en una cajita gris (ej: el vino que vas a borrar o el que ya tenías cargado)
function SheetSummary({ title, lines }) {
    return (_jsxs("div", { className: "flex flex-col gap-box-2xs rounded-box-s bg-inset p-box-s", children: [_jsx("p", { className: "text-sm font-medium", children: title }), lines?.filter(Boolean).map((l, i) => _jsx("p", { className: "text-xs text-muted-foreground", children: l }, i))] }));
}
// Confirmación: pregunta, aclaración en gris, lo que se va a borrar (opcional, ej: un SheetSummary)
// y Volver + la acción en rojo
function ConfirmSheet({ open, onOpenChange, title, question, detail, confirmLabel, onConfirm, cancelLabel = "Volver", inline, children, }) {
    return (_jsxs(BottomSheet, { open: open, onOpenChange: onOpenChange, title: title, inline: inline, children: [_jsxs("div", { className: "flex flex-col gap-1", children: [_jsx("p", { className: "text-sm", children: question }), detail && _jsx("p", { className: "text-sm text-muted-foreground", children: detail })] }), children, _jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { variant: "secondary", className: "flex-1", onClick: () => onOpenChange(false), children: cancelLabel }), _jsx(Button, { variant: "destructive", className: "flex-1", onClick: onConfirm, children: confirmLabel })] })] }));
}
// Filtro (diseño de wine): cada grupo es una fila que se abre, de a una. Al lado del nombre, en gris,
// lo que ya está elegido; al abrirla, chips para elegir varias. Líneas divisorias de lado a lado
// entre las filas, y Confirmar al final.
function FilterSheet({ open, onOpenChange, title = "Filtrar por", groups, value, onChange, onConfirm, confirmLabel = "Confirmar", inline, }) {
    const [openKey, setOpenKey] = React.useState(groups[0]?.key ?? null);
    const toggle = (key, option) => {
        const chosen = value[key] ?? [];
        onChange({ ...value, [key]: chosen.includes(option) ? chosen.filter((o) => o !== option) : [...chosen, option] });
    };
    return (_jsxs(BottomSheet, { open: open, onOpenChange: onOpenChange, title: title, inline: inline, children: [_jsx("div", { className: "-mx-box-l -mt-4", children: groups.map((g) => {
                    const chosen = value[g.key] ?? [];
                    const isOpen = openKey === g.key;
                    return (_jsxs("div", { className: "border-b border-border", children: [_jsxs("button", { type: "button", "aria-expanded": isOpen, onClick: () => setOpenKey(isOpen ? null : g.key), className: "flex w-full items-center gap-3 px-box-l py-box-m text-left text-sm outline-none focus-visible:bg-secondary", children: [_jsxs("span", { className: "min-w-0 flex-1", children: [_jsx("span", { className: "font-medium", children: g.label }), chosen.length > 0 && _jsxs("span", { className: "text-muted-foreground", children: [" \u2014 ", chosen.join(", ")] })] }), _jsx(ChevronDown, { className: cn("size-4 shrink-0 text-muted-foreground transition-transform duration-200", isOpen && "rotate-180") })] }), isOpen && (_jsx(ChipGroup, { className: "px-box-l pb-box-m", children: g.options.map((o) => (_jsx(Chip, { selected: chosen.includes(o), onClick: () => toggle(g.key, o), children: o }, o))) }))] }, g.key));
                }) }), _jsx(Button, { className: "w-full", onClick: onConfirm, children: confirmLabel })] }));
}
// Pestañas de una hoja que miden siempre lo mismo: el alto lo pone la pestaña principal
// (`base`, ej: Info), que se dibuja siempre aunque no se vea. Las otras pestañas ocupan
// exactamente ese alto: lo de arriba (`top`, ej: sub-pestañas) queda fijo, el contenido se
// desplaza si no entra (con el degradé que avisa que hay más abajo) y los botones (`footer`)
// quedan siempre pegados abajo.
function SheetPanels({ base, showBase, top, footer, children, }) {
    return (_jsxs("div", { "data-slot": "sheet-panels", className: "relative", children: [_jsx("div", { className: cn("flex flex-col gap-4", !showBase && "invisible"), children: base }), !showBase && (_jsxs("div", { className: "absolute inset-0 flex flex-col gap-4", children: [top, _jsx(PanelScroll, { children: children }), footer && _jsx("div", { className: "flex gap-box-xs *:flex-1", children: footer })] }))] }));
}
// La zona que se desplaza de una pestaña, con el degradé abajo mientras quede más por ver.
// 4px de aire arriba y abajo para que no se corte el borde de foco de los campos.
function PanelScroll({ children }) {
    const more = useMoreBelow();
    return (_jsxs("div", { className: "relative -mx-box-l -my-1 min-h-0 flex-1", children: [_jsx("div", { ref: more.ref, onScroll: more.onScroll, className: "h-full overflow-y-auto px-box-l py-1", children: _jsx("div", { className: "flex flex-col gap-4", children: children }) }), _jsx(ScrollFade, { show: more.show })] }));
}
export { BottomSheet, ConfirmSheet, FilterSheet, SheetPanels, SheetSummary, StepHeader };
