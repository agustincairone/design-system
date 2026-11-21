import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "../../lib/utils.js";
// Degradé que avisa que hay más para ver abajo (el de outfit): 64px, de transparente al color
// de la caja. Va al fondo de una caja con `relative` que tiene adentro la zona que se desplaza;
// aparece sólo mientras quedan más de 20px por ver y se desvanece al llegar al final.
export function ScrollFade({ show, className }) {
    return (_jsx("div", { "data-slot": "scroll-fade", className: cn("pointer-events-none absolute inset-x-0 bottom-0 z-10 h-16 bg-gradient-to-b from-transparent to-card transition-opacity duration-300", show ? "opacity-100" : "opacity-0", className) }));
}
// ¿A la zona que se desplaza le quedan más de 20px por ver abajo? Se fija al desplazar
// y cuando cambia lo de adentro. Uso: const more = useMoreBelow(); <div ref={more.ref} onScroll={more.onScroll}>
export function useMoreBelow() {
    const ref = React.useRef(null);
    const [show, setShow] = React.useState(false);
    const onScroll = React.useCallback(() => {
        const el = ref.current;
        if (el)
            setShow(el.scrollHeight - el.scrollTop - el.clientHeight > 20);
    }, []);
    React.useEffect(() => {
        const el = ref.current;
        if (!el)
            return;
        onScroll();
        const ro = new ResizeObserver(onScroll);
        ro.observe(el);
        for (const child of Array.from(el.children))
            ro.observe(child);
        return () => ro.disconnect();
    }, [onScroll]);
    return { ref, show, onScroll };
}
