import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "../../lib/utils.js";
// Columna para un control vertical (ej: FieldSlider orientation="vertical" hideText):
// nombre y valor arriba, afuera del control; el control llena el alto; botones abajo.
// Con `off`, el valor muestra `offText` y el control se atenúa.
export function FieldColumn({ label, value, off, offText = "OFF", hint, buttons, className, children, }) {
    return (_jsxs("div", { "data-slot": "field-column", title: hint, className: cn("flex h-full flex-col items-center gap-1", className), children: [_jsx("span", { className: "eyebrow", children: label }), _jsx("span", { className: cn("live-number font-mono text-sm font-semibold", off && "text-muted-foreground"), children: off ? offText : value }), _jsx("div", { className: cn("my-1 flex min-h-0 flex-1 [&_[data-slot=field-slider]]:min-h-0", off && "pointer-events-none opacity-40"), children: children }), buttons] }));
}
