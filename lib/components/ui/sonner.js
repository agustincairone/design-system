import { jsx as _jsx } from "react/jsx-runtime";
import { useTheme } from "../theme-provider.js";
import { Toaster as Sonner } from "sonner";
import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon, Loader2Icon } from "lucide-react";
// El aviso sale siempre abajo al centro, 16px arriba del borde (más la rayita de inicio del celular).
// `aboveNav`: en las apps con barra de abajo, va encima de la barra (64 de alto + 16 de aire) con 16px de separación.
const SAFE = "env(safe-area-inset-bottom)";
const BOTTOM = { bottom: `calc(16px + ${SAFE})` };
const ABOVE_NAV = { bottom: "var(--spacing-above-nav)" };
const Toaster = ({ aboveNav, ...props }) => {
    const { resolvedTheme } = useTheme();
    return (_jsx(Sonner, { theme: resolvedTheme, className: "toaster group", icons: {
            success: (_jsx(CircleCheckIcon, { className: "size-4" })),
            info: (_jsx(InfoIcon, { className: "size-4" })),
            warning: (_jsx(TriangleAlertIcon, { className: "size-4" })),
            error: (_jsx(OctagonXIcon, { className: "size-4" })),
            loading: (_jsx(Loader2Icon, { className: "size-4 animate-spin" })),
        }, style: {
            "--normal-bg": "var(--popover)",
            "--normal-text": "var(--popover-foreground)",
            "--normal-border": "var(--border)",
            "--border-radius": "var(--radius)",
        }, toastOptions: {
            classNames: {
                toast: "cn-toast",
            },
        }, position: "bottom-center", offset: aboveNav ? ABOVE_NAV : BOTTOM, mobileOffset: aboveNav ? ABOVE_NAV : BOTTOM, ...props }));
};
export { Toaster };
