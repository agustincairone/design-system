import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "../../lib/utils.js";
// Pantalla de carga al abrir la app, la misma en todas: el fondo de la página (claro u oscuro) y tres
// puntitos grises que laten suave en el centro. Sin logo. Los puntitos aparecen recién a los 0,3 s, así
// si la app abre rápido sólo se ve el fondo, sin parpadeo.
//
// Va escrita en el index.html de la app (SPLASH_HTML), así aparece desde el primer instante, antes de que
// cargue nada. Trae también el aviso de claro u oscuro (el mismo que guarda ThemeProvider), para que salga
// del color correcto. La app la saca cuando ya tiene qué mostrar, con useHideSplash(listo) en el
// componente de arriba de todo, en lugar de mostrar un "Cargando...". Se va con un fundido corto.
// Los colores son los del sistema (fondo y gris del texto secundario). Los de respaldo son los mismos
// valores, para el instante antes de que cargue el tema.
const CSS = ".ds-splash{--splash-bg:#e7e5e4;--splash-dot:#79716b;position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;background:var(--background,var(--splash-bg));transition:opacity .2s}" +
    ".dark .ds-splash{--splash-bg:#0c0a09;--splash-dot:#a6a09b}" +
    ".ds-splash span{display:flex;gap:8px;opacity:0;animation:ds-splash-in .3s .3s forwards}" +
    ".ds-splash i{width:4px;height:4px;border-radius:9999px;background:var(--muted-foreground,var(--splash-dot));opacity:.25;animation:ds-splash-dot 1.2s infinite ease-in-out}" +
    ".ds-splash i:nth-child(2){animation-delay:.2s}.ds-splash i:nth-child(3){animation-delay:.4s}" +
    "@keyframes ds-splash-in{to{opacity:1}}" +
    "@keyframes ds-splash-dot{0%,100%{opacity:.25}50%{opacity:.8}}" +
    "@media (prefers-reduced-motion:reduce){.ds-splash i{animation:none;opacity:.5}}";
// Claro u oscuro antes de dibujar nada: lo guardado por ThemeProvider o, si no hay, lo del celular
const THEME = 'try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark")t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.classList.add(t)}catch(e){}';
const DOTS = "<span><i></i><i></i><i></i></span>";
/** lo que va en el index.html de la app, adentro de <body> y antes de <div id="root"> */
export const SPLASH_HTML = `<script>${THEME}</script><style>${CSS}</style><div id="splash" class="ds-splash">${DOTS}</div>`;
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
/** Sólo para la guía: cómo se ve, dibujada en una caja con forma de celular (a la mitad del tamaño real). */
export function SplashPreview({ className }) {
    return (_jsxs("div", { className: cn("relative h-[422px] w-[195px] shrink-0 overflow-hidden rounded-box-l", className), children: [_jsx("style", { children: CSS }), _jsx("div", { className: "ds-splash", style: { position: "absolute" }, children: _jsxs("span", { children: [_jsx("i", {}), _jsx("i", {}), _jsx("i", {})] }) })] }));
}
