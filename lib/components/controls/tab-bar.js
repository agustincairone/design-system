import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "../../lib/utils.js";
// Tab de ancho completo (diseño de outfit-tracker, con los colores del sistema).
// Para elegir entre MÁS DE 3 opciones (ej: las 6 categorías). Con 2 o 3 opciones
// se usa la píldora con opciones (Segmented).
// Va pegado arriba de una caja: la caja lleva overflow-hidden y la tab ocupa todo el ancho.
// La elegida va con el texto del color de la app y una raya de 2px abajo (más gruesa que la línea
// divisoria de 1px); las demás quedan en gris. Todas sobre el fondo de la caja.
// Cada opción puede llevar un segundo renglón chico (`sub`), ej: el total de esa pestaña.
export function TabBar({ options, value, onChange, label, className, }) {
    return (_jsx("div", { "data-slot": "tab-bar", role: "tablist", "aria-label": label, className: cn("flex w-full shrink-0 border-b border-border", className), children: options.map((o, i) => {
            const on = o.value === value;
            return (_jsxs("button", { type: "button", role: "tab", "aria-selected": on, onClick: () => onChange(o.value), className: cn("flex min-w-0 flex-1 flex-col items-center justify-center gap-0.5 px-2 py-4 text-sm transition-colors outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-inset", i < options.length - 1 && "border-r border-border", "relative bg-card after:absolute after:inset-x-0 after:-bottom-px after:h-0.5", on ? "font-medium text-brand-text after:bg-brand" : "text-muted-foreground hover:text-foreground"), children: [_jsx("span", { className: "max-w-full truncate", children: o.label }), o.sub && _jsx("span", { className: "max-w-full truncate text-xs font-normal text-muted-foreground", children: o.sub })] }, String(o.value)));
        }) }));
}
