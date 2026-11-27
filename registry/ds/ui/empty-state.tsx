import * as React from "react"

import { cn } from "@/lib/utils"

// Pantalla vacía o de "listo": ícono en un círculo gris de 64px, título de 18px (como el de caja, 2px más chico) y texto gris.
// Lleva 40px de relleno alrededor (box-2xl), así respira igual en una caja, en una hoja o en la página.

export function EmptyState({
  icon,
  title,
  text,
  children,
  className,
}: {
  icon: React.ReactNode
  title: string
  text?: React.ReactNode
  children?: React.ReactNode
  className?: string
}) {
  return (
    <div data-slot="empty-state" className={cn("flex flex-col items-center gap-4 p-box-2xl text-center", className)}>
      <div className="flex size-16 items-center justify-center rounded-full bg-inset [&_svg]:size-8">{icon}</div>
      <div>
        <p className="mb-1 text-lg leading-[1.2] font-semibold tracking-[-0.03em]">{title}</p>
        {text && <p className="text-sm text-muted-foreground">{text}</p>}
      </div>
      {children}
    </div>
  )
}
