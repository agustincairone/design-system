import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "../../lib/utils.js";
// Barra de abajo de las apps de celular: caja blanca con íconos de 24px.
// La sección actual va del color de la app con el puntito (4px) debajo.
export function BottomNav({ items, value, onChange, className, }) {
    return (_jsx("nav", { "data-slot": "bottom-nav", className: cn("flex h-16 w-full items-center rounded-box-l bg-card", className), children: items.map(({ key, icon: Icon, label }) => {
            const on = value === key;
            return (_jsxs("button", { type: "button", "aria-label": label, "aria-current": on ? "page" : undefined, onClick: () => onChange(key), className: cn("flex h-full flex-1 flex-col items-center justify-center gap-1.5 transition-colors outline-none focus-visible:text-foreground", on ? "text-primary" : "text-muted-foreground hover:text-foreground"), children: [_jsx(Icon, { className: "size-6" }), _jsx("span", { className: cn("dot", on ? "bg-primary" : "bg-transparent") })] }, key));
        }) }));
}
