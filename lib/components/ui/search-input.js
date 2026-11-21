import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Search, X } from "lucide-react";
import { cn } from "../../lib/utils.js";
import { Button } from "./button.js";
import { Input } from "./input.js";
// Buscador: el campo de texto de siempre (mismo alto, borde y foco) con la lupa adelante
// y una cruz para borrar lo escrito, que aparece sólo cuando hay algo.
function SearchInput({ value, onChange, placeholder = "Buscar...", className, ...props }) {
    return (_jsxs("div", { "data-slot": "search-input", className: cn("relative w-full", className), children: [_jsx(Search, { "aria-hidden": true, className: "pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" }), _jsx(Input, { type: "text", inputMode: "search", enterKeyHint: "search", value: value, onChange: (e) => onChange(e.target.value), placeholder: placeholder, className: "pr-10 pl-10", ...props }), value && (_jsx(Button, { variant: "ghost", size: "icon-xs", "aria-label": "Borrar b\u00FAsqueda", className: "absolute top-1/2 right-2 -translate-y-1/2", onClick: () => onChange(""), children: _jsx(X, {}) }))] }));
}
export { SearchInput };
