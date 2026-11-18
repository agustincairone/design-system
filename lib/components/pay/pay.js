import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Estilo "pay": componentes copiados tal cual de pay-tracker (src/App.jsx), con sus
// mismos colores y medidas. Sirven para compararlos en la guía con los del sistema.
// No usar en apps nuevas: cuando la persona elige, se pasa al componente del sistema.
import * as React from "react";
export const PAY = { green: "#004225", white: "#FFFFFF", bg: "#F7F7F7", border: "#DDDDDD", text: "#A4A4A4", dark: "#555555", muted: "#BBBBBB", ok: "#4CAF50", red: "#E53935" };
export const PAY_FONT = "system-ui,sans-serif";
const { green: R, white: W, border: BD, text: TX, dark: TD, muted: MU } = PAY;
const Arrow = ({ rotate = 0, color = "currentColor" }) => (_jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", style: { transform: `rotate(${rotate}deg)`, flexShrink: 0, transition: "transform 0.2s" }, children: _jsx("path", { d: "M4 6l4 4 4-4", stroke: color, strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) }));
const ChartIcon = ({ color }) => (_jsxs("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("line", { x1: "18", y1: "20", x2: "18", y2: "10" }), _jsx("line", { x1: "12", y1: "20", x2: "12", y2: "4" }), _jsx("line", { x1: "6", y1: "20", x2: "6", y2: "14" })] }));
/** Encabezado verde de cada pantalla, con emoji, nombre y botones redondos */
export function PayHeader({ emoji, title, sub, onBack }) {
    return (_jsxs("div", { style: { background: R, padding: "0 20px", height: 80, boxSizing: "border-box", display: "flex", alignItems: "center", gap: 12, borderRadius: "0 0 16px 16px" }, children: [onBack && _jsx("button", { onClick: onBack, style: { background: "none", border: "none", color: W, cursor: "pointer", padding: 0, lineHeight: 1, opacity: 0.8, display: "flex", alignItems: "center" }, children: _jsx(Arrow, { rotate: 90 }) }), emoji && _jsx("span", { style: { fontSize: 40, userSelect: "none" }, children: emoji }), _jsxs("div", { style: { flex: 1 }, children: [_jsx("div", { style: { color: W, fontSize: 19, fontWeight: 500 }, children: title }), sub && _jsx("div", { style: { color: "rgba(255,255,255,0.6)", fontSize: 14 }, children: sub })] }), _jsx("button", { style: { background: W, border: "none", borderRadius: "50%", width: 40, height: 40, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }, children: _jsx(ChartIcon, { color: R }) })] }));
}
/** Mes con flechas redondas a los costados */
export function PayMonthNav({ month, year, onPrev, onNext }) {
    const round = { border: `1px solid ${BD}`, background: W, borderRadius: "50%", width: 36, height: 36, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 };
    return (_jsxs("div", { style: { display: "flex", alignItems: "center", gap: 12 }, children: [_jsx("button", { onClick: onPrev, style: { ...round, color: R }, children: _jsx(Arrow, { rotate: 90 }) }), _jsxs("span", { style: { fontWeight: 500, fontSize: 17, flex: 1, textAlign: "center", color: TD }, children: [month, " ", _jsx("span", { style: { color: TX, fontWeight: 400 }, children: year })] }), _jsx("button", { onClick: onNext, style: { ...round, color: TX }, children: _jsx(Arrow, { rotate: -90 }) })] }));
}
/** Caja blanca con borde: la base de todas las tarjetas de pay */
export const payBox = { background: W, border: `1px solid ${BD}`, borderRadius: 12 };
/** Deuda total con el botón "Saldar deuda" */
export function PayDebtCard({ amount, from, to, onSettle }) {
    return (_jsxs("div", { style: { ...payBox, padding: "18px 20px", position: "relative" }, children: [_jsx("div", { style: { fontSize: 14, color: TX, marginBottom: 6 }, children: "Deuda total" }), _jsx("div", { style: { fontSize: 24, fontWeight: 500, color: R }, children: amount }), _jsxs("div", { style: { fontSize: 15, color: TX, marginTop: 3 }, children: [_jsx("span", { style: { color: R, fontWeight: 500 }, children: from }), " le debe a ", _jsx("span", { style: { color: R, fontWeight: 500 }, children: to })] }), _jsx("button", { onClick: onSettle, style: { position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", background: R, border: "none", color: W, fontSize: 14, cursor: "pointer", fontWeight: 500, padding: "6px 12px", borderRadius: 8, whiteSpace: "nowrap" }, children: "Saldar deuda" })] }));
}
/** "Total del mes": tarjeta que se abre con una flecha */
export function PayTotalCard({ label, amount, children }) {
    const [open, setOpen] = React.useState(false);
    return (_jsxs("div", { style: { ...payBox, overflow: "hidden" }, children: [_jsxs("button", { onClick: () => setOpen((p) => !p), style: { width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 16px", background: "none", border: "none", cursor: "pointer", textAlign: "left", boxSizing: "border-box" }, children: [_jsxs("div", { children: [_jsx("div", { style: { fontSize: 14, color: TX }, children: label }), _jsx("div", { style: { fontSize: 22, fontWeight: 500, color: R, marginTop: 4 }, children: amount })] }), _jsx(Arrow, { rotate: open ? 180 : 0, color: MU })] }), open && children && _jsx("div", { style: { borderTop: `1px solid ${BD}` }, children: children })] }));
}
/** Pestañas con total abajo (contado / tarjeta), raya verde debajo de la elegida */
export function PayTotalTabs({ options, value, onChange }) {
    return (_jsx("div", { style: { display: "flex", borderBottom: `1px solid ${BD}` }, children: options.map((o, i) => {
            const on = o.value === value;
            return (_jsxs("button", { onClick: () => onChange(o.value), style: { flex: 1, height: 68, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", border: "none", borderRight: i < options.length - 1 ? `1px solid ${BD}` : "none", borderBottom: on ? `2px solid ${R}` : "2px solid transparent", background: "none", cursor: "pointer", gap: 2 }, children: [_jsx("span", { style: { fontSize: 15, color: on ? R : MU, fontWeight: on ? 500 : 400 }, children: o.label }), o.total && _jsx("span", { style: { fontSize: 13, color: on ? TX : MU, fontWeight: 400 }, children: o.total })] }, o.value));
        }) }));
}
/** Un gasto de la lista: emoji, nombre, fecha, quién pagó y monto */
export function PayExpenseRow({ emoji, name, date, payer, split, amount, last }) {
    return (_jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${last ? "transparent" : BD}` }, children: [_jsxs("div", { style: { display: "flex", alignItems: "center", gap: 10, minWidth: 0, flex: 1 }, children: [_jsx("span", { style: { fontSize: 20, flexShrink: 0 }, children: emoji }), _jsxs("div", { style: { minWidth: 0 }, children: [_jsxs("div", { style: { display: "flex", alignItems: "center", gap: 6 }, children: [_jsx("span", { style: { fontSize: 15, color: TD }, children: name }), _jsx("span", { style: { fontSize: 12, color: TX, flexShrink: 0 }, children: date })] }), payer && _jsxs("div", { style: { fontSize: 13, color: TX, marginTop: 2 }, children: [_jsx("span", { style: { color: R, fontWeight: 500 }, children: payer }), split && _jsxs("span", { style: { color: MU }, children: [" \u00B7 ", split] })] })] })] }), _jsx("span", { style: { fontSize: 16, fontWeight: 500, color: R, marginRight: 12 }, children: amount }), _jsx("span", { style: { color: MU, fontSize: 18, lineHeight: 1 }, children: "\u22EE" })] }));
}
/** Botones grandes para elegir uno (¿Quién pagó?, ¿Cómo se divide?) */
export function PayChoice({ label, options, value, onChange }) {
    return (_jsxs("div", { children: [label && _jsx(PayLabel, { children: label }), _jsx("div", { style: { display: "flex", gap: 8 }, children: options.map((o) => {
                    const on = o.value === value;
                    return _jsx("button", { onClick: () => onChange(o.value), style: { flex: 1, padding: "10px", border: `1px solid ${on ? R : BD}`, borderRadius: 8, background: on ? R : W, color: on ? W : TD, fontSize: 16, cursor: "pointer", fontWeight: on ? 500 : 400, height: 46, boxSizing: "border-box" }, children: o.label }, String(o.value));
                }) })] }));
}
/** Chips redondos para filtrar (Todos / Agus / Sofi) */
export function PayChips({ options, value, onChange }) {
    return (_jsx("div", { style: { display: "flex", gap: 6, flexWrap: "wrap" }, children: options.map((p) => _jsx("button", { onClick: () => onChange(p), style: { padding: "5px 14px", borderRadius: 16, border: `1px solid ${value === p ? R : BD}`, background: value === p ? R : W, color: value === p ? W : TD, fontSize: 14, cursor: "pointer" }, children: p }, p)) }));
}
/** Contado / tarjeta con dos emojis */
export function PayToggle({ card, onChange }) {
    const b = (on) => ({ padding: "12px 8px", background: on ? W : "#EBEBEB", border: "none", cursor: "pointer", fontSize: 20, display: "flex", alignItems: "center", lineHeight: 1 });
    return (_jsxs("div", { style: { display: "flex", border: `1px solid ${BD}`, borderRadius: 8, overflow: "hidden", flexShrink: 0 }, children: [_jsx("button", { onClick: () => onChange(false), title: "Contado", style: b(!card), children: "\uD83D\uDCB5" }), _jsx("button", { onClick: () => onChange(true), title: "Tarjeta", style: { ...b(card), borderLeft: `1px solid ${BD}` }, children: "\uD83D\uDCB3" })] }));
}
export const PayLabel = ({ children }) => _jsx("div", { style: { fontSize: 14, color: TX, marginBottom: 6 }, children: children });
export function PayInput(props) {
    return _jsx("input", { ...props, style: { width: "100%", padding: "10px 12px", border: `1px solid ${BD}`, borderRadius: 8, fontSize: 16, color: props.value ? TD : MU, background: W, outline: "none", boxSizing: "border-box" } });
}
export function PaySelect({ value, onChange, children }) {
    return (_jsxs("div", { style: { position: "relative" }, children: [_jsx("select", { value: value, onChange: onChange, style: { width: "100%", padding: "10px 36px 10px 12px", border: `1px solid ${BD}`, borderRadius: 8, fontSize: 16, color: TD, background: W, outline: "none", appearance: "none", WebkitAppearance: "none" }, children: children }), _jsx("span", { style: { position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", display: "flex" }, children: _jsx(Arrow, { color: MU }) })] }));
}
/** Cancelar + Guardar (gris cuando todavía no se puede guardar) */
export function PayActions({ disabled, onCancel, onSave, saveLabel = "Guardar" }) {
    const base = { flex: 1, padding: "12px", borderRadius: 8, fontSize: 15, fontWeight: 400, height: 46, boxSizing: "border-box" };
    return (_jsxs("div", { style: { display: "flex", gap: 8 }, children: [_jsx("button", { onClick: onCancel, style: { ...base, border: `1px solid ${BD}`, background: W, color: TD, cursor: "pointer" }, children: "Cancelar" }), _jsx("button", { onClick: onSave, disabled: disabled, style: { ...base, border: "none", background: disabled ? "#E8E8E8" : R, color: disabled ? MU : W, cursor: disabled ? "not-allowed" : "pointer" }, children: saveLabel })] }));
}
/** Hoja que sube desde abajo, con la rayita gris arriba. inline = se dibuja en su lugar (para la guía) */
export function PaySheet({ onClose, children, inline }) {
    return (_jsx("div", { style: { position: inline ? "absolute" : "fixed", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "flex-end", justifyContent: "center", zIndex: 100, fontFamily: PAY_FONT }, onClick: onClose, children: _jsxs("div", { style: { background: W, borderRadius: "14px 14px 0 0", padding: "24px", width: "100%", maxWidth: 480, boxSizing: "border-box", maxHeight: "90%", overflowY: "auto" }, onClick: (e) => e.stopPropagation(), children: [_jsx("div", { style: { width: 36, height: 4, background: BD, borderRadius: 2, margin: "0 auto 20px" } }), children] }) }));
}
export const PaySheetTitle = ({ children }) => _jsx("div", { style: { fontSize: 18, fontWeight: 500, color: R }, children: children });
/** Botón verde flotante "+ Agregar gasto". inline = sin fijarlo abajo de la pantalla (para la guía) */
export function PayFab({ label = "Agregar gasto", onClick, inline }) {
    return (_jsxs("button", { onClick: onClick, style: { ...(inline ? {} : { position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)" }), borderRadius: 100, background: R, color: W, border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, padding: "14px 24px", fontSize: 15, fontWeight: 500, whiteSpace: "nowrap" }, children: [_jsx("span", { style: { fontSize: 20, lineHeight: 1, marginBottom: 1 }, children: "+" }), label] }));
}
/** Fila grande del inicio: emoji, nombre, integrantes y flecha */
export function PayListCard({ emoji, title, sub, onClick }) {
    return (_jsxs("button", { onClick: onClick, style: { ...payBox, padding: "18px 20px", display: "flex", alignItems: "center", gap: 14, cursor: "pointer", textAlign: "left", width: "100%", boxSizing: "border-box" }, children: [_jsx("span", { style: { fontSize: 32 }, children: emoji }), _jsxs("div", { children: [_jsx("div", { style: { fontSize: 17, fontWeight: 500, color: TD }, children: title }), sub && _jsx("div", { style: { fontSize: 14, color: TX, marginTop: 2 }, children: sub })] }), _jsx("span", { style: { marginLeft: "auto", display: "flex" }, children: _jsx(Arrow, { rotate: -90, color: MU }) })] }));
}
/** "+ Crear nuevo grupo" con borde punteado */
export function PayDashedAdd({ children, onClick }) {
    return _jsx("button", { onClick: onClick, style: { width: "100%", padding: "14px", border: `1.5px dashed ${BD}`, borderRadius: 12, background: "none", color: TX, fontSize: 15, cursor: "pointer", boxSizing: "border-box" }, children: children });
}
/** Cajita de dato de Análisis: título, monto verde y aclaración */
export function PayStat({ label, value, sub }) {
    return (_jsxs("div", { style: { background: W, border: `1px solid ${BD}`, borderRadius: 10, padding: "12px" }, children: [_jsx("div", { style: { fontSize: 13, color: TX }, children: label }), _jsx("div", { style: { fontSize: 16, fontWeight: 500, color: R, marginTop: 4 }, children: value }), sub && _jsx("div", { style: { fontSize: 13, color: TX, marginTop: 2 }, children: sub })] }));
}
/** Título gris de sección ("Mis gastos", "Mis grupos") */
export const PaySectionLabel = ({ children }) => _jsx("div", { style: { fontSize: 14, color: TX }, children: children });
/** Nombre del grupo con el botón del emoji cuadrado a la izquierda (al tocarlo abre la lista de emojis) */
export function PayEmojiField({ emoji, placeholder, onEmoji }) {
    return (_jsxs("div", { style: { display: "flex", gap: 8 }, children: [_jsx("button", { onClick: onEmoji, style: { flexShrink: 0, width: 48, height: 48, fontSize: 28, border: `1px solid ${BD}`, borderRadius: 8, background: W, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }, children: emoji }), _jsx(PayInput, { placeholder: placeholder })] }));
}
/** Elegir varias (Splits disponibles): filas con borde y casilla; la elegida con borde verde y fondo gris */
export function PayCheckList({ options, value, onToggle }) {
    return (_jsx("div", { style: { display: "flex", flexDirection: "column", gap: 8 }, children: options.map((o) => {
            const on = value.includes(o);
            return (_jsxs("button", { onClick: () => onToggle(o), style: { display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", border: `1px solid ${on ? R : BD}`, borderRadius: 8, background: on ? PAY.bg : W, cursor: "pointer", textAlign: "left", height: 46, boxSizing: "border-box", width: "100%" }, children: [_jsx("div", { style: { width: 18, height: 18, borderRadius: 4, border: `2px solid ${on ? R : BD}`, background: on ? R : W, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }, children: on && _jsx("svg", { width: "10", height: "10", viewBox: "0 0 10 10", children: _jsx("path", { d: "M2 5l2.5 2.5L8 3", stroke: W, strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", fill: "none" }) }) }), _jsx("span", { style: { fontSize: 15, color: TD, fontWeight: on ? 500 : 400 }, children: o })] }, o));
        }) }));
}
/** Fila de Análisis que se abre: mes, IPC, total y flechita; el detalle abajo sobre fondo gris con línea arriba */
export function PayExpandRow({ title, sub, total, items, last }) {
    const [open, setOpen] = React.useState(false);
    const has = !!items?.length;
    return (_jsxs("div", { style: { borderBottom: `1px solid ${last ? "transparent" : BD}` }, children: [_jsxs("button", { onClick: () => has && setOpen((o) => !o), style: { width: "100%", display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "12px 16px", background: "none", border: "none", cursor: has ? "pointer" : "default", textAlign: "left", boxSizing: "border-box" }, children: [_jsxs("div", { children: [_jsx("div", { style: { fontSize: 15, color: TD }, children: title }), sub && _jsx("div", { style: { fontSize: 13, color: TX, marginTop: 2 }, children: sub })] }), _jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8 }, children: [_jsx("div", { style: { fontSize: 15, fontWeight: 500, color: R }, children: total }), has && _jsx(Arrow, { rotate: open ? 180 : 0, color: MU })] })] }), open && has && (_jsx("div", { style: { background: PAY.bg, padding: "8px 16px 12px", borderTop: `1px solid ${BD}` }, children: items.map(([l, v]) => _jsxs("div", { style: { display: "flex", justifyContent: "space-between", padding: "6px 0" }, children: [_jsx("span", { style: { fontSize: 15, color: TD }, children: l }), _jsx("span", { style: { fontSize: 15, color: TX, fontWeight: 500 }, children: v })] }, l)) }))] }));
}
