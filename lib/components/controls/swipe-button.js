import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "../../lib/utils.js";
// Botón para deslizar (de no-coke): para algo que no se deshace fácil, ej: "Tuve una recaída".
// Del color de la app, con un círculo blanco y una flecha a la izquierda: se arrastra hasta el otro lado
// y el blanco va llenando el botón (el texto cambia de color al pasar). Si se suelta antes, vuelve.
// Al llegar, queda lleno medio segundo y llama a `onConfirm`. Con el teclado: Enter o espacio.
// Mide como la barra de abajo (64px) y va en su lugar, fijo abajo de la pantalla.
const KNOB = "3.5rem"; // el círculo: el alto del botón menos el borde de 4px de cada lado
export function SwipeButton({ label, onConfirm, className }) {
    const [p, setP] = React.useState(0); // cuánto se arrastró, de 0 a 1
    const [back, setBack] = React.useState(false); // volviendo solo, con animación
    const inner = React.useRef(null);
    const drag = React.useRef(null);
    const done = React.useRef(false);
    const release = () => {
        setBack(true);
        setP(0);
        window.setTimeout(() => setBack(false), 300);
    };
    const onPointerDown = (e) => {
        if (done.current || !inner.current)
            return;
        e.currentTarget.setPointerCapture(e.pointerId);
        const w = inner.current.clientWidth;
        drag.current = { x: e.clientX, travel: w - inner.current.clientHeight };
        setBack(false);
    };
    const onPointerMove = (e) => {
        const d = drag.current;
        if (!d)
            return;
        const next = Math.max(0, Math.min(1, (e.clientX - d.x) / d.travel));
        setP(next);
        if (next >= 0.99) {
            drag.current = null;
            done.current = true;
            setP(1);
            window.setTimeout(() => {
                onConfirm();
                done.current = false;
                release();
            }, 500);
        }
    };
    const onPointerUp = () => {
        if (!drag.current)
            return;
        drag.current = null;
        release();
    };
    const fill = `calc(${KNOB} + ${p} * (100% - ${KNOB}))`;
    const anim = back ? "duration-300 ease-out" : "duration-0";
    return (_jsx("div", { "data-slot": "swipe-button", role: "button", tabIndex: 0, "aria-label": `${label} (deslizá hasta el final para confirmar)`, onKeyDown: (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onConfirm();
            }
        }, onPointerDown: onPointerDown, onPointerMove: onPointerMove, onPointerUp: onPointerUp, onPointerCancel: onPointerUp, className: cn("h-16 w-full cursor-grab touch-none rounded-full bg-brand p-1 text-sm font-medium select-none outline-none focus-visible:ring-3 focus-visible:ring-ring/50 active:cursor-grabbing", className), children: _jsxs("div", { ref: inner, className: "relative h-full", children: [_jsx("div", { className: cn("absolute inset-y-0 left-0 rounded-full bg-brand-foreground transition-[width]", anim), style: { width: fill } }), _jsx("div", { "aria-hidden": true, className: cn("absolute inset-0 flex items-center justify-center text-brand-text transition-[clip-path]", anim), style: { clipPath: `inset(0 calc(100% - ${fill}) 0 0)` }, children: label }), _jsx("div", { "aria-hidden": true, className: cn("absolute inset-0 flex items-center justify-center text-brand-foreground transition-[clip-path]", anim), style: { clipPath: `inset(0 0 0 ${fill})` }, children: label }), _jsx(ArrowRight, { "aria-hidden": true, className: cn("pointer-events-none absolute top-1/2 size-5 -translate-1/2 text-brand-text transition-[left]", anim), style: { left: `calc(${fill} - ${KNOB} / 2)` } })] }) }));
}
