import * as React from "react"
import { Popover as PopoverPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

// Campo con sugerencias (predictivo): mientras escribís, abajo aparece lo que ya cargaste antes
// que contiene ese texto (hasta 6). Sin ningún ícono. La lista es la misma de los desplegables
// del sistema (Select): caja redondeada con sombra, opciones de 12px con divisor y gris al pasar.
// Flechas ↑↓ para moverse, Enter para elegir, Esc para cerrar.
export function SuggestInput({
  value,
  onChange,
  suggestions,
  max = 6,
  onFocus,
  onBlur,
  onKeyDown,
  ...props
}: Omit<React.ComponentProps<"input">, "value" | "onChange"> & {
  value: string
  onChange: (value: string) => void
  suggestions: string[]
  max?: number
}) {
  const [focused, setFocused] = React.useState(false)
  const [dismissed, setDismissed] = React.useState(false) // cerrada con Esc o tocando afuera
  const [active, setActive] = React.useState(-1)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const listId = React.useId()

  const q = value.trim().toLowerCase()
  const matches = q ? suggestions.filter((s) => s.toLowerCase().includes(q) && s !== value).slice(0, max) : []
  const open = focused && !dismissed && matches.length > 0

  const pick = (s: string) => {
    onChange(s)
    setActive(-1)
  }

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={(o) => { if (!o) setDismissed(true) }}>
      <PopoverPrimitive.Anchor asChild>
        <Input
          {...props}
          ref={inputRef}
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={open}
          aria-controls={open ? listId : undefined}
          aria-activedescendant={open && active >= 0 ? `${listId}-${active}` : undefined}
          autoComplete="off"
          value={value}
          onChange={(e) => {
            onChange(e.target.value)
            setDismissed(false)
            setActive(-1)
          }}
          onFocus={(e) => {
            setFocused(true)
            setDismissed(false)
            onFocus?.(e)
          }}
          onBlur={(e) => {
            setFocused(false)
            setActive(-1)
            onBlur?.(e)
          }}
          onKeyDown={(e) => {
            if (open && e.key === "ArrowDown") {
              e.preventDefault()
              setActive((a) => (a + 1) % matches.length)
            } else if (open && e.key === "ArrowUp") {
              e.preventDefault()
              setActive((a) => (a <= 0 ? matches.length - 1 : a - 1))
            } else if (open && e.key === "Enter" && active >= 0) {
              e.preventDefault()
              pick(matches[active])
            }
            onKeyDown?.(e)
          }}
        />
      </PopoverPrimitive.Anchor>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          data-slot="suggest-list"
          align="start"
          sideOffset={4}
          onOpenAutoFocus={(e) => e.preventDefault()} // el foco sigue en el campo
          onCloseAutoFocus={(e) => e.preventDefault()}
          onInteractOutside={(e) => { if (inputRef.current?.contains(e.target as Node)) e.preventDefault() }}
          className="z-50 max-h-[min(var(--radix-popover-content-available-height),var(--spacing-list))] w-(--radix-popover-trigger-width) overflow-x-hidden overflow-y-auto rounded-xl bg-popover text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2"
        >
          <div id={listId} role="listbox">
            {matches.map((s, i) => (
              <div
                key={s}
                id={`${listId}-${i}`}
                role="option"
                aria-selected={i === active}
                onMouseDown={(e) => e.preventDefault()} // que el campo no pierda el foco
                onMouseEnter={() => setActive(i)}
                onClick={() => pick(s)}
                className={cn(
                  "flex w-full cursor-default items-center border-b border-border px-box-s py-box-s text-sm last:border-b-0 select-none",
                  i === active && "bg-card-hover text-foreground"
                )}
              >
                {s}
              </div>
            ))}
          </div>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  )
}
