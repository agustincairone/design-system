import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "../../lib/utils.js";
// Panel de una sección de controles (ej: SONIDO, CONSOLA, MEZCLA):
// - variant="card" (por defecto): caja L, blanca y SIN borde, sobre el fondo de la página.
//   Regla del sistema: las cajas nunca llevan borde; se separan por color de fondo.
// - variant="inset": caja M (los controles grises de adentro pasan a blanco solos para que se vean), gris clarito sin borde (bg-inset: stone 100 en claro, un paso más claro que la tarjeta en oscuro), para ir adentro de otra caja.
// tarjeta con un título chiquito en mayúsculas y un puntito de color.
// Con `live`, el puntito es de "en vivo": aro naranja más claro mientras live=true,
// y gris cuando está en false (ej: el monitor cuando no suena nada).
export function AudioPanel({ title, color, live, variant = "card", className, children, }) {
    return (_jsxs("section", { "data-slot": "audio-panel", "data-variant": variant, className: cn("flex min-w-0 flex-col", // el contenido puede crecer con flex-1 para llenar la caja
        variant === "inset"
            ? "rounded-box-m bg-inset p-box-m"
            : "rounded-box-l bg-card p-box-l", className), children: [title && (_jsxs("h4", { className: "mb-3 flex items-center gap-2 eyebrow", children: [_jsx("span", { className: cn("dot", live !== undefined && "mx-0.5 transition-[background,box-shadow]"), style: live === undefined
                            ? { background: color ?? "var(--brand)" }
                            : live
                                ? {
                                    background: color ?? "var(--brand)",
                                    boxShadow: `0 0 0 3px color-mix(in oklch, ${color ?? "var(--brand)"} 30%, transparent)`,
                                }
                                : { background: "var(--muted-foreground)" } }), title] })), children] }));
}
