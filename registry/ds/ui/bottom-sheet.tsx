import * as React from "react"
import { ChevronDown, ChevronLeft, X } from "lucide-react"
import { Dialog as SheetPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Chip, ChipGroup } from "@/components/ui/chip"
import { ScrollFade, useMoreBelow } from "@/components/ui/scroll-fade"

// Hoja desde abajo: la única ventana del sistema (detalle, confirmación, formulario).
// Flota con 16px de aire a los costados y abajo, título de 16px y cruz en un botón
// redondo gris claro, sin borde. Debajo del título, una línea divisoria de lado a lado.
// `inline` la dibuja dentro de la página en vez de flotando (sólo para la guía).
// Pasos (ej: agregar un vino en 3 pasos): `step` suma "Paso 2/3" en gris antes de la cruz y `onBack`
// la flecha para volver con borde a la izquierda del título (el mismo diseño que los pasos de outfit).

type Step = { current: number; total: number }

// Encabezado de un paso: volver (desde el paso 2), título de 18px, "Paso 2/3" y la cruz si se puede cerrar.
// Es el mismo en las hojas y en los pasos que van adentro de una caja de la página (ej: cargar un outfit).
function StepHeader({ title, onClose, onBack, step, className }: { title: React.ReactNode; onClose?: () => void; onBack?: () => void; step?: Step; className?: string }) {
  return (
    <div data-slot="step-header" className={cn("flex items-center gap-3", className)}>
      {onBack && (
        <Button variant="outline" size="icon-sm" aria-label="Volver" onClick={onBack}>
          <ChevronLeft className="size-4" />
        </Button>
      )}
      <span className="min-w-0 flex-1 truncate text-lg font-medium tracking-tight">{title}</span>
      {step && <span className="shrink-0 text-xs text-muted-foreground">Paso {step.current}/{step.total}</span>}
      {onClose && (
        <Button variant="secondary" size="icon-sm" aria-label="Cerrar" onClick={onClose}>
          <X className="size-4" />
        </Button>
      )}
    </div>
  )
}

function SheetHeaderRow({ title, onClose, onBack, step }: { title: React.ReactNode; onClose: () => void; onBack?: () => void; step?: Step }) {
  // en las hojas, con una línea divisoria de lado a lado debajo del título
  return <StepHeader className="-mx-box-l border-b border-border px-box-l pb-4" title={title} onClose={onClose} onBack={onBack} step={step} />
}

const PANEL = "flex max-w-md flex-col gap-4 rounded-box-l bg-card p-box-l text-sm text-card-foreground shadow-lg"

function BottomSheet({
  open,
  onOpenChange,
  title,
  children,
  inline,
  className,
  onBack,
  step,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: React.ReactNode
  children: React.ReactNode
  inline?: boolean
  className?: string
  /** flecha para volver al paso anterior */
  onBack?: () => void
  /** "Paso 2/3" arriba a la derecha */
  step?: Step
}) {
  if (inline) {
    if (!open) return null
    return (
      <div className="flex h-full items-end justify-center bg-overlay p-4">
        <div className={cn(PANEL, "w-full", className)}>
          <SheetHeaderRow title={title} onClose={() => onOpenChange(false)} onBack={onBack} step={step} />
          {children}
        </div>
      </div>
    )
  }
  return (
    <SheetPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <SheetPrimitive.Portal>
        <SheetPrimitive.Overlay className="fixed inset-0 z-50 bg-overlay duration-100 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0" />
        <SheetPrimitive.Content
          aria-describedby={undefined}
          onOpenAutoFocus={(e) => e.preventDefault()} // sin aro de foco en la cruz al abrir
          className={cn(
            PANEL,
            "fixed inset-x-4 bottom-screen-bottom z-50 mx-auto max-h-[calc(100dvh-16px-var(--spacing-screen-bottom))] overflow-y-auto outline-none duration-200 data-open:animate-in data-open:fade-in-0 data-open:slide-in-from-bottom-10 data-closed:animate-out data-closed:fade-out-0 data-closed:slide-out-to-bottom-10",
            className
          )}
        >
          <SheetPrimitive.Title asChild>
            <div><SheetHeaderRow title={title} onClose={() => onOpenChange(false)} onBack={onBack} step={step} /></div>
          </SheetPrimitive.Title>
          {children}
        </SheetPrimitive.Content>
      </SheetPrimitive.Portal>
    </SheetPrimitive.Root>
  )
}

// Resumen de algo en una cajita gris (ej: el vino que vas a borrar o el que ya tenías cargado)
function SheetSummary({ title, lines }: { title: React.ReactNode; lines?: React.ReactNode[] }) {
  return (
    <div className="flex flex-col gap-box-2xs rounded-box-s bg-inset p-box-s">
      <p className="text-sm font-medium">{title}</p>
      {lines?.filter(Boolean).map((l, i) => <p key={i} className="text-xs text-muted-foreground">{l}</p>)}
    </div>
  )
}

