import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Info } from "lucide-react";
import { cn } from "../../lib/utils.js";
import { Slider } from "../ui/slider.js";
// Barra de una escala corta (ej: el perfil de un vino, de 1 a 5). Diseño de wine con el slider del sistema.
// Caja S gris: arriba el nombre y una ⓘ que abre la explicación; abajo del slider, una marquita
// por cada valor y los dos extremos en gris (ej: "Poco frutado" / "Muy frutado").
export function ScaleSlider({ label, value, onChange, min = 1, max = 5, minLabel, maxLabel, info, className, }) {
    const [showInfo, setShowInfo] = React.useState(false);
    return (_jsxs("div", { "data-slot": "scale-slider", "data-variant": "inset", className: cn("flex flex-col gap-box-xs rounded-box-s bg-inset p-box-s", className), children: [_jsxs("div", { className: "flex items-center justify-between gap-box-xs", children: [_jsx("span", { className: "text-xs font-medium", children: label }), info && (_jsx("button", { type: "button", "aria-label": "Qu\u00E9 es", "aria-expanded": showInfo, onClick: () => setShowInfo((s) => !s), className: "flex rounded-full p-0.5 text-brand-text outline-none focus-visible:ring-2 focus-visible:ring-ring/50", children: _jsx(Info, { className: "size-3.5" }) }))] }), info && showInfo && _jsx("p", { className: "rounded-box-s bg-raised p-box-s text-xs text-muted-foreground", children: info }), _jsxs("div", { className: "flex flex-col", children: [_jsx(Slider, { value: [value], min: min, max: max, step: 1, onValueChange: (v) => onChange(v[0]), "aria-label": typeof label === "string" ? label : undefined }), _jsx("div", { "aria-hidden": true, className: "flex justify-between px-1.5", children: Array.from({ length: max - min + 1 }, (_, i) => (_jsx("span", { className: "h-1 w-px bg-input dark:bg-raised" }, i))) }), (minLabel || maxLabel) && (_jsxs("div", { className: "mt-box-2xs flex justify-between gap-box-xs text-xs text-muted-foreground", children: [_jsx("span", { children: minLabel }), _jsx("span", { className: "text-right", children: maxLabel })] }))] })] }));
}
