import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
const QUERY = "(prefers-color-scheme: dark)";
const THEMES = ["system", "light", "dark"];
const ThemeContext = React.createContext(undefined);
const systemTheme = () => window.matchMedia(QUERY).matches ? "dark" : "light";
function readStored(key) {
    try {
        const v = localStorage.getItem(key);
        return THEMES.includes(v) ? v : null;
    }
    catch {
        return null;
    }
}
/**
 * Barras del celular (arriba la de la hora; abajo, en Android, la de navegación): toman el color
 * de fondo de la página, en claro o en oscuro según el tema. Se pasa en hex porque no todos los
 * celulares entienden los colores oklch en <meta name="theme-color">.
 */
function syncThemeColor(tries = 0) {
    const bg = getComputedStyle(document.body).backgroundColor;
    const ctx = document.createElement("canvas").getContext("2d");
    if (!ctx)
        return;
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 1, 1);
    const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
    // si los estilos todavía no cargaron, el fondo es transparente: se prueba en el próximo cuadro
    if (a === 0) {
        if (tries < 20)
            requestAnimationFrame(() => syncThemeColor(tries + 1));
        return;
    }
    const hex = "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("");
    let metas = document.querySelectorAll('meta[name="theme-color"]');
    if (metas.length === 0) {
        const meta = document.createElement("meta");
        meta.name = "theme-color";
        document.head.appendChild(meta);
        metas = document.querySelectorAll('meta[name="theme-color"]');
    }
    metas.forEach((m) => {
        m.removeAttribute("media");
        m.content = hex;
    });
}
/** Evita que todo "se anime" al cambiar de tema. */
function withoutTransitions(fn) {
    const style = document.createElement("style");
    style.textContent = "*,*::before,*::after{transition:none!important}";
    document.head.appendChild(style);
    fn();
    window.getComputedStyle(document.body);
    requestAnimationFrame(() => requestAnimationFrame(() => style.remove()));
}
export function ThemeProvider({ children, defaultTheme = "system", storageKey = "theme", }) {
    const [theme, setThemeState] = React.useState(() => readStored(storageKey) ?? defaultTheme);
    const [resolvedTheme, setResolved] = React.useState(() => theme === "system" ? systemTheme() : theme);
    const setTheme = React.useCallback((next) => {
        try {
            localStorage.setItem(storageKey, next);
        }
        catch {
            /* sin almacenamiento: igual cambia en esta sesión */
        }
        setThemeState(next);
    }, [storageKey]);
    React.useEffect(() => {
        const apply = () => {
            const resolved = theme === "system" ? systemTheme() : theme;
            withoutTransitions(() => {
                const root = document.documentElement;
                root.classList.remove("light", "dark");
                root.classList.add(resolved);
                root.style.colorScheme = resolved;
            });
            syncThemeColor();
            setResolved(resolved);
        };
        apply();
        if (theme !== "system")
            return;
        const mq = window.matchMedia(QUERY);
        mq.addEventListener("change", apply);
        return () => mq.removeEventListener("change", apply);
    }, [theme]);
    // Si cambiás el tema en otra pestaña, se sincroniza
    React.useEffect(() => {
        const onStorage = (e) => {
            if (e.key === storageKey)
                setThemeState(readStored(storageKey) ?? defaultTheme);
        };
        window.addEventListener("storage", onStorage);
        return () => window.removeEventListener("storage", onStorage);
    }, [storageKey, defaultTheme]);
    const value = React.useMemo(() => ({ theme, resolvedTheme, setTheme }), [theme, resolvedTheme, setTheme]);
    return _jsx(ThemeContext.Provider, { value: value, children: children });
}
export function useTheme() {
    const ctx = React.useContext(ThemeContext);
    if (!ctx)
        throw new Error("useTheme debe usarse dentro de <ThemeProvider>");
    return ctx;
}
