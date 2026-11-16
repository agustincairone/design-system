import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "../../lib/utils.js";
import { Slider } from "../ui/slider.js";
import { ParamButtons } from "./param-buttons.js";
// Slider de un parámetro de audio: etiqueta, botones ⏻/S, el slider del sistema y el valor.
// - Doble clic: vuelve al valor por defecto.
// - `log`: recorrido logarítmico (para frecuencias, tiempos).
// - `color`: color del control (por defecto, el de la app).
// - `layout="row"`: compacto, para apilar varios: arriba nombre · valor · botones, abajo el slider a lo ancho.
export function ParamSlider({ label, value, min, max, step = 0.01, log = false, defaultValue, format = String, onChange, color, off, onPower, soloed, onSolo, offText = "OFF", layout = "stack", className, }) {
    const toPos = (v) => log ? Math.log(v / min) / Math.log(max / min) : v;
    const fromPos = (p) => (log ? min * Math.pow(max / min, p) : p);
    const slider = (_jsx(Slider, { "aria-label": label, color: color, min: log ? 0 : min, max: log ? 1 : max, step: log ? 0.001 : step, value: [toPos(value)], onValueChange: ([p]) => onChange(fromPos(p)), onDoubleClick: () => defaultValue !== undefined && onChange(defaultValue), className: cn(off && "opacity-30") }));
    const valueText = (_jsx("span", { className: cn("font-mono text-sm font-semibold live-number", layout === "row" && "shrink-0 text-right", off && "text-muted-foreground", soloed && "text-brand-text"), children: off ? offText : format(value) }));
    if (layout === "row") {
        return (_jsxs("div", { "data-slot": "param-slider", className: cn("flex min-w-0 flex-col gap-1", className), children: [_jsxs("div", { className: "flex min-h-6 items-center gap-2", children: [_jsx("span", { className: "min-w-0 flex-1 truncate eyebrow", children: label }), valueText, _jsx(ParamButtons, { off: off, onPower: onPower, soloed: soloed, onSolo: onSolo })] }), slider] }));
    }
    return (_jsxs("div", { "data-slot": "param-slider", className: cn("flex min-w-0 flex-col gap-1", className), children: [_jsxs("div", { className: "flex min-h-5 flex-wrap items-center justify-between gap-1", children: [_jsx("span", { className: "shrink-0 eyebrow", children: label }), _jsx(ParamButtons, { off: off, onPower: onPower, soloed: soloed, onSolo: onSolo })] }), slider, valueText] }));
}
