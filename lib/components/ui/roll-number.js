import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "../../lib/utils.js";
// Número que gira al aparecer (efecto tragamonedas): cada cifra pasa por números al azar y en un segundo
// frena en la real, de izquierda a derecha. Lo demás ($, puntos) queda quieto. Vuelve a girar cuando
// cambia el valor (ej: al pasar de mes). Con "reducir movimiento" en el celular, aparece directo.
// Ej: la deuda y el total del mes de pay. Va con el tamaño y el color que le ponga la app.
//
// Las cifras se pintan directo sobre el texto (sin volver a dibujar la pantalla en cada cambio), así no
// gasta batería. El lector de pantalla lee sólo el número final.
export function RollNumber({ value, format = String, duration = 1000, className, }) {
    const final = format(value);
    const ref = React.useRef(null);
    React.useLayoutEffect(() => {
        const el = ref.current;
        if (!el)
            return;
        const still = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
        if (still || duration <= 0) {
            el.textContent = final;
            return;
        }
        const chars = [...final];
        const digits = chars.flatMap((c, i) => (c >= "0" && c <= "9" ? [i] : []));
        const start = performance.now();
        let timer = 0;
        const paint = () => {
            const t = (performance.now() - start) / duration;
            if (t >= 1) {
                el.textContent = final;
                window.clearInterval(timer);
                return;
            }
            const out = [...chars];
            digits.forEach((pos, k) => {
                // todas giran el primer 40% del tiempo; después frenan de a una, de izquierda a derecha
                const stopsAt = 0.4 + (0.6 * (k + 1)) / digits.length;
                if (t < stopsAt)
                    out[pos] = String(k === 0 ? 1 + Math.floor(Math.random() * 9) : Math.floor(Math.random() * 10));
            });
            el.textContent = out.join("");
        };
        paint();
        timer = window.setInterval(paint, 50);
        return () => window.clearInterval(timer);
    }, [final, duration]);
    return (_jsxs("span", { "data-slot": "roll-number", className: cn("live-number", className), children: [_jsx("span", { className: "sr-only", children: final }), _jsx("span", { ref: ref, "aria-hidden": true })] }));
}
