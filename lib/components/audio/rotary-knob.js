import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "../../lib/utils.js";
import { ParamButtons } from "./param-buttons.js";
// Perilla giratoria estilo consola.
// - Arrastrá hacia arriba/abajo (con Shift, más fino). Flechas del teclado. Doble clic: reset.
// - `bipolar`: el valor por defecto queda arriba (a las 12) y el arco sale desde ahí,
//   aunque el rango no sea simétrico (ej: EQ de -30 a +6).
// - Aro de 2px; el valor se marca con un punto de 4px.
const ARC = 270;
const SIZE = 62; // px (48 + 30%)
const C = SIZE / 2;
const R = 23.5;
function polar(deg) {
    const rad = ((deg - 90) * Math.PI) / 180;
    return [C + R * Math.cos(rad), C + R * Math.sin(rad)];
}
function arcPath(from, to) {
    if (Math.abs(to - from) < 0.5)
        return "";
    const [a, b] = from < to ? [from, to] : [to, from];
    const [x1, y1] = polar(a);
    const [x2, y2] = polar(b);
    return `M ${x1} ${y1} A ${R} ${R} 0 ${b - a > 180 ? 1 : 0} 1 ${x2} ${y2}`;
}
export function RotaryKnob({ label, value, min, max, step = 0.5, defaultValue = 0, bipolar = true, format = String, onChange, color, off, onPower, soloed, onSolo, offText = "OFF", track = 2, className, }) {
    const drag = React.useRef(null);
    const clamp = (v) => Math.min(max, Math.max(min, v));
    const toNorm = (v) => {
        if (!bipolar)
            return (v - min) / (max - min);
        return v < defaultValue
            ? 0.5 * ((v - min) / (defaultValue - min))
            : 0.5 + 0.5 * ((v - defaultValue) / (max - defaultValue));
    };
    const fromNorm = (n) => {
        n = Math.min(1, Math.max(0, n));
        if (!bipolar)
            return min + n * (max - min);
        return n < 0.5
            ? min + (n / 0.5) * (defaultValue - min)
            : defaultValue + ((n - 0.5) / 0.5) * (max - defaultValue);
    };
    const angle = -ARC / 2 + toNorm(value) * ARC;
    const zeroAngle = bipolar ? 0 : -ARC / 2;
    const rad = ((angle - 90) * Math.PI) / 180;
    const [px, py] = [C + 10.5 * Math.cos(rad), C + 10.5 * Math.sin(rad)];
    return (_jsxs("div", { "data-slot": "rotary-knob", className: cn("flex w-[76px] flex-col items-center gap-1", className), style: { "--ctl": color ?? "var(--brand)" }, children: [_jsx("span", { className: "eyebrow max-w-full truncate", children: label }), _jsxs("svg", { viewBox: `0 0 ${SIZE} ${SIZE}`, role: "slider", tabIndex: 0, "aria-label": label, "aria-valuemin": min, "aria-valuemax": max, "aria-valuenow": value, className: cn("size-[62px] cursor-ns-resize touch-none rounded-full outline-none focus-visible:ring-2 focus-visible:ring-(--ctl)", off && "opacity-30"), onPointerDown: (e) => {
                    e.currentTarget.setPointerCapture(e.pointerId);
                    drag.current = { y: e.clientY, n: toNorm(value) };
                }, onPointerMove: (e) => {
                    if (!drag.current)
                        return;
                    const fine = e.shiftKey ? 0.25 : 1;
                    const n = drag.current.n + ((drag.current.y - e.clientY) / 140) * fine;
                    onChange(clamp(Math.round(fromNorm(n) / step) * step));
                }, onPointerUp: () => (drag.current = null), onPointerCancel: () => (drag.current = null), onDoubleClick: () => onChange(defaultValue), onKeyDown: (e) => {
                    if (e.key === "ArrowUp" || e.key === "ArrowRight")
                        onChange(clamp(value + step));
                    else if (e.key === "ArrowDown" || e.key === "ArrowLeft")
                        onChange(clamp(value - step));
                    else
                        return;
                    e.preventDefault();
                }, children: [_jsx("path", { d: arcPath(-ARC / 2, ARC / 2), className: "fill-none stroke-border", strokeWidth: track, strokeLinecap: "round" }), _jsx("path", { d: arcPath(zeroAngle, angle), className: "fill-none stroke-(--ctl)", strokeWidth: track, strokeLinecap: "round" }), _jsx("circle", { cx: C, cy: C, r: 16.25, className: "fill-secondary stroke-border", strokeWidth: 1 }), _jsx("circle", { cx: px, cy: py, r: 2, className: "fill-foreground" })] }), _jsx("span", { className: cn("live-number font-mono text-xs font-semibold", off && "text-muted-foreground", soloed && "text-brand-text"), children: off ? offText : format(value) }), _jsx(ParamButtons, { off: off, onPower: onPower, soloed: soloed, onSolo: onSolo })] }));
}
