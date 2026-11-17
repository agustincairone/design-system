import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { createPortal } from "react-dom";
import { ChevronUp, Info } from "lucide-react";
import { cn } from "../../lib/utils.js";
import { Button } from "./button.js";
// Acordeón flotante (relleno de 16px): una caja con título, botón "¿Qué es esto?" (opcional) y chevron al final.
// Al abrirlo, el fondo se oscurece y desenfoca (como las hojas) y la caja crece hacia arriba
// desde donde está, por encima del resto de la página. Se cierra con el chevron, tocando afuera o con Esc.
// `onInfo` muestra el botón "¿Qué es esto?" (normalmente abre una BottomSheet con la explicación).
export function FloatAccordion({ title, onInfo, infoLabel = "¿Qué es esto?", children, className, }) {
    const ref = React.useRef(null);
    const [rect, setRect] = React.useState(null); // dónde está la caja cerrada
    const [grown, setGrown] = React.useState(false); // para animar el crecimiento
    const open = rect !== null;
    const close = React.useCallback(() => {
        setGrown(false);
        setTimeout(() => setRect(null), 200);
    }, []);
    const toggle = () => {
        if (open)
            return close();
        if (!ref.current)
            return;
        setRect(ref.current.getBoundingClientRect());
        requestAnimationFrame(() => requestAnimationFrame(() => setGrown(true)));
    };
    React.useEffect(() => {
        if (!open)
            return;
        const onKey = (e) => e.key === "Escape" && close();
        window.addEventListener("keydown", onKey);
        window.addEventListener("resize", close);
        return () => {
            window.removeEventListener("keydown", onKey);
            window.removeEventListener("resize", close);
        };
    }, [open, close]);
    const header = (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("button", { type: "button", onClick: toggle, "aria-expanded": open, className: "min-w-0 flex-1 truncate text-left text-sm font-medium outline-none", children: title }), onInfo && (_jsxs(Button, { variant: "secondary", size: "sm", onClick: onInfo, children: [_jsx(Info, {}), infoLabel] })), _jsx(Button, { variant: "ghost", size: "icon-sm", "aria-label": open ? "Cerrar" : "Abrir", onClick: toggle, children: _jsx(ChevronUp, { className: cn("size-4 transition-transform duration-200", grown && "rotate-180") }) })] }));
    return (_jsxs(_Fragment, { children: [_jsx("div", { ref: ref, "data-slot": "float-accordion", className: cn("rounded-box-l bg-card p-4", open && "invisible", className), children: header }), open &&
                createPortal(_jsxs(_Fragment, { children: [_jsx("div", { "aria-hidden": true, onClick: close, className: cn("fixed inset-0 z-50 bg-overlay transition-opacity duration-200 supports-backdrop-filter:backdrop-blur-xs", grown ? "opacity-100" : "opacity-0") }), _jsxs("div", { role: "dialog", "aria-modal": true, className: "fixed z-50 flex max-h-[calc(100dvh-32px)] flex-col overflow-y-auto rounded-box-l bg-card p-4 text-card-foreground shadow-lg", style: { left: rect.left, width: rect.width, bottom: window.innerHeight - rect.bottom }, children: [header, _jsx("div", { className: cn("grid transition-[grid-template-rows] duration-200 ease-out", grown ? "grid-rows-[1fr]" : "grid-rows-[0fr]"), children: _jsx("div", { className: "min-h-0 overflow-hidden", children: _jsx("div", { className: "pt-3", children: children }) }) })] })] }), document.body)] }));
}
