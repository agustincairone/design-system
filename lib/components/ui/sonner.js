import { jsx as _jsx } from "react/jsx-runtime";
import { useTheme } from "../theme-provider.js";
import { Toaster as Sonner } from "sonner";
import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon, Loader2Icon } from "lucide-react";
// `aboveNav`: en las apps con barra de abajo, el aviso sale abajo al centro, encima de la barra
// (la barra ocupa 80px desde el borde: 64 de alto + 16 de aire) con 16px de separación.
const ABOVE_NAV = { bottom: 96 };
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
        }, ...(aboveNav ? { position: "bottom-center", offset: ABOVE_NAV, mobileOffset: ABOVE_NAV } : {}), ...props }));
};
export { Toaster };
