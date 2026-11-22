import * as React from "react"

import { cn } from "@/lib/utils"

// Campo de línea (diseño de bookmarks): sin caja, sólo una línea abajo (del color de la app al escribir),
// y el nombre del campo abajo, en gris. Es el otro campo de texto del sistema: el de caja (Input) va en
// formularios con varios campos; éste, cuando cada paso de una hoja pide un solo dato (ej: el link).
// - Sin nada más, el texto y el nombre van centrados.
// - `multiline`: crece con el texto, renglón por renglón (ej: título, descripción). Enter no hace salto.
// - `maxLength`: contador a la derecha del nombre (del color de la app cuando falta poco).
// - `right`: algo más a la derecha del nombre (ej: AiButton). Con contador o `right`, el nombre va a la izquierda.
// - `align="left"`: el texto a la izquierda (ej: una descripción larga).
// Letra de 15px, como los demás campos.
type Common = {
  label: React.ReactNode
  value: string
  onChange: (value: string) => void
  right?: React.ReactNode
  align?: "center" | "left"
  className?: string
}

export function LineInput({
  label,
  value,
  onChange,
  right,
  align = "center",
  multiline,
  maxLength,
  className,
  onKeyDown,
  ...props
}: Common & Omit<React.ComponentProps<"input">, "value" | "onChange"> & { multiline?: boolean }) {
  const ref = React.useRef<HTMLTextAreaElement>(null)
  const id = React.useId()
  const fieldId = props.id ?? id

  // el textarea crece con el texto
  React.useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.height = "auto"
    el.style.height = el.scrollHeight + "px"
  }, [value, multiline])

  const field = cn(
    "block w-full min-w-0 border-0 border-b-[1.5px] border-input bg-transparent py-box-xs text-sm leading-normal transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-brand disabled:pointer-events-none disabled:opacity-50",
    align === "center" ? "text-center" : "text-left"
  )
  const side = maxLength != null || right != null
  const near = maxLength != null && value.length >= maxLength * 0.8

  return (
    <div data-slot="line-input" className={cn("flex flex-col gap-box-2xs", className)}>
      {multiline ? (
        <textarea
          {...(props as unknown as React.ComponentProps<"textarea">)}
          ref={ref}
          id={fieldId}
          rows={1}
          value={value}
          maxLength={maxLength}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") e.preventDefault()
            onKeyDown?.(e as unknown as React.KeyboardEvent<HTMLInputElement>)
          }}
          className={cn(field, "resize-none overflow-hidden")}
        />
      ) : (
        <input
          {...props}
          id={fieldId}
          value={value}
          maxLength={maxLength}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onKeyDown}
          className={field}
        />
      )}
      <div className={cn("flex items-center gap-box-xs", side ? "min-h-8 justify-between" : "justify-center")}>
        <label htmlFor={fieldId} className="text-sm text-muted-foreground">{label}</label>
        {side && (
          <div className="flex items-center gap-box-xs">
            {maxLength != null && <span className={cn("text-xs", near ? "text-brand-text" : "text-muted-foreground")}>{value.length}/{maxLength}</span>}
            {right}
          </div>
        )}
      </div>
    </div>
  )
}
