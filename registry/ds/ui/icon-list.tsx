import * as React from "react"

import { cn } from "@/lib/utils"

export type IconListItem = { icon: React.ReactNode; title?: React.ReactNode; text: React.ReactNode }

// Lista con ícono (de gesture): cada fila lleva a la izquierda un ícono (del color de la app) o un emoji,
// y a la derecha el texto. Con `title`, el título va arriba y el texto abajo en gris. Sirve para enumerar
// ventajas con un tilde (el inicio de gesture) o para explicar pasos (la ayuda de gesture).
export function IconList({ items, className }: { items: IconListItem[]; className?: string }) {
  return (
    <ul data-slot="icon-list" className={cn("flex flex-col gap-box-m", className)}>
      {items.map((item, i) => (
        <li key={i} className="flex gap-box-s text-sm">
          <span aria-hidden className="flex h-5 w-6 shrink-0 items-center justify-center text-xl leading-none text-brand [&_svg]:size-5">
            {item.icon}
          </span>
          <div className="flex min-w-0 flex-col gap-1">
            {item.title && <span className="font-medium">{item.title}</span>}
            <span className={cn(item.title && "text-muted-foreground")}>{item.text}</span>
          </div>
        </li>
      ))}
    </ul>
  )
}
