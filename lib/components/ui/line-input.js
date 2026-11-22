import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "../../lib/utils.js";
export function LineInput({ label, value, onChange, right, align = "center", multiline, maxLength, className, onKeyDown, ...props }) {
    const ref = React.useRef(null);
    const id = React.useId();
    const fieldId = props.id ?? id;
    // el textarea crece con el texto
    React.useLayoutEffect(() => {
        const el = ref.current;
        if (!el)
            return;
        el.style.height = "auto";
        el.style.height = el.scrollHeight + "px";
    }, [value, multiline]);
    const field = cn("block w-full min-w-0 border-0 border-b-[1.5px] border-input bg-transparent py-box-xs text-sm leading-normal transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-brand disabled:pointer-events-none disabled:opacity-50", align === "center" ? "text-center" : "text-left");
    const side = maxLength != null || right != null;
    const near = maxLength != null && value.length >= maxLength * 0.8;
    return (_jsxs("div", { "data-slot": "line-input", className: cn("flex flex-col gap-box-2xs", className), children: [multiline ? (_jsx("textarea", { ...props, ref: ref, id: fieldId, rows: 1, value: value, maxLength: maxLength, onChange: (e) => onChange(e.target.value), onKeyDown: (e) => {
                    if (e.key === "Enter")
                        e.preventDefault();
                    onKeyDown?.(e);
                }, className: cn(field, "resize-none overflow-hidden") })) : (_jsx("input", { ...props, id: fieldId, value: value, maxLength: maxLength, onChange: (e) => onChange(e.target.value), onKeyDown: onKeyDown, className: field })), _jsxs("div", { className: cn("flex items-center gap-box-xs", side ? "min-h-8 justify-between" : "justify-center"), children: [_jsx("label", { htmlFor: fieldId, className: "text-sm text-muted-foreground", children: label }), side && (_jsxs("div", { className: "flex items-center gap-box-xs", children: [maxLength != null && _jsxs("span", { className: cn("text-xs", near ? "text-brand-text" : "text-muted-foreground"), children: [value.length, "/", maxLength] }), right] }))] })] }));
}
