import * as React from "react"
import { X } from "lucide-react"
import { OUTFIT as C } from "./palette"
import { ActionButton } from "./action-button"

// Hoja que sube desde abajo: título + cruz con línea abajo, y el contenido.
export function BottomSheet({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: React.ReactNode; children: React.ReactNode }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 flex items-end justify-center" style={{ background: "rgba(0,0,0,0.4)", zIndex: 200 }} onClick={onClose}>
      <div className="w-full rounded-t-[16px]" style={{ background: C.white }} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-4 py-4" style={{ borderBottom: "1px solid " + C.border }}>
          <span className="text-sm font-medium" style={{ color: C.ink }}>{title}</span>
          <button type="button" aria-label="Cerrar" onClick={onClose} style={{ background: "transparent", border: "none", padding: 0 }}>
            <X style={{ width: 20, height: 20, color: C.muted }} />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

// Confirmación en hoja de abajo: pregunta, aclaración en gris, Volver + acción en rojo
export function ConfirmSheet({ open, onClose, title, question, detail, confirmLabel, onConfirm }: {
  open: boolean; onClose: () => void; title: string; question: string; detail: string; confirmLabel: string; onConfirm: () => void
}) {
  return (
    <BottomSheet open={open} onClose={onClose} title={title}>
      <div className="p-6 pb-10">
        <p className="mb-1 text-sm" style={{ color: C.ink }}>{question}</p>
        <p className="mb-6 text-sm" style={{ color: C.muted }}>{detail}</p>
        <div className="flex gap-3">
          <ActionButton tone="secondary" className="flex-1" onClick={onClose}>Volver</ActionButton>
          <ActionButton tone="danger" className="flex-1" onClick={onConfirm}>{confirmLabel}</ActionButton>
        </div>
      </div>
    </BottomSheet>
  )
}

// Ventana centrada (ej: Nueva prenda): título + subtítulo, cruz, línea abajo
export function CenterModal({ open, onClose, title, subtitle, children, footer }: {
  open: boolean; onClose: () => void; title: string; subtitle?: string; children: React.ReactNode; footer?: React.ReactNode
}) {
  if (!open) return null
  return (
    <div className="fixed inset-0 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.5)", zIndex: 200 }}>
      <div className="relative w-full max-w-sm rounded-[12px]" style={{ background: C.white, maxHeight: "92vh", overflowY: "auto" }}>
        <div className="flex items-center justify-between border-b px-6 pt-6 pb-4" style={{ borderColor: C.border }}>
          <div>
            <h3 className="text-sm font-medium" style={{ color: C.ink }}>{title}</h3>
            {subtitle && <p className="mt-0.5 text-xs" style={{ color: C.muted }}>{subtitle}</p>}
          </div>
          <button type="button" aria-label="Cerrar" onClick={onClose}><X className="h-5 w-5" style={{ color: C.muted }} /></button>
        </div>
        <div className="space-y-5 px-6 py-5">{children}</div>
        {footer && <div className="px-6 pb-6">{footer}</div>}
      </div>
    </div>
  )
}
