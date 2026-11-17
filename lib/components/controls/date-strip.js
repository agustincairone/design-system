import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "../../lib/utils.js";
export function DateStrip({ days, value, onChange, className, }) {
    return (_jsx("div", { "data-slot": "date-strip", className: cn("flex gap-2 overflow-x-auto py-1 [scrollbar-width:none]", className), children: days.map((d) => {
            const sel = value === d.dateStr;
            return (_jsxs("button", { type: "button", "data-today": d.isToday || undefined, "aria-pressed": sel, onClick: () => onChange(d.dateStr), className: cn("relative flex min-w-[54px] shrink-0 flex-col items-center rounded-[8px] border px-3 py-2 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-brand", sel
                    ? "border-primary bg-primary text-primary-foreground"
                    : d.isToday
                        ? "border-primary bg-inset text-foreground"
                        : "border-border bg-card text-foreground hover:border-brand"), children: [d.marked && _jsx("span", { className: cn("dot absolute top-1.5 right-1.5", sel ? "bg-primary-foreground" : "bg-primary") }), _jsx("span", { className: "text-xs font-medium", children: d.dayName.slice(0, 3) }), _jsx("span", { className: cn("mt-0.5 text-xs", sel ? "opacity-70" : "text-muted-foreground"), children: d.label })] }, d.dateStr));
        }) }));
}
