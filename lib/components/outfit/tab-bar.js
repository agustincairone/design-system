import { jsx as _jsx } from "react/jsx-runtime";
import { OUTFIT as C } from "./palette.js";
// Tab estilo outfit: una fila que ocupa todo el ancho, con divisores finos.
// La elegida se pinta de negro con texto blanco. (Tab estilo 1 = TileGroup.)
export function TabBar({ options, value, onChange, className, }) {
    return (_jsx("div", { role: "tablist", className: "flex flex-shrink-0 border-b " + (className ?? ""), style: { borderColor: C.border }, children: options.map((o, i) => {
            const on = o.value === value;
            return (_jsx("button", { type: "button", role: "tab", "aria-selected": on, onClick: () => onChange(o.value), className: "flex flex-1 items-center justify-center px-2 py-4", style: {
                    fontSize: 14,
                    fontWeight: 400,
                    background: on ? C.ink : C.white,
                    color: on ? C.white : C.muted,
                    borderRight: i < options.length - 1 ? "1px solid " + C.border : "none",
                }, children: o.label }, o.value));
        }) }));
}
