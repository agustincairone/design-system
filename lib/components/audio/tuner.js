import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "../../lib/utils.js";
import { Minus, Plus } from "lucide-react";
import { clamp, snap, useDrag } from "./drag.js";
import { Button } from "../ui/button.js";
// Sintonizador tipo radio: número grande arriba y una regla que se arrastra
// de costado debajo de una aguja fija. Ideal para valores precisos (BPM, frecuencia).
// Los ceros de adelante del número se ven apagados.
// Con `stepper`, aparecen botones − y + a los costados del número para ajustar de a uno.
// `children` va centrado abajo de la regla (ej: un botón Tap).
export function Tuner({ label, value, min, max, step = 1, major = 10, digits = 3, decimals = 0, pxPerStep = 8, onChange, color, numberClassName, caption, stepper = false, className, children, }) {
    const box = React.useRef(null);
    const [width, setWidth] = React.useState(320);
    React.useLayoutEffect(() => {
        const el = box.current;
        if (!el)
            return;
        const ro = new ResizeObserver(([e]) => setWidth(e.contentRect.width));
        ro.observe(el);
        return () => ro.disconnect();
    }, []);
    const startValue = React.useRef(value);
    const drag = useDrag(() => (startValue.current = value), (dx) => onChange(clamp(snap(startValue.current - (dx / pxPerStep) * step, step), min, max)));
    const fixed = value.toFixed(decimals);
    const [int, dec] = fixed.split(".");
    const padded = int.padStart(digits, "0");
    const firstReal = padded.search(/[1-9]/);
    const cut = firstReal === -1 ? digits - 1 : firstReal;
    const half = Math.ceil(width / 2 / pxPerStep) + 1;
    const center = Math.round(value / step);
    const ticks = [];
    for (let k = center - half; k <= center + half; k++) {
        const v = k * step;
        if (v < min - 1e-9 || v > max + 1e-9)
            continue;
        const x = width / 2 + (v - value) * (pxPerStep / step);
        const isMajor = Math.abs(v / major - Math.round(v / major)) < 1e-6;
        const isMid = !isMajor && Math.abs((2 * v) / major - Math.round((2 * v) / major)) < 1e-6;
        ticks.push(_jsxs("div", { className: "absolute top-0", style: { transform: `translateX(${x}px)` }, children: [_jsx("div", { className: cn("w-px -translate-x-1/2", isMajor
                        ? "h-7 bg-foreground/70"
                        : isMid
                            ? "h-5 bg-muted-foreground/60"
                            : "h-3.5 bg-muted-foreground/40") }), isMajor && (_jsx("div", { className: "mt-1.5 -translate-x-1/2 font-mono text-[10px] text-muted-foreground", children: Number(v.toFixed(decimals)) }))] }, k));
    }
    return (_jsxs("div", { "data-slot": "tuner", className: cn("flex w-full flex-col items-center gap-1 select-none", className), style: { "--ctl": color ?? "var(--brand)" }, children: [_jsxs("div", { className: "flex w-full flex-1 flex-col items-center justify-center gap-1", children: [_jsxs("div", { className: "flex w-full items-center justify-center gap-2", children: [stepper && (_jsx(Button, { size: "icon", variant: "secondary", "aria-label": "Decrease", onClick: () => onChange(clamp(snap(value - step, step), min, max)), children: _jsx(Minus, {}) })), _jsxs("div", { className: cn("flex-1 text-center text-6xl leading-none font-light live-number tracking-tighter", numberClassName), children: [_jsx("span", { className: "text-muted-foreground/40", children: padded.slice(0, cut) }), padded.slice(cut), dec !== undefined && _jsxs(_Fragment, { children: [".", dec] })] }), stepper && (_jsx(Button, { size: "icon", variant: "secondary", "aria-label": "Increase", onClick: () => onChange(clamp(snap(value + step, step), min, max)), children: _jsx(Plus, {}) }))] }), caption ? (_jsx("div", { className: "text-sm whitespace-nowrap text-muted-foreground", children: caption })) : (label && _jsx("div", { className: "text-sm text-muted-foreground", children: label }))] }), _jsxs("div", { ref: box, role: "slider", tabIndex: 0, "aria-label": label, "aria-valuemin": min, "aria-valuemax": max, "aria-valuenow": value, className: "relative mt-3 h-14 w-full cursor-ew-resize touch-none overflow-hidden rounded-md [mask-image:linear-gradient(to_right,transparent,black_18%,black_82%,transparent)] outline-none focus-visible:bg-accent", ...drag, onWheel: (e) => {
                    const d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
                    onChange(clamp(snap(value + Math.sign(d) * step, step), min, max));
                }, onKeyDown: (e) => {
                    if (e.key === "ArrowRight" || e.key === "ArrowUp")
                        onChange(clamp(snap(value + step, step), min, max));
                    else if (e.key === "ArrowLeft" || e.key === "ArrowDown")
                        onChange(clamp(snap(value - step, step), min, max));
                    else
                        return;
                    e.preventDefault();
                }, children: [ticks, _jsx("div", { className: "absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 rounded-full bg-(--ctl)" })] }), children && _jsx("div", { className: "mt-2 flex justify-center", children: children })] }));
}
