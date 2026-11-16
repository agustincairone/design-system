import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { OUTFIT as C } from "./palette.js";
// Fila de días que se desliza. Elegido = negro; hoy = borde negro; con outfit = puntito.
export function DateStrip({ days, value, onChange }) {
    return (_jsx("div", { className: "flex gap-2 overflow-x-auto", style: { scrollbarWidth: "none", padding: "4px 0" }, children: days.map((d) => {
            const sel = value === d.dateStr;
            return (_jsxs("button", { type: "button", "data-today": d.isToday, onClick: () => onChange(d.dateStr), className: "flex flex-shrink-0 flex-col items-center px-3 py-2 transition-all", style: { background: sel ? C.ink : d.isToday ? C.soft : C.white, border: "1px solid " + (sel ? C.ink : d.isToday ? C.ink : C.border), minWidth: 54, position: "relative", borderRadius: 8 }, children: [d.marked && _jsx("span", { style: { position: "absolute", top: 4, right: 4, width: 6, height: 6, borderRadius: "50%", background: sel ? C.white : C.ink } }), _jsx("span", { className: "text-xs font-medium", style: { color: sel ? C.white : C.ink }, children: d.dayName.slice(0, 3) }), _jsx("span", { className: "mt-0.5 text-xs", style: { color: sel ? "rgba(255,255,255,0.7)" : C.muted }, children: d.label })] }, d.dateStr));
        }) }));
}
