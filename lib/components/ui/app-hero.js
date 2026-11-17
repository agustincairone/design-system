import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "../../lib/utils.js";
const EYEBROW = { caps: "eyebrow", plain: "eyebrow-plain" };
// Número de puntitos. Con `digits`, completa con ceros apagados (07, 012).
export function Readout({ value, digits, className }) {
    const text = String(value);
    const pad = digits && typeof value === "number" ? "0".repeat(Math.max(0, digits - text.length)) : "";
    return (_jsxs("span", { "data-slot": "readout", className: cn("live-number font-readout leading-none font-bold", className), children: [pad && _jsx("span", { className: "opacity-20", children: pad }), text] }));
}
export function AppHero({ name, jp, description, stats = [], eyebrow = "caps", aside, className, }) {
    return (_jsxs("header", { "data-slot": "app-hero", className: cn("flex items-stretch gap-6", className), children: [_jsxs("div", { className: "grid min-w-0 flex-1 grid-cols-[minmax(0,1fr)_auto] gap-x-6 gap-y-3 sm:gap-y-8", children: [_jsxs("div", { className: "row-span-2 self-start sm:row-span-1", children: [_jsx("h1", { className: "title-page", children: name }), _jsx("p", { lang: "ja", className: "mt-2 text-lg leading-none text-brand", children: jp })] }), _jsx("p", { className: cn(EYEBROW[eyebrow], "col-start-2 row-start-1 max-w-40 justify-self-end text-right sm:col-start-1 sm:row-start-2 sm:max-w-none sm:justify-self-start sm:self-end sm:text-left"), children: description }), stats.length > 0 && (_jsx("div", { className: "col-start-2 row-start-2 flex justify-end gap-5 self-end sm:row-span-2 sm:row-start-1", children: stats.map((s) => (_jsxs("div", { className: "flex flex-col items-end gap-1", children: [_jsx(Readout, { value: s.value, digits: s.digits, className: "text-4xl" }), _jsx("span", { className: EYEBROW[eyebrow], children: s.label })] }, s.label))) }))] }), aside] }));
}
// Título de sección con su dato a la derecha (texto gris + número de puntitos).
export function SectionHeader({ title, value, label, digits, eyebrow = "caps", className, }) {
    return (_jsxs("div", { "data-slot": "section-header", className: cn("flex items-baseline justify-between gap-4", className), children: [_jsx("h2", { className: "title-box min-w-0 truncate", children: title }), value != null && value !== "" && (_jsxs("div", { className: "flex shrink-0 items-baseline gap-2", children: [label && _jsx("span", { className: EYEBROW[eyebrow], children: label }), _jsx(Readout, { value: value, digits: digits, className: "text-2xl" })] }))] }));
}
