import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from "../../lib/utils.js";
// Píldora con opciones: la elegida resaltada en blanco. Es el único componente
// para elegir UNA opción entre pocas o cambiar de vista (15M · 1H, Año · Mes).
// Dos tamaños: normal (44px de alto) y chico (36px), los dos con letra de 14px.
// Con `fill`, ocupa todo el ancho y las opciones se reparten el espacio en partes iguales.
export function Segmented({ options, value, onChange, label, size = "default", fill, className, }) {
    return (_jsx("div", { "data-slot": "segmented", role: "radiogroup", "aria-label": label, className: cn(fill ? "flex w-full" : "inline-flex", "items-center gap-0.5 rounded-full bg-secondary in-data-[variant=inset]:bg-raised", size === "sm" ? "p-[3px]" : "p-1", className), children: options.map((o) => {
            const on = o.value === value;
            return (_jsx("button", { type: "button", role: "radio", "aria-checked": on, onClick: () => onChange(o.value), className: cn(fill && "min-w-0 flex-1 truncate", "rounded-full font-medium transition-[color,background-color,box-shadow] outline-none focus-visible:ring-2 focus-visible:ring-ring/50", size === "sm" ? "h-[30px] px-3 text-sm" : "h-9 px-4 text-sm", on ? "bg-raised text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"), children: o.label }, String(o.value)));
        }) }));
}
