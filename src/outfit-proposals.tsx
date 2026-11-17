// Propuestas: cómo quedarían en el estilo del sistema los componentes de outfit
// que todavía no tienen equivalente. Si se aprueban, pasan a ser componentes del DS.
import * as React from "react"
import { Plus } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Chip } from "@/components/ui/chip"
import { Input } from "@/components/ui/input"
import { BottomSheet, ConfirmSheet } from "@/components/ui/bottom-sheet"
import type { DayOption } from "@/components/outfit/date-strip"

// ---------- etiqueta + campo con + + chips guardados ----------
export function PFieldLabel({ children, right }: { children: React.ReactNode; right?: React.ReactNode }) {
  return (
    <div className="mb-2 flex items-center">
      <p className="eyebrow-plain">{children}</p>
      {right && <span className="ml-auto text-xs text-muted-foreground">{right}</span>}
    </div>
  )
}

// Chip con cruz = el Chip del sistema
export function PChipTag({ label, selected, onSelect, onDelete }: { label: string; selected?: boolean; onSelect?: () => void; onDelete?: () => void }) {
  return <Chip selected={selected} onClick={onSelect} onRemove={onDelete} removeLabel={"Borrar " + label}>{label}</Chip>
}

export function PInputAdd({ value, onChange, onAdd, placeholder }: { value: string; onChange: (v: string) => void; onAdd: () => void; placeholder?: string }) {
  return (
    <div className="flex gap-2">
      <Input placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") onAdd() }} />
      <Button size="icon" className="size-10" onClick={onAdd} disabled={!value.trim()} aria-label="Agregar"><Plus className="size-4" /></Button>
    </div>
  )
}

// ---------- fichas de prenda (ya son componente del DS) ----------
export { ColorDots as PColorDots, ItemCard as PItemCard, ItemCardSmall as PItemCardSmall, ItemRow as PItemRow } from "@/components/cards/item-card"

// ---------- colores y días ----------
const LIGHTS = ["#FFFFFF", "#D4D4D4", "#F0E6D6"]
export function PColorSwatches({ colors, value, onToggle, max = 3 }: { colors: { name: string; hex: string }[]; value: { hex: string }[]; onToggle: (c: { name: string; hex: string }) => void; max?: number }) {
  return (
    <div className="flex flex-wrap gap-2 p-1">
      {colors.map((c) => {
        const sel = value.find((p) => p.hex === c.hex)
        return (
          <button key={c.hex} type="button" title={c.name} onClick={() => onToggle(c)}
            className={cn("relative size-[30px] rounded-full outline-none transition-[box-shadow,opacity]",
              sel ? "ring-2 ring-primary ring-offset-2 ring-offset-card" : "hover:ring-2 hover:ring-brand/50 hover:ring-offset-2 hover:ring-offset-card",
              !sel && value.length >= max && "opacity-35")}
            style={{ background: c.hex, boxShadow: "inset 0 0 0 1px var(--border)" }}>
            {sel && <span className="absolute inset-0 flex items-center justify-center"><svg viewBox="0 0 24 24" className="size-3" fill="none" stroke={LIGHTS.includes(c.hex) ? "#1c1917" : "#fff"} strokeWidth="3"><path d="M20 6 9 17l-5-5" /></svg></span>}
          </button>
        )
      })}
    </div>
  )
}

export function PDateStrip({ days, value, onChange }: { days: DayOption[]; value: string; onChange: (d: string) => void }) {
  return (
    <div className="flex gap-2 overflow-x-auto py-1" style={{ scrollbarWidth: "none" }}>
      {days.map((d) => {
        const sel = value === d.dateStr
        return (
          <button key={d.dateStr} type="button" onClick={() => onChange(d.dateStr)}
            className={cn("relative flex min-w-[54px] flex-shrink-0 flex-col items-center rounded-box-s px-3 py-2 transition-colors outline-none",
              sel ? "bg-primary text-primary-foreground" : "bg-inset hover:bg-brand hover:text-brand-foreground",
              !sel && d.isToday && "ring-1 ring-primary ring-inset")}>
            {d.marked && <span className={cn("dot absolute top-1.5 right-1.5", sel ? "bg-primary-foreground" : "bg-primary")} />}
            <span className="text-xs font-medium">{d.dayName.slice(0, 3)}</span>
            <span className="mt-0.5 text-xs opacity-60">{d.label}</span>
          </button>
        )
      })}
    </div>
  )
}

// ---------- hojas y ventanas (ya son componente del DS: BottomSheet) ----------
export function PBottomSheet({ open, onClose, title, children, inline }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode; inline?: boolean }) {
  return <BottomSheet open={open} onOpenChange={(o) => { if (!o) onClose() }} title={title} inline={inline}>{children}</BottomSheet>
}

export function PConfirmSheet({ open, onClose, inline, ...p }: {
  open: boolean; onClose: () => void; title: string; question: string; detail: string; confirmLabel: string; onConfirm: () => void; inline?: boolean
}) {
  return <ConfirmSheet open={open} onOpenChange={(o) => { if (!o) onClose() }} inline={inline} {...p} />
}

// La ventana centrada también pasa a ser una hoja desde abajo
export function PCenterModal({ open, onClose, title, subtitle, children, footer, inline }: {
  open: boolean; onClose: () => void; title: string; subtitle?: string; children: React.ReactNode; footer?: React.ReactNode; inline?: boolean
}) {
  return (
    <BottomSheet open={open} onOpenChange={(o) => { if (!o) onClose() }} title={subtitle ? <>{title} <span className="font-normal text-muted-foreground">· {subtitle}</span></> : title} inline={inline}>
      {children}
      {footer}
    </BottomSheet>
  )
}

// ---------- barra de abajo y vacío ----------
export { BottomNav as PBottomNav } from "@/components/controls/bottom-nav"

export function PEmptyState({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <div className="flex size-16 items-center justify-center rounded-full bg-inset">{icon}</div>
      <div>
        <p className="title-box mb-1">{title}</p>
        <p className="text-sm text-muted-foreground">{text}</p>
      </div>
    </div>
  )
}
