import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "../../lib/utils.js";
// Barra de abajo de las apps de celular: caja de vidrio (casi transparente, desenfoca lo que pasa por detrás) con íconos de 24px.
// Íconos centrados en la caja; la sección actual va del color de la app con el puntito (4px)
// justo sobre el borde de abajo: el borde lo corta a la mitad.
export function BottomNav({ items, value, onChange, className, }) {
    return (_jsx("nav", { "data-slot": "bottom-nav", className: cn("flex h-16 w-full items-center rounded-box-l bg-glass backdrop-blur-glass", className), children: items.map(({ key, icon: Icon, label }) => {
            const on = value === key;
            return (_jsxs("button", { type: "button", "aria-label": label, "aria-current": on ? "page" : undefined, onClick: () => onChange(key), className: cn("relative flex h-full flex-1 items-center justify-center transition-colors outline-none focus-visible:text-foreground", on ? "text-primary" : "text-muted-foreground hover:text-foreground"), children: [_jsx(Icon, { className: "size-6" }), on && _jsx("span", { className: "dot absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-primary" })] }, key));
        }) }));
}
