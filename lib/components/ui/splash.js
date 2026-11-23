import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "../../lib/utils.js";
// Pantalla de carga al abrir la app, la misma en todas: el fondo de la página (claro u oscuro) y en el
// centro un círculo que gira, el nombre de la app y abajo su nombre en japonés (como en el fleje), a 16px
// uno del otro. Sin logo. Aparece recién a los 0,3 s, así si la app abre rápido sólo se ve el fondo, sin
// parpadeo.
//
// Va escrita en el index.html de la app (splashHtml), así aparece desde el primer instante, antes de que
// cargue nada. Trae también el aviso de claro u oscuro (el mismo que guarda ThemeProvider), para que salga
// del color correcto. La app la saca cuando ya tiene qué mostrar, con useHideSplash(listo) en el
// componente de arriba de todo, en lugar de mostrar un "Cargando...". Se va con un fundido corto.
// Los colores son los del sistema: fondo, texto, gris secundario, borde de los controles y el color de
// la app para el japonés. Los de respaldo son los mismos valores, para el instante antes de que cargue el tema.
const CSS = ".ds-splash{--splash-bg:#e7e5e4;--splash-fg:#1c1917;--splash-muted:#79716b;--splash-line:#d6d3d1;position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;background:var(--background,var(--splash-bg));font-family:var(--font-sans,system-ui,sans-serif);transition:opacity .2s}" +
    ".dark .ds-splash{--splash-bg:#0c0a09;--splash-fg:#fafaf9;--splash-muted:#a6a09b;--splash-line:#292524}" +
    ".ds-splash-box{display:flex;flex-direction:column;align-items:center;gap:16px;opacity:0;animation:ds-splash-in .3s .3s forwards}" +
    ".ds-splash-spin{width:24px;height:24px;box-sizing:border-box;border-radius:9999px;border:2px solid var(--input,var(--splash-line));border-top-color:var(--muted-foreground,var(--splash-muted));animation:ds-splash-turn .8s linear infinite}" +
    ".ds-splash-name{margin:0;font-size:20px;font-weight:600;line-height:1;letter-spacing:-.02em;color:var(--foreground,var(--splash-fg))}" +
    ".ds-splash-jp{margin:0;font-size:13px;line-height:1;white-space:nowrap;color:var(--brand,var(--splash-muted))}" +
    "@keyframes ds-splash-in{to{opacity:1}}" +
    "@keyframes ds-splash-turn{to{transform:rotate(360deg)}}" +
    "@media (prefers-reduced-motion:reduce){.ds-splash-spin{animation-duration:2.4s}}";
// Claro u oscuro antes de dibujar nada: lo guardado por ThemeProvider o, si no hay, lo del celular
const THEME = 'try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark")t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.classList.add(t)}catch(e){}';
const esc = (t) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
/** lo que va en el index.html de la app, adentro de <body> y antes de <div id="root"> */
export function splashHtml({ name, jp }) {
    const box = `<div class="ds-splash-box"><div class="ds-splash-spin"></div><p class="ds-splash-name">${esc(name)}</p><p lang="ja" class="ds-splash-jp">${esc(jp)}</p></div>`;
    return `<script>${THEME}</script><style>${CSS}</style><div id="splash" class="ds-splash">${box}</div>`;
}
/** saca la pantalla de carga con un fundido corto */
export function hideSplash() {
    const el = document.getElementById("splash");
    if (!el || el.dataset.hiding)
        return;
    el.dataset.hiding = "1";
    el.style.opacity = "0";
    window.setTimeout(() => el.remove(), 250);
}
/** saca la pantalla de carga cuando `ready` pasa a true (ej: ya se sabe si hay sesión y están los datos) */
export function useHideSplash(ready) {
    React.useEffect(() => {
        if (ready)
            hideSplash();
    }, [ready]);
}
/** Sólo para la guía: cómo se ve, dibujada en una caja con forma de celular. */
export function SplashPreview({ name, jp, className }) {
    return (_jsxs("div", { className: cn("relative h-[422px] w-[195px] shrink-0 overflow-hidden rounded-box-l", className), children: [_jsx("style", { children: CSS }), _jsx("div", { className: "ds-splash", style: { position: "absolute" }, children: _jsxs("div", { className: "ds-splash-box", children: [_jsx("div", { className: "ds-splash-spin" }), _jsx("p", { className: "ds-splash-name", children: name }), _jsx("p", { lang: "ja", className: "ds-splash-jp", children: jp })] }) })] }));
}
