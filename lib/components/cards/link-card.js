import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { ExternalLink, Globe, Pencil, Trash2, createLucideIcon } from "lucide-react";
import { cn } from "../../lib/utils.js";
import { Button } from "../ui/button.js";
// Los logos de los sitios ya no vienen en lucide: el dibujo es el de lucide 0.263 (el que usaba bookmarks)
const Twitter = createLucideIcon("twitter", [["path", { d: "M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z", key: "a" }]]);
const Youtube = createLucideIcon("youtube", [["path", { d: "M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17", key: "a" }], ["path", { d: "m10 15 5-3-5-3z", key: "b" }]]);
const Github = createLucideIcon("github", [["path", { d: "M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4", key: "a" }], ["path", { d: "M9 18c-4.51 2-5-2-7-2", key: "b" }]]);
export function domainOf(url) {
    try {
        return new URL(url).hostname.replace("www.", "");
    }
    catch {
        return url;
    }
}
export function siteOf(url) {
    const host = domainOf(url);
    if (host === "twitter.com" || host === "x.com")
        return "twitter";
    if (host === "youtube.com" || host === "youtu.be")
        return "youtube";
    if (host === "github.com")
        return "github";
    return "web";
}
// Ícono del sitio, con el color del logo llevado a la paleta (Twitter sky-500, YouTube red-600);
// GitHub del color del texto y cualquier otra página, un mundo gris.
export function SiteIcon({ url, className }) {
    const site = siteOf(url);
    if (site === "twitter")
        return _jsx(Twitter, { "aria-hidden": true, className: cn("text-sky-500", className) });
    if (site === "youtube")
        return _jsx(Youtube, { "aria-hidden": true, className: cn("text-red-600", className) });
    if (site === "github")
        return _jsx(Github, { "aria-hidden": true, className: cn("text-foreground", className) });
    return _jsx(Globe, { "aria-hidden": true, className: cn("text-muted-foreground", className) });
}
// La imagen del link; sin imagen, el favicon de la página (o el logo del sitio) y el dominio.
// Suelta (ej: en el resumen antes de guardar) va con `className="aspect-video w-full"`.
export function LinkPhoto({ link, small, className }) {
    const [failed, setFailed] = React.useState(false);
    const site = siteOf(link.url);
    return (_jsx("a", { href: link.url, target: "_blank", rel: "noopener noreferrer", tabIndex: -1, className: cn("relative flex flex-col items-center justify-center gap-box-xs overflow-hidden rounded-sm bg-raised", className), children: link.thumbnail && !failed ? (_jsx("img", { src: link.thumbnail, alt: "", draggable: false, onError: () => setFailed(true), className: "absolute inset-0 block size-full object-cover" })) : (_jsxs(_Fragment, { children: [site === "web" ? (_jsx("img", { src: `https://www.google.com/s2/favicons?domain=${domainOf(link.url)}&sz=128`, alt: "", className: small ? "size-6" : "size-10" })) : (_jsx(SiteIcon, { url: link.url, className: small ? "size-6" : "size-9" })), !small && _jsx("span", { className: "max-w-full truncate px-box-xs text-2xs text-muted-foreground", children: domainOf(link.url) })] })) }));
}
function OpenButton({ url, className }) {
    return (_jsx(Button, { asChild: true, variant: "card", size: "icon-sm", className: className, children: _jsx("a", { href: url, target: "_blank", rel: "noopener noreferrer", "aria-label": "Abrir link", children: _jsx(ExternalLink, { className: "size-3.5" }) }) }));
}
function Actions({ onEdit, onDelete, open }) {
    if (!onEdit && !onDelete && !open)
        return null;
    return (_jsxs("div", { className: "-my-1 -mr-1 flex shrink-0 items-center", children: [open && (_jsx(Button, { asChild: true, variant: "ghost", size: "icon-sm", className: "text-muted-foreground", children: _jsx("a", { href: open, target: "_blank", rel: "noopener noreferrer", "aria-label": "Abrir link", children: _jsx(ExternalLink, { className: "size-3.5" }) }) })), onEdit && (_jsx(Button, { variant: "ghost", size: "icon-sm", "aria-label": "Editar", className: "text-muted-foreground", onClick: onEdit, children: _jsx(Pencil, { className: "size-3.5" }) })), onDelete && (_jsx(Button, { variant: "ghost", size: "icon-sm", "aria-label": "Borrar", className: "text-destructive hover:text-destructive", onClick: onDelete, children: _jsx(Trash2, { className: "size-3.5" }) }))] }));
}
function Title({ link }) {
    return (_jsxs("div", { className: "flex min-w-0 flex-1 items-center gap-1.5", children: [_jsx(SiteIcon, { url: link.url, className: "size-3.5 shrink-0" }), _jsx("p", { className: "truncate text-sm leading-tight font-medium", children: link.title || domainOf(link.url) })] }));
}
// La categoría con la estrellita del color de la app
export function LinkCategory({ category, subcategory, inline }) {
    if (!category)
        return null;
    return (_jsxs("div", { className: cn("flex min-w-0 text-xs leading-tight", inline ? "items-center gap-1" : "flex-col gap-0.5"), children: [_jsxs("p", { className: "flex min-w-0 items-center gap-1 font-medium", children: [_jsx("span", { "aria-hidden": true, className: "text-brand-text", children: "\u2738" }), _jsx("span", { className: "truncate", children: category })] }), subcategory && _jsxs("p", { className: "truncate text-muted-foreground", children: [inline && "· ", subcategory] })] }));
}
export function LinkCard({ link, onEdit, onDelete, className }) {
    return (_jsxs("div", { "data-slot": "link-card", className: cn("flex min-w-0 flex-col gap-2 rounded-box-s bg-tile p-box-s", className), children: [_jsxs("div", { className: "relative", children: [_jsx(LinkPhoto, { link: link, className: "aspect-video w-full" }), _jsx(OpenButton, { url: link.url, className: "absolute top-box-xs right-box-xs" })] }), _jsxs("div", { className: "flex min-w-0 flex-col gap-box-xs", children: [_jsxs("div", { className: "flex items-center gap-box-xs", children: [_jsx(Title, { link: link }), _jsx(Actions, { onEdit: onEdit, onDelete: onDelete })] }), link.description && _jsx("p", { className: "text-xs leading-snug text-muted-foreground", children: link.description }), _jsx(LinkCategory, { category: link.category, subcategory: link.subcategory })] })] }));
}
export function LinkRow({ link, onEdit, onDelete, className }) {
    return (_jsxs("div", { "data-slot": "link-row", className: cn("flex min-w-0 items-stretch gap-3 rounded-box-s bg-tile p-box-s", className), children: [_jsx(LinkPhoto, { link: link, small: true, className: "size-16 shrink-0" }), _jsxs("div", { className: "flex min-w-0 flex-1 flex-col justify-between gap-box-2xs", children: [_jsxs("div", { className: "flex items-center gap-box-xs", children: [_jsx(Title, { link: link }), _jsx(Actions, { onEdit: onEdit, onDelete: onDelete, open: link.url })] }), link.description && _jsx("p", { className: "line-clamp-2 text-xs leading-snug text-muted-foreground", children: link.description }), _jsx(LinkCategory, { category: link.category, subcategory: link.subcategory, inline: true })] })] }));
}
