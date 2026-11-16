import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "../../lib/utils.js";
import { Slider } from "../ui/slider.js";
// Nombre + número editable + slider. Podés escribir el número exacto o arrastrar.
export function NumberSlider({ label, value, min, max, step = 1, onChange, className, }) {
    const [draft, setDraft] = React.useState(null);
    const id = React.useId();
    const commit = () => {
        if (draft === null)
            return;
        const v = Number(draft.replace(",", "."));
        if (!Number.isNaN(v))
            onChange(Math.min(max, Math.max(min, Math.round(v / step) * step)));
        setDraft(null);
    };
    return (_jsxs("div", { "data-slot": "number-slider", className: cn("grid grid-cols-[minmax(0,6rem)_4rem_minmax(0,1fr)] items-center gap-3", className), children: [_jsx("label", { htmlFor: id, className: "truncate text-sm text-muted-foreground", children: label }), _jsx("input", { id: id, inputMode: "decimal", value: draft ?? String(value), onChange: (e) => setDraft(e.target.value), onBlur: commit, onKeyDown: (e) => {
                    if (e.key === "Enter")
                        e.target.blur();
                    else if (e.key === "Escape")
                        setDraft(null);
                    else if (e.key === "ArrowUp")
                        onChange(Math.min(max, value + step));
                    else if (e.key === "ArrowDown")
                        onChange(Math.max(min, value - step));
                    else
                        return;
                    e.preventDefault();
                }, className: "live-number h-9 w-full rounded-full border border-transparent bg-secondary in-data-[variant=inset]:bg-card px-3.5 font-mono text-sm outline-none focus-visible:border-brand" }), _jsx(Slider, { "aria-label": label, min: min, max: max, step: step, value: [value], onValueChange: ([v]) => onChange(v) })] }));
}
