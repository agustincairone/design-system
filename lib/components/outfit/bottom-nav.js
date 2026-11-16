import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { OUTFIT as C } from "./palette.js";
// Barra de abajo: íconos de 24px, el activo en negro con un puntito de 4px debajo.
export function BottomNav({ items, value, onChange, fixed = true }) {
    return (_jsx("nav", { style: { position: fixed ? "fixed" : "relative", bottom: 0, left: 0, right: 0, height: 84, background: "transparent", display: "flex", alignItems: "center", zIndex: 50 }, children: items.map(({ key, icon: Icon, label }) => {
            const on = value === key;
            return (_jsxs("button", { type: "button", "aria-label": label, onClick: () => onChange(key), style: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", background: "transparent", border: "none", gap: 6 }, children: [_jsx(Icon, { style: { width: 24, height: 24, color: on ? C.ink : C.muted } }), _jsx("span", { style: { width: 4, height: 4, borderRadius: "50%", background: on ? C.ink : "transparent" } })] }, key));
        }) }));
}
