import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "../../lib/utils.js";
// Botón redondo de prender/apagar (como los de un equipo de audio).
// Prendido = color de la app. Apagado = disco oscuro (claro en modo oscuro)
// Siempre hay un punto de 4px arriba, a 10px del disco: oscuro si está apagado, gris clarito si está prendido.
export function RoundToggle({ label, on, onToggle, size = 48, className, }) {
    return (_jsxs("div", { "data-slot": "round-toggle", className: cn("flex flex-col items-center gap-2", className), children: [_jsx("span", { className: cn("dot mb-0.5 transition-colors", on ? "bg-muted-foreground/30" : "bg-foreground") }), _jsx("button", { type: "button", "aria-pressed": on, "aria-label": label, onClick: onToggle, className: cn("rounded-full transition-[background-color,transform] outline-none active:scale-95 focus-visible:ring-4 focus-visible:ring-ring/40", on ? "bg-brand" : "bg-foreground"), style: { width: size, height: size } }), _jsx("span", { className: "text-xs text-muted-foreground", children: label })] }));
}
