import * as React from "react"
import { X } from "lucide-react"
import { Dialog as SheetPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

// Hoja desde abajo: la única ventana del sistema (detalle, confirmación, formulario).
// Flota con 16px de aire a los costados y abajo, título de 16px y cruz en un botón
// redondo gris claro, sin borde.
// `inline` la dibuja dentro de la página en vez de flotando (sólo para la guía).

function SheetHeaderRow({ title, onClose }: { title: React.ReactNode; onClose?: () => void }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="min-w-0 truncate text-base font-medium tracking-tight">{title}</span>
      <Button variant="secondary" size="icon-sm" aria-label="Cerrar" onClick={onClose}>
        <X className="size-4" />
      </Button>
    </div>
  )
}

const PANEL = "flex w-full max-w-md flex-col gap-4 rounded-box-l bg-card p-box-l text-sm text-card-foreground shadow-lg"

function BottomSheet({
  open,
  onOpenChange,
  title,
  children,
  inline,
  className,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: React.ReactNode
  children: React.ReactNode
  inline?: boolean
  className?: string
}) {
  if (inline) {
    if (!open) return null
    return (
      <div className="flex h-full items-end justify-center bg-black/10 p-4">
        <div className={cn(PANEL, className)}>
          <SheetHeaderRow title={title} onClose={() => onOpenChange(false)} />
          {children}
        </div>
      </div>
    )
  }
  return (
    <SheetPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <SheetPrimitive.Portal>
        <SheetPrimitive.Overlay className="fixed inset-0 z-50 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0" />
        <SheetPrimitive.Content
          aria-describedby={undefined}
          onOpenAutoFocus={(e) => e.preventDefault()} // sin aro de foco en la cruz al abrir
          className={cn(
            PANEL,
            "fixed inset-x-4 bottom-4 z-50 mx-auto max-h-[calc(100dvh-32px)] overflow-y-auto outline-none duration-200 data-open:animate-in data-open:fade-in-0 data-open:slide-in-from-bottom-10 data-closed:animate-out data-closed:fade-out-0 data-closed:slide-out-to-bottom-10",
            className
          )}
        >
          <SheetPrimitive.Title asChild>
            <div><SheetHeaderRow title={title} onClose={() => onOpenChange(false)} /></div>
          </SheetPrimitive.Title>
          {children}
        </SheetPrimitive.Content>
      </SheetPrimitive.Portal>
    </SheetPrimitive.Root>
  )
}

// Confirmación: pregunta, aclaración en gris, y Volver + la acción en rojo
function ConfirmSheet({
  open,
  onOpenChange,
  title,
  question,
  detail,
  confirmLabel,
  onConfirm,
  cancelLabel = "Volver",
  inline,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: React.ReactNode
  question: React.ReactNode
  detail?: React.ReactNode
  confirmLabel: string
  onConfirm: () => void
  cancelLabel?: string
  inline?: boolean
}) {
  return (
    <BottomSheet open={open} onOpenChange={onOpenChange} title={title} inline={inline}>
      <div className="flex flex-col gap-1">
        <p className="text-sm">{question}</p>
        {detail && <p className="text-sm text-muted-foreground">{detail}</p>}
      </div>
      <div className="flex gap-2">
        <Button variant="secondary" className="flex-1" onClick={() => onOpenChange(false)}>{cancelLabel}</Button>
        <Button variant="destructive" className="flex-1" onClick={onConfirm}>{confirmLabel}</Button>
      </div>
    </BottomSheet>
  )
}

export { BottomSheet, ConfirmSheet }
