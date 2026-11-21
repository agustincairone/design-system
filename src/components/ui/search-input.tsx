import * as React from "react"
import { Search, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// Buscador: el campo de texto de siempre (mismo alto, borde y foco) con la lupa adelante
// y una cruz para borrar lo escrito, que aparece sólo cuando hay algo.
function SearchInput({
  value,
  onChange,
  placeholder = "Buscar...",
  className,
  ...props
}: Omit<React.ComponentProps<"input">, "value" | "onChange"> & { value: string; onChange: (value: string) => void }) {
  return (
    <div data-slot="search-input" className={cn("relative w-full", className)}>
      <Search aria-hidden className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="text"
        inputMode="search"
        enterKeyHint="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="pr-10 pl-10"
        {...props}
      />
      {value && (
        <Button variant="ghost" size="icon-xs" aria-label="Borrar búsqueda" className="absolute top-1/2 right-2 -translate-y-1/2" onClick={() => onChange("")}>
          <X />
        </Button>
      )}
    </div>
  )
}

export { SearchInput }
