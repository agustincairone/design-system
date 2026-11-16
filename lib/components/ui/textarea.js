import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "../../lib/utils.js";
function Textarea({ className, ...props }) {
    return (_jsx("textarea", { "data-slot": "textarea", className: cn("flex field-sizing-content min-h-20 w-full rounded-xl border border-input bg-transparent px-3.5 py-2.5 text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-brand disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50", className), ...props }));
}
export { Textarea };
