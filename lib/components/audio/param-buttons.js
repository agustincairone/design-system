import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Headphones, Power } from "lucide-react";
import { cn } from "../../lib/utils.js";
// Botones chiquitos de cada control de audio:
//   ⏻  apagar ese control (bypass). Normal = ícono del color de la app.
//      Apretado (control apagado) = fondo del color de la app e ícono blanco.
//   🎧 escuchar sólo eso (solo), el mismo ícono que el solo del instrumento. Prendido = color de la app.
// No usan rojo: el rojo está reservado para borrar.
const base = "grid size-6 shrink-0 place-items-center rounded-full border bg-secondary font-mono text-xs leading-none font-bold [&_svg]:size-3 text-muted-foreground transition-colors hover:border-ring hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none";
export function PowerButton({ off, onToggle, className, }) {
    return (_jsx("button", { type: "button", "data-slot": "power-button", onClick: onToggle, title: off ? "Turn on" : "Turn off", "aria-pressed": !!off, className: cn(base, off ? "border-brand bg-brand text-brand-foreground hover:border-brand-hover hover:bg-brand-hover hover:text-brand-foreground" : "text-brand hover:text-brand-strong", className), children: _jsx(Power, { strokeWidth: 2.25 }) }));
}
export function SoloButton({ soloed, onToggle, className, }) {
    return (_jsx("button", { type: "button", "data-slot": "solo-button", onClick: onToggle, title: "Solo", "aria-pressed": !!soloed, className: cn(base, soloed && "border-brand bg-brand text-brand-foreground hover:text-brand-foreground", className), children: _jsx(Headphones, { strokeWidth: 2.25 }) }));
}
export function ParamButtons({ off, onPower, soloed, onSolo, }) {
    if (!onPower && !onSolo)
        return null;
    return (_jsxs("span", { className: "inline-flex gap-1", children: [onPower && _jsx(PowerButton, { off: off, onToggle: onPower }), onSolo && _jsx(SoloButton, { soloed: soloed, onToggle: onSolo })] }));
}
