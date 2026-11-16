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
