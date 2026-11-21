import * as React from "react"
import { cn } from "@/lib/utils"

// Campo de varias líneas: alto fijo de 96px, esquinas de caja S (12px) y no se agranda.
// Con `maxLength`, abajo a la derecha aparece cuántas letras van (ej: 12/200).
function Textarea({ className, maxLength, onChange, ...props }: React.ComponentProps<"textarea">) {
  const [typed, setTyped] = React.useState(String(props.defaultValue ?? "").length)
  const count = props.value !== undefined ? String(props.value).length : typed
  const field = (
    <textarea
      data-slot="textarea"
      maxLength={maxLength}
      onChange={(e) => {
        setTyped(e.target.value.length)
        onChange?.(e)
      }}
      className={cn(
        "flex h-24 w-full resize-none rounded-box-s border border-input bg-transparent px-3.5 py-2.5 text-sm transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-brand disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50",
        className
      )}
      {...props}
    />
  )
  if (maxLength == null) return field
  return (
    <div data-slot="textarea-count" className="flex w-full flex-col gap-box-2xs">
      {field}
      <span className="self-end text-xs text-muted-foreground">{count}/{maxLength}</span>
    </div>
  )
}

export { Textarea }
