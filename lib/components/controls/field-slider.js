import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "../../lib/utils.js";
// Campo-slider: una píldora con el nombre adentro y el valor a la derecha.
// Arrastrás de costado en cualquier parte para cambiarlo (Shift = fino). Flechas del teclado.
// Si tiene pocos valores posibles (`step` grande), muestra un punto por cada uno;
// los que quedan debajo del relleno se ven gris oscuro (y del tono fuerte al pasar el mouse o arrastrar).
// La rayita (handle) es siempre del color de la app. Al pasar el mouse o arrastrar,
// el relleno se pinta del color de la app (y la rayita pasa al tono fuerte para que se vea).
// orientation="vertical": la píldora parada; se llena de abajo hacia arriba, el número va
// arriba y el nombre abajo. Con `hideText`, la píldora queda limpia (nombre y valor van afuera). Se arrastra para arriba (más) o para abajo (menos). Alto: h-full o el que le des.
// Puntos debajo del relleno: gris oscuro en reposo; tono fuerte cuando el relleno se pinta (hover / arrastrando)
const FILLED_DOT = (active) => active
    ? "bg-brand-strong"
    : "bg-muted-foreground group-hover/fs:bg-brand-strong";
const BASE = 0.36; // parte de la píldora que siempre ocupa el relleno (donde va el nombre)
export function FieldSlider({ label, value, min, max, step = 1, defaultValue, format = String, onChange, orientation = "horizontal", hideText = false, className, }) {
    const ref = React.useRef(null);
    const start = React.useRef(null);
    const [active, setActive] = React.useState(false);
    const clamp = (v) => Math.min(max, Math.max(min, v));
    const snap = (v) => Math.round(v / step) * step;
    const n = (value - min) / (max - min || 1);
    const positions = Math.round((max - min) / step) + 1;
    const showDots = positions <= 12;
    const vertical = orientation === "vertical";
    // Vertical: cada valor tiene su lugar a la misma distancia, con el mismo margen (PAD) arriba y abajo.
    // La rayita queda centrada en el lugar del valor y el relleno llega PAD por encima de ella.
    const PAD = hideText ? 20 : 44; // px (con texto, deja lugar para el número y el nombre)
    const at = (p) => `calc(${PAD}px + ${p} * (100% - ${2 * PAD}px))`;
    const handlers = {
        onPointerDown: (e) => {
            e.currentTarget.setPointerCapture(e.pointerId);
            start.current = { x: vertical ? e.clientY : e.clientX, v: value };
            setActive(true);
        },
        onPointerMove: (e) => {
            if (!start.current || !ref.current)
                return;
            const size = vertical
                ? ref.current.offsetHeight - 2 * PAD
                : ref.current.offsetWidth * (1 - BASE);
            const fine = e.shiftKey ? 0.25 : 1;
            const d = vertical
                ? start.current.x - e.clientY
                : e.clientX - start.current.x;
            onChange(clamp(snap(start.current.v + (d / size) * (max - min) * fine)));
        },
        onPointerUp: () => {
            start.current = null;
            setActive(false);
        },
        onPointerCancel: () => {
            start.current = null;
            setActive(false);
        },
        onDoubleClick: () => defaultValue !== undefined && onChange(defaultValue),
        onKeyDown: (e) => {
            if (e.key === "ArrowRight" || e.key === "ArrowUp")
                onChange(clamp(snap(value + step)));
            else if (e.key === "ArrowLeft" || e.key === "ArrowDown")
                onChange(clamp(snap(value - step)));
            else
                return;
            e.preventDefault();
        },
    };
    if (vertical) {
        return (_jsxs("div", { ref: ref, "data-slot": "field-slider", "data-orientation": "vertical", role: "slider", tabIndex: 0, "aria-label": label, "aria-orientation": "vertical", "aria-valuemin": min, "aria-valuemax": max, "aria-valuenow": value, className: cn("group/fs relative flex h-full min-h-48 w-14 cursor-ns-resize touch-none flex-col items-center overflow-hidden rounded-2xl bg-secondary outline-none select-none focus-visible:ring-4 focus-visible:ring-ring/40 in-data-[variant=inset]:bg-card", className), ...handlers, children: [_jsx("div", { className: cn("absolute inset-x-0 bottom-0 rounded-2xl transition-colors", active
                        ? "bg-brand"
                        : "bg-muted-foreground/15 group-hover/fs:bg-brand"), style: {
                        height: `calc(${2 * PAD}px + ${n} * (100% - ${2 * PAD}px))`,
                    }, children: _jsx("span", { style: { top: PAD - 1 }, className: cn("absolute left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full transition-colors", active
                            ? "bg-brand-strong"
                            : "bg-brand group-hover/fs:bg-brand-strong") }) }), showDots &&
                    Array.from({ length: positions }, (_, i) => {
                        const p = i / (positions - 1);
                        // donde está la rayita no va punto; con número arriba, los dos últimos lugares quedan libres
                        if (Math.abs(p - n) < 1e-6 || (!hideText && i >= positions - 2))
                            return null;
                        return (_jsx("span", { className: cn("absolute left-1/2 dot -translate-x-1/2 translate-y-1/2 transition-colors", p < n ? FILLED_DOT(active) : "bg-muted-foreground/40"), style: { bottom: at(p) } }, i));
                    }), !hideText && (_jsxs(_Fragment, { children: [_jsx("span", { className: "relative pt-4 font-medium live-number", children: format(value) }), _jsx("span", { className: cn("relative mt-auto pb-3 text-xs transition-colors", active
                                ? "text-brand-foreground"
                                : "text-muted-foreground group-hover/fs:text-brand-foreground"), children: label })] }))] }));
    }
    return (_jsxs("div", { ref: ref, "data-slot": "field-slider", role: "slider", tabIndex: 0, "aria-label": label, "aria-valuemin": min, "aria-valuemax": max, "aria-valuenow": value, className: cn("group/fs relative flex h-12 w-full cursor-ew-resize touch-none items-center overflow-hidden rounded-2xl bg-secondary outline-none select-none focus-visible:ring-4 focus-visible:ring-ring/40 in-data-[variant=inset]:bg-card", className), ...handlers, children: [_jsx("div", { className: cn("absolute inset-y-0 left-0 rounded-2xl transition-colors", active ? "bg-brand" : "bg-muted-foreground/15 group-hover/fs:bg-brand"), style: { width: `${(BASE + n * (1 - BASE)) * 100}%` }, children: _jsx("span", { className: cn("absolute top-1/2 right-3 h-4 w-0.5 -translate-y-1/2 rounded-full transition-colors", active
                        ? "bg-brand-strong"
                        : "bg-brand group-hover/fs:bg-brand-strong") }) }), showDots &&
                Array.from({ length: positions }, (_, i) => {
                    const p = i / (positions - 1);
                    // donde está la rayita no va punto; el último lugar es donde va el número
                    if (Math.abs(p - n) < 1e-6 || i === positions - 1)
                        return null;
                    return (_jsx("span", { className: cn("absolute top-1/2 dot -translate-1/2", p < n ? FILLED_DOT(active) : "bg-muted-foreground/40"), style: { left: `calc(${(BASE + p * (1 - BASE)) * 100}% - 13px)` } }, i));
                }), _jsx("span", { className: cn("relative pl-4 transition-colors", active
                    ? "text-brand-foreground"
                    : "text-muted-foreground group-hover/fs:text-brand-foreground"), children: label }), _jsx("span", { className: "relative ml-auto pr-4 font-medium live-number", children: format(value) })] }));
}
