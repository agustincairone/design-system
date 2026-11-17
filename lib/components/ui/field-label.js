import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "../../lib/utils.js";
// Label de un campo: letra normal en gris, del mismo tamaño que el texto del input
// (16px en celular, 14px en pantallas grandes), 6px arriba del input.
// `right` muestra algo a la derecha (ej: "2/3").
export function FieldLabel({ children, right, htmlFor, className, }) {
    return (_jsxs("div", { "data-slot": "field-label", className: cn("mb-1.5 flex items-center", className), children: [_jsx("label", { htmlFor: htmlFor, className: "text-base text-muted-foreground md:text-sm", children: children }), right && _jsx("span", { className: "ml-auto text-base text-muted-foreground md:text-sm", children: right })] }));
}
