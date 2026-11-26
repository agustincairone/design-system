import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "../../lib/utils.js";
import { Button } from "../ui/button.js";
// Carrusel de fichas (de no-coke: los hitos). Una ficha al centro, con el 80% del ancho, y asomando las
// de los costados. Se pasa con el dedo (cada ficha frena en el centro) o con las flechas de abajo,
// que tienen en el medio en cuál vas (3 / 16). Empieza en `start` (ej: el último hito logrado).
// Las fichas las pone la app (cualquier contenido); todas quedan del alto de la más alta.
export function Carousel({ children, start = 0, label, className, }) {
    const items = React.Children.toArray(children);
    const [index, setIndex] = React.useState(start);
    const track = React.useRef(null);
    const go = React.useCallback((i, smooth = true) => {
        const box = track.current;
        const card = box?.children[i];
        if (!box || !card)
            return;
        box.scrollTo({ left: card.offsetLeft - (box.clientWidth - card.offsetWidth) / 2, behavior: smooth ? "smooth" : "instant" });
    }, []);
    // al abrir, directo en la ficha de `start` (sin animar)
    React.useLayoutEffect(() => go(start, false), [go, start]);
    // al pasar con el dedo, la ficha que quedó más cerca del centro
    const onScroll = () => {
        const box = track.current;
        if (!box)
            return;
        const mid = box.scrollLeft + box.clientWidth / 2;
        let best = 0;
        Array.from(box.children).forEach((c, i) => {
            const el = c;
            const best0 = box.children[best];
            if (Math.abs(el.offsetLeft + el.offsetWidth / 2 - mid) < Math.abs(best0.offsetLeft + best0.offsetWidth / 2 - mid))
                best = i;
        });
        setIndex(best);
    };
    const to = (i) => {
        setIndex(i);
        go(i);
    };
    return (_jsxs("div", { "data-slot": "carousel", role: "group", "aria-roledescription": "carrusel", "aria-label": label, className: cn("flex flex-col gap-box-m", className), children: [_jsx("div", { ref: track, onScroll: onScroll, className: "relative flex snap-x snap-mandatory gap-box-s overflow-x-auto px-[10%] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden", children: items.map((item, i) => (_jsx("div", { "aria-current": i === index || undefined, className: "flex w-4/5 shrink-0 snap-center *:flex-1", children: item }, i))) }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Button, { variant: "secondary", size: "icon", "aria-label": "Anterior", disabled: index === 0, onClick: () => to(index - 1), children: _jsx(ArrowLeft, {}) }), _jsxs("span", { className: "text-xs text-muted-foreground", children: [index + 1, " / ", items.length] }), _jsx(Button, { variant: "secondary", size: "icon", "aria-label": "Siguiente", disabled: index === items.length - 1, onClick: () => to(index + 1), children: _jsx(ArrowRight, {}) })] })] }));
}
