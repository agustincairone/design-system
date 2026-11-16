import * as React from "react";
// Arrastre con el puntero, compartido por los controles de audio.
// `onMove` recibe cuánto se movió desde que empezó (dx, dy en px) y el evento.
export function useDrag(onStart, onMove) {
    const start = React.useRef(null);
    const end = () => (start.current = null);
    return {
        onPointerDown(e) {
            e.currentTarget.setPointerCapture(e.pointerId);
            start.current = { x: e.clientX, y: e.clientY };
            onStart(e);
        },
        onPointerMove(e) {
            if (start.current)
                onMove(e.clientX - start.current.x, e.clientY - start.current.y, e);
        },
        onPointerUp: end,
        onPointerCancel: end,
    };
}
export const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
export const snap = (v, step) => Math.round(v / step) * step;