// Confirmación: pregunta, aclaración en gris, lo que se va a borrar (opcional, ej: un SheetSummary)
// y Volver + la acción en rojo
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
  children,
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
  /** lo que se va a borrar, entre la pregunta y los botones */
  children?: React.ReactNode
}) {
  return (
    <BottomSheet open={open} onOpenChange={onOpenChange} title={title} inline={inline}>
      <div className="flex flex-col gap-1">
        <p className="text-sm">{question}</p>
        {detail && <p className="text-sm text-muted-foreground">{detail}</p>}
      </div>
      {children}
      <div className="flex gap-2">
        <Button variant="secondary" className="flex-1" onClick={() => onOpenChange(false)}>{cancelLabel}</Button>
        <Button variant="destructive" className="flex-1" onClick={onConfirm}>{confirmLabel}</Button>
      </div>
    </BottomSheet>
  )
}

export type FilterGroup = { key: string; label: string; options: string[] }

// Filtro (diseño de wine): cada grupo es una fila que se abre, de a una. Al lado del nombre, en gris,
// lo que ya está elegido; al abrirla, chips para elegir varias. Líneas divisorias de lado a lado
// entre las filas, y Confirmar al final.
function FilterSheet({
  open,
  onOpenChange,
  title = "Filtrar por",
  groups,
  value,
  onChange,
  onConfirm,
  confirmLabel = "Confirmar",
  inline,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: React.ReactNode
  groups: FilterGroup[]
  /** lo elegido en cada grupo, ej: { uva: ["Malbec"] } */
  value: Record<string, string[]>
  onChange: (value: Record<string, string[]>) => void
  onConfirm: () => void
  confirmLabel?: string
  inline?: boolean
}) {
  const [openKey, setOpenKey] = React.useState<string | null>(groups[0]?.key ?? null)
  const toggle = (key: string, option: string) => {
    const chosen = value[key] ?? []
    onChange({ ...value, [key]: chosen.includes(option) ? chosen.filter((o) => o !== option) : [...chosen, option] })
  }
  return (
    <BottomSheet open={open} onOpenChange={onOpenChange} title={title} inline={inline}>
      <div className="-mx-box-l -mt-4">
        {groups.map((g) => {
          const chosen = value[g.key] ?? []
          const isOpen = openKey === g.key
          return (
            <div key={g.key} className="border-b border-border">
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpenKey(isOpen ? null : g.key)}
                className="flex w-full items-center gap-3 px-box-l py-box-m text-left text-sm outline-none focus-visible:bg-secondary"
              >
                <span className="min-w-0 flex-1">
                  <span className="font-medium">{g.label}</span>
                  {chosen.length > 0 && <span className="text-muted-foreground"> — {chosen.join(", ")}</span>}
                </span>
                <ChevronDown className={cn("size-4 shrink-0 text-muted-foreground transition-transform duration-200", isOpen && "rotate-180")} />
              </button>
              {isOpen && (
                <ChipGroup className="px-box-l pb-box-m">
                  {g.options.map((o) => (
                    <Chip key={o} selected={chosen.includes(o)} onClick={() => toggle(g.key, o)}>{o}</Chip>
                  ))}
                </ChipGroup>
              )}
            </div>
          )
        })}
      </div>
      <Button className="w-full" onClick={onConfirm}>{confirmLabel}</Button>
    </BottomSheet>
  )
}

// Pestañas de una hoja que miden siempre lo mismo: el alto lo pone la pestaña principal
// (`base`, ej: Info), que se dibuja siempre aunque no se vea. Las otras pestañas ocupan
// exactamente ese alto: lo de arriba (`top`, ej: sub-pestañas) queda fijo, el contenido se
// desplaza si no entra (con el degradé que avisa que hay más abajo) y los botones (`footer`)
// quedan siempre pegados abajo.
function SheetPanels({
  base,
  showBase,
  top,
  footer,
  children,
}: {
  base: React.ReactNode
  showBase: boolean
  top?: React.ReactNode
  footer?: React.ReactNode
  children?: React.ReactNode
}) {
  return (
    <div data-slot="sheet-panels" className="relative">
      <div className={cn("flex flex-col gap-4", !showBase && "invisible")}>{base}</div>
      {!showBase && (
        <div className="absolute inset-0 flex flex-col gap-4">
          {top}
          <PanelScroll>{children}</PanelScroll>
          {footer && <div className="flex gap-box-xs *:flex-1">{footer}</div>}
        </div>
      )}
    </div>
  )
}

// La zona que se desplaza de una pestaña, con el degradé abajo mientras quede más por ver.
// 4px de aire arriba y abajo para que no se corte el borde de foco de los campos.
function PanelScroll({ children }: { children?: React.ReactNode }) {
  const more = useMoreBelow()
  return (
    <div className="relative -mx-box-l -my-1 min-h-0 flex-1">
      <div ref={more.ref} onScroll={more.onScroll} className="h-full overflow-y-auto px-box-l py-1">
        <div className="flex flex-col gap-4">{children}</div>
      </div>
      <ScrollFade show={more.show} />
    </div>
  )
}

export { BottomSheet, ConfirmSheet, FilterSheet, SheetPanels, SheetSummary, StepHeader }
