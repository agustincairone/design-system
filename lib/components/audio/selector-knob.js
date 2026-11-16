import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "../../lib/utils.js";
// Perilla de posiciones fijas (como "33 · 45 · 78" de un tocadiscos).
// Para elegir entre pocas opciones: compás, forma de onda, velocidad.
// Clic en una opción para ir directo; clic en la perilla o flechas para avanzar.
// La posición se marca con un punto de 4px y la opción elegida se pinta del color de la app (orange-600 en LOOP).
export function SelectorKnob({ label, options, value, onChange, size = 72, className, }) {
    const count = options.length;
    const spread = Math.min(270, Math.max(0, (count - 1) * 45));
    const angleOf = (i) => (count <= 1 ? 0 : -spread / 2 + (i / (count - 1)) * spread);
    const idx = Math.max(0, options.findIndex((o) => o.value === value));
    const box = size + 64;
    const c = box / 2;
    const go = (i) => onChange(options[(i + count) % count].value);
    return (_jsxs("div", { "data-slot": "selector-knob", className: cn("flex flex-col items-center", className), children: [_jsxs("div", { className: "relative", style: { width: box, height: box }, children: [options.map((o, i) => {
                        const rad = ((angleOf(i) - 90) * Math.PI) / 180;
                        const r = size / 2 + 18;
                        return (_jsx("button", { type: "button", onClick: () => go(i), className: cn("absolute -translate-x-1/2 -translate-y-1/2 rounded-md px-1 font-mono text-xs transition-colors", i === idx ? "font-semibold text-brand" : "text-muted-foreground hover:text-foreground"), style: { left: c + r * Math.cos(rad), top: c + r * Math.sin(rad) }, children: o.label }, String(o.value)));
                    }), _jsx("button", { type: "button", "aria-label": label ? `${label}: ${options[idx]?.label}` : options[idx]?.label, onClick: () => go(idx + 1), onKeyDown: (e) => {
                            if (e.key === "ArrowRight" || e.key === "ArrowUp")
                                go(idx + 1);
                            else if (e.key === "ArrowLeft" || e.key === "ArrowDown")
                                go(idx - 1);
                            else
                                return;
                            e.preventDefault();
                        }, className: "absolute rounded-full bg-foreground outline-none focus-visible:ring-4 focus-visible:ring-brand/30", style: { left: c - size / 2, top: c - size / 2, width: size, height: size }, children: _jsx("span", { className: "absolute inset-0 transition-transform duration-200", style: { transform: `rotate(${angleOf(idx)}deg)` }, children: _jsx("span", { className: "dot absolute top-[14%] left-1/2 -translate-x-1/2 bg-background" }) }) })] }), label && _jsx("span", { className: "-mt-3 text-sm text-muted-foreground", children: label })] }));
}
