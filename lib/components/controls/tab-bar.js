import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from "../../lib/utils.js";
// Tab de ancho completo (diseño de outfit-tracker, con los colores del sistema).
// Para elegir entre MÁS DE 3 opciones (ej: las 6 categorías). Con 2 o 3 opciones
// se usa la píldora con opciones (Segmented).
// Va pegado arriba de una caja: la caja lleva overflow-hidden y la tab ocupa todo el ancho.
// La elegida se pinta del color de la app; las demás quedan en gris.
export function TabBar({ options, value, onChange, label, className, }) {
    return (_jsx("div", { "data-slot": "tab-bar", role: "tablist", "aria-label": label, className: cn("flex w-full shrink-0 border-b border-border", className), children: options.map((o, i) => {
            const on = o.value === value;
            return (_jsx("button", { type: "button", role: "tab", "aria-selected": on, onClick: () => onChange(o.value), className: cn("flex min-w-0 flex-1 items-center justify-center truncate px-2 py-4 text-sm transition-colors outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-inset", i < options.length - 1 && "border-r border-border", on ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:text-foreground"), children: o.label }, String(o.value)));
        }) }));
}
