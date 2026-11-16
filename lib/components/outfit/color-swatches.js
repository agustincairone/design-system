import { jsx as _jsx } from "react/jsx-runtime";
import { Check } from "lucide-react";
import { OUTFIT as C } from "./palette.js";
const LIGHTS = ["#FFFFFF", "#D4D4D4", "#F0E6D6"];
// Selector de colores en círculos de 30px (hasta `max` elegidos). El elegido lleva un aro negro.
export function ColorSwatches({ colors, value, onToggle, max = 3 }) {
    return (_jsx("div", { className: "flex gap-2 overflow-x-auto", style: { scrollbarWidth: "none", padding: "4px 2px 6px" }, children: colors.map((c) => {
            const sel = value.find((p) => p.hex === c.hex);
            const light = LIGHTS.includes(c.hex);
            return (_jsx("button", { type: "button", onClick: () => onToggle(c), title: c.name, className: "relative flex-shrink-0", style: {
                    width: 30, height: 30, borderRadius: "50%", background: c.hex,
                    border: light ? "1.5px solid " + C.border : "2px solid transparent",
                    boxShadow: sel ? "0 0 0 2px " + C.white + ", 0 0 0 4px " + C.ink : undefined,
                    outline: "none", transition: "box-shadow 0.15s",
                    opacity: !sel && value.length >= max ? 0.35 : 1,
                }, children: sel && (_jsx("span", { style: { position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }, children: _jsx(Check, { style: { width: 12, height: 12, color: light ? C.ink : C.white } }) })) }, c.hex));
        }) }));
}
