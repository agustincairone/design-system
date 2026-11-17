import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "../../lib/utils.js";
// Vúmetro de LEDs: verde, amarillo y rojo arriba (rojo = satura).
// Para que no caliente la compu, los LEDs están pintados fijos y encima hay una
// "tapa" que se achica con transform. No le pases el nivel por props (re-render a
// 30 fps): agarrá el elemento con `ref` y llamá a paintMeter(el, prendidos).
// Con `fill`, llena el alto disponible y los LEDs se estiran (ej: columna al costado).
export function LevelMeter({ segments = 10, fill, className, ref, }) {
    return (_jsxs("div", { ref: ref, "data-slot": "level-meter", "data-segments": segments, "aria-hidden": "true", className: cn("relative flex flex-col gap-[3px] [contain:layout_paint]", fill ? "h-full" : "p-0.5", className), children: [Array.from({ length: segments }, (_, i) => (_jsx("span", { className: cn(fill ? "w-2 flex-1 rounded-[2px]" : "h-[7px] w-2 rounded-[2px]", i < 2 ? "bg-destructive" : i < 4 ? "bg-warning" : "bg-success") }, i))), _jsx("div", { "data-slot": "level-meter-cover", className: "absolute inset-0 origin-top bg-card/85 will-change-transform in-data-[variant=inset]:bg-inset/85" })] }));
}
/** Prende `lit` LEDs (0 = apagado). Sólo toca el DOM si cambió. */
export function paintMeter(el, lit) {
    if (!el)
        return;
    const segments = Number(el.dataset.segments) || 10;
    const n = Math.max(0, Math.min(segments, Math.round(lit)));
    if (el.dataset.lit === String(n))
        return;
    el.dataset.lit = String(n);
    const cover = el.querySelector('[data-slot="level-meter-cover"]');
    if (cover)
        cover.style.transform = `scaleY(${(segments - n) / segments})`;
}
