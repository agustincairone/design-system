import { jsx as _jsx } from "react/jsx-runtime";
import { Monitor, Moon, Sun } from "lucide-react";
import { cn } from "../lib/utils.js";
import { useTheme } from "./theme-provider.js";
const OPTIONS = [
    { value: "system", label: "Automático", icon: Monitor },
    { value: "light", label: "Claro", icon: Sun },
    { value: "dark", label: "Oscuro", icon: Moon },
];
/** Selector de tema en forma de píldora, como el de vercel.com. */
export function ThemeToggle({ className }) {
    const { theme, setTheme } = useTheme();
    return (_jsx("div", { role: "radiogroup", "aria-label": "Tema", className: cn("inline-flex items-center gap-0.5 rounded-full border bg-background p-0.5", className), children: OPTIONS.map(({ value, label, icon: Icon }) => {
            const active = theme === value;
            return (_jsx("button", { type: "button", role: "radio", "aria-checked": active, "aria-label": label, title: label, onClick: () => setTheme(value), className: cn("inline-flex size-7 items-center justify-center rounded-full text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring", active && "bg-accent text-foreground shadow-xs"), children: _jsx(Icon, { className: "size-3.5" }) }, value));
        }) }));
}
