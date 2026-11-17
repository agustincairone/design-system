import { jsx as _jsx } from "react/jsx-runtime";
import { Check } from "lucide-react";
import { cn } from "../../lib/utils.js";
const LIGHTS = ["#FFFFFF", "#D4D4D4", "#F0E6D6"]; // para el color del ✓
export function ColorSwatches({ colors, value, onToggle, max = 3, className, }) {
    return (_jsx("div", { "data-slot": "color-swatches", className: cn("flex gap-2 overflow-x-auto px-1 pt-1 pb-1.5 [scrollbar-width:none]", className), children: colors.map((c) => {
            const sel = value.some((p) => p.hex === c.hex);
            const light = LIGHTS.includes(c.hex.toUpperCase());
            return (_jsx("button", { type: "button", title: c.name, "aria-label": c.name, "aria-pressed": sel, onClick: () => onToggle(c), className: cn("relative size-[30px] shrink-0 rounded-full outline-none transition-[box-shadow,opacity] focus-visible:ring-2 focus-visible:ring-brand", c.hex.toUpperCase() === "#FFFFFF" || c.hex.toUpperCase() === "#FFF" ? "border border-border" : "border-0", sel && "ring-2 ring-primary ring-offset-2 ring-offset-card", !sel && value.length >= max && "opacity-35"), style: { background: c.hex }, children: sel && (_jsx("span", { className: "absolute inset-0 flex items-center justify-center", children: _jsx(Check, { className: "size-3", style: { color: light ? "#1c1917" : "#ffffff" } }) })) }, c.hex));
        }) }));
}
