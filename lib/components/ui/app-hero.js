import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "../../lib/utils.js";
// Número de puntitos. Con `digits`, completa con ceros apagados (07, 012).
export function Readout({ value, digits, className }) {
    const text = String(value);
    const pad = digits && typeof value === "number" ? "0".repeat(Math.max(0, digits - text.length)) : "";
    return (_jsxs("span", { "data-slot": "readout", className: cn("live-number font-readout leading-none font-bold", className), children: [pad && _jsx("span", { className: "opacity-20", children: pad }), text] }));
}
// Fecha y hora en vivo para el fleje: 17/11 — 14:32:07, se actualiza cada segundo.
// El día y la hora van en el color del texto; la barra, el mes, el guion y los ":" en stone-600 en oscuro
// y un tono más claro en claro (stone-500), para que se diferencien del texto.
const DIM = "text-stone-500 dark:text-stone-600";
// Si el fleje es angosto (menos de 480px, ej: celular) va en dos renglones de 20px (fecha arriba, hora abajo, sin guion),
// así la etiqueta queda a la altura del japonés; si hay lugar, en una sola línea de 25px centrada con el nombre (40px).
// Mide el ancho del fleje (container query "hero").
export function LiveDate({ className }) {
    const [now, setNow] = React.useState(() => new Date());
    React.useEffect(() => {
        const t = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(t);
    }, []);
    const p2 = (n) => String(n).padStart(2, "0");
    return (_jsxs("span", { "data-slot": "live-date", className: cn("live-number font-readout inline-flex flex-col items-end gap-1 text-[20px] leading-none font-bold whitespace-nowrap @[30rem]/hero:mt-[7.5px] @[30rem]/hero:flex-row @[30rem]/hero:gap-0 @[30rem]/hero:text-[26px]", className), children: [_jsxs("span", { children: [p2(now.getDate()), _jsx("span", { className: DIM, children: "/" }), _jsx("span", { className: DIM, children: p2(now.getMonth() + 1) })] }), _jsx("span", { className: cn(DIM, "hidden whitespace-pre @[30rem]/hero:inline"), children: " \u2014 " }), _jsxs("span", { children: [p2(now.getHours()), _jsx("span", { className: DIM, children: ":" }), p2(now.getMinutes()), _jsx("span", { className: DIM, children: ":" }), p2(now.getSeconds())] })] }));
}
export function AppHero({ name, jp, description, stats = [], aside, className, }) {
    return (_jsxs("header", { "data-slot": "app-hero", className: cn("@container/hero relative flex items-stretch gap-6 pb-5", className), children: [_jsxs("div", { className: "grid min-w-0 flex-1 grid-cols-[auto_minmax(0,1fr)] gap-x-6 gap-y-3 sm:gap-y-8", children: [_jsxs("div", { className: cn("row-span-2 self-start", description && "sm:row-span-1"), children: [_jsx("h1", { className: "title-page", children: name }), _jsx("p", { lang: "ja", className: "mt-2 text-lg leading-none whitespace-nowrap text-brand", children: jp })] }), description && _jsx("p", { className: cn("eyebrow", "col-start-2 row-start-1 max-w-40 justify-self-end text-right sm:col-start-1 sm:row-start-2 sm:max-w-none sm:justify-self-start sm:self-end sm:text-left"), children: description }), stats.length > 0 && (_jsx("div", { className: cn("col-start-2 flex justify-end gap-5", description ? "row-start-2 self-end sm:row-span-2 sm:row-start-1" : "row-span-2 row-start-1 self-stretch"), children: stats.map((s) => (_jsxs("div", { className: "flex flex-col items-end justify-between gap-1.5", children: [React.isValidElement(s.value) ? (s.value) : (_jsx(Readout, { value: s.value, digits: s.digits, className: "mt-[7.5px] text-[26px] whitespace-nowrap" })), _jsx("span", { className: "eyebrow", children: s.label })] }, s.label))) }))] }), aside, _jsx("span", { "aria-hidden": true, className: "absolute inset-x-0 bottom-0 h-0.5 bg-[radial-gradient(circle,currentColor_1px,transparent_1.2px)] bg-size-[6px_2px] bg-repeat-x text-stone-300 dark:text-stone-800" })] }));
}
// Título de sección con su dato a la derecha (texto gris + número de puntitos).
// `icon` (ej: el clima) va al mismo tamaño que el número.
export function SectionHeader({ title, value, label, icon, digits, className, }) {
    return (_jsxs("div", { "data-slot": "section-header", className: cn("flex items-baseline justify-between gap-4", className), children: [_jsx("h2", { className: "title-box min-w-0 truncate", children: title }), value != null && value !== "" && (_jsxs("div", { className: "flex shrink-0 items-baseline gap-2", children: [label && _jsx("span", { className: "eyebrow", children: label }), icon && _jsx("span", { className: "text-2xl leading-none", children: icon }), _jsx(Readout, { value: value, digits: digits, className: "text-2xl" })] }))] }));
}
