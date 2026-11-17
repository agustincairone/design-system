import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { X } from "lucide-react";
import { cn } from "../../lib/utils.js";
// Chip: opción chiquita que se prende y se apaga (filtros, valores guardados).
// Apagado = borde gris; elegido = relleno del color principal.
// Con `icon` lleva un ícono adelante; con `onRemove`, una cruz (del mismo color que el texto) para borrarlo.
function Chip({ selected = false, icon: Icon, onRemove, removeLabel = "Borrar", className, children, disabled, ...props }) {
    return (_jsxs("button", { type: "button", "data-slot": "chip", "aria-pressed": selected, disabled: disabled, className: cn("inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full border px-3 text-[0.8rem] font-medium whitespace-nowrap transition-colors outline-none select-none focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50", selected
            ? "border-transparent bg-primary text-primary-foreground hover:bg-primary/80"
            : onRemove
                ? "border-input bg-transparent text-foreground hover:bg-secondary dark:border-input" // con cruz: al pasar el mouse sólo se pinta el fondo de gris
                : "border-input bg-transparent text-foreground hover:border-brand hover:text-brand dark:border-input", Icon && "pl-2.5", onRemove && "pr-2", className), ...props, children: [Icon && _jsx(Icon, { className: "size-3.5" }), children, onRemove && (_jsx("span", { role: "button", "aria-label": removeLabel, onClick: (e) => {
                    e.stopPropagation();
                    onRemove();
                }, className: "-mr-0.5 flex size-4 items-center justify-center rounded-full", children: _jsx(X, { className: "size-3" }) }))] }));
}
export { Chip };
