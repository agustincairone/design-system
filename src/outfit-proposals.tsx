// Propuestas: cómo quedarían en el estilo del sistema los componentes de outfit
// que todavía no tienen equivalente. Si se aprueban, pasan a ser componentes del DS.
import * as React from "react"
import { Archive, ImageIcon, Plus, X } from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Chip } from "@/components/ui/chip"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import type { OutfitItem } from "@/components/outfit/item-card"
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

// ---------- fichas de prenda ----------
export function PColorDots({ colors, size = 14 }: { colors?: { hex: string }[]; size?: number }) {
  if (!colors?.length) return null
  const step = size - Math.round(size * 0.45)
  return (
    <span className="relative inline-flex flex-shrink-0" style={{ width: size + (colors.length - 1) * step, height: size }}>
      {colors.map((c, i) => (
        <span key={i} className="absolute rounded-full" style={{ left: i * step, width: size, height: size, background: c.hex, boxShadow: "inset 0 0 0 1px var(--border)", zIndex: i }} />
      ))}
    </span>
  )
}

function PPhoto({ item, className, gray }: { item: OutfitItem; className?: string; gray?: boolean }) {
  return (
    <div className={cn("relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-sm bg-card", className)}>
      {item.imageUrl ? <img src={item.imageUrl} alt="" className={cn("absolute inset-0 size-full object-cover", gray && "grayscale")} /> : <ImageIcon className="size-5 text-muted-foreground" />}
      {item.archived && <span className="absolute top-1 right-1 flex size-5 items-center justify-center rounded-full bg-card"><Archive className="size-3 text-muted-foreground" /></span>}
    </div>
  )
}

function PItemText({ item, className }: { item: OutfitItem; className?: string }) {
  return (
    <div className={cn("flex min-w-0 flex-col items-center gap-0.5 text-center text-[11px] leading-[14px] font-medium", className)}>
      {item.marca && <p className="max-w-full truncate text-foreground">{item.marca}</p>}
      {item.modelo && <p className="max-w-full truncate text-muted-foreground">{item.modelo}</p>}
      {item.tipo && <p className="max-w-full truncate text-muted-foreground/70">{item.tipo}</p>}
    </div>
  )
}

export function PItemCard({ item, selected, onClick }: { item: OutfitItem; selected?: boolean; onClick?: () => void }) {
  return (
    <button type="button" onClick={onClick}
      className={cn("flex min-w-0 flex-col items-center gap-2 rounded-box-s bg-inset p-box-s outline-none transition-shadow hover:ring-2 hover:ring-brand",
        selected && "ring-2 ring-primary")}>
      <PPhoto item={item} />
      <PColorDots colors={item.colors} size={11} />
      <PItemText item={item} />
    </button>
  )
}

export function PItemCardSmall({ item }: { item: OutfitItem }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <PPhoto item={item} className="size-[60px] bg-inset" />
      <PColorDots colors={item.colors} size={10} />
      <PItemText item={item} className="text-[10px]" />
    </div>
  )
}

export function PItemRow({ item, right }: { item: OutfitItem; right?: React.ReactNode }) {
  return (
    <div className="flex items-stretch gap-3 rounded-box-s bg-inset p-box-s">
      <PPhoto item={item} className="size-16 flex-shrink-0" />
      <div className="flex min-w-0 flex-1 flex-col justify-between">
        <PColorDots colors={item.colors} size={11} />
        <div className="flex flex-col gap-0.5">
          {item.marca && <p className="truncate text-xs font-medium">{item.marca}</p>}
          <p className="truncate text-xs font-medium text-muted-foreground">{[item.modelo, item.tipo].filter(Boolean).join(" · ")}</p>
        </div>
      </div>
      {right && <div className="flex flex-shrink-0 flex-col items-end">{right}</div>}
    </div>
  )
}

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

// ---------- hojas y ventanas ----------
const SHEET_TITLE = "title-box text-[20px] leading-[1.2] font-semibold text-foreground"

export function PBottomSheet({ open, onClose, title, children, inline }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode; inline?: boolean }) {
  if (inline) return (
    <div className="flex h-full items-end bg-black/10 supports-backdrop-filter:backdrop-blur-xs">
      <div className="relative flex w-full flex-col gap-4 rounded-t-box-l bg-popover p-box-l pb-8 text-sm text-popover-foreground shadow-lg">
        <div className="pr-10"><p className={SHEET_TITLE}>{title}</p></div>
        <Button variant="ghost" size="icon-sm" className="absolute top-3 right-3" onClick={onClose}><X /></Button>
        {children}
      </div>
    </div>
  )
  return (
    <Sheet open={open} onOpenChange={(o) => { if (!o) onClose() }}>
      <SheetContent side="bottom" aria-describedby={undefined} className="mx-auto w-full max-w-md gap-4 rounded-t-box-l border-0 p-box-l pb-8">
        <SheetHeader className="p-0 pr-10"><SheetTitle className={SHEET_TITLE}>{title}</SheetTitle></SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  )
}

export function PConfirmSheet({ open, onClose, title, question, detail, confirmLabel, onConfirm, inline }: {
  open: boolean; onClose: () => void; title: string; question: string; detail: string; confirmLabel: string; onConfirm: () => void; inline?: boolean
}) {
  return (
    <PBottomSheet open={open} onClose={onClose} title={title} inline={inline}>
      <div className="flex flex-col gap-1">
        <p className="text-sm">{question}</p>
        <p className="text-sm text-muted-foreground">{detail}</p>
      </div>
      <div className="flex gap-2">
        <Button variant="secondary" className="flex-1" onClick={onClose}>Volver</Button>
        <Button variant="destructive" className="flex-1" onClick={onConfirm}>{confirmLabel}</Button>
      </div>
    </PBottomSheet>
  )
}

export function PCenterModal({ open, onClose, title, subtitle, children, footer, inline }: {
  open: boolean; onClose: () => void; title: string; subtitle?: string; children: React.ReactNode; footer?: React.ReactNode; inline?: boolean
}) {
  if (inline) return (
    <div className="flex h-full items-center justify-center bg-black/10 p-4 supports-backdrop-filter:backdrop-blur-xs">
      <div className="relative flex w-full max-w-sm flex-col gap-5 rounded-box-l bg-card p-box-l text-sm">
        <div className="pr-8">
          <p className="title-box text-[20px] leading-[1.2] font-semibold">{title}</p>
          {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
        </div>
        <Button variant="ghost" size="icon-sm" className="absolute top-2 right-2" onClick={onClose}><X /></Button>
        {children}
        {footer}
      </div>
    </div>
  )
  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) onClose() }}>
      <DialogContent aria-describedby={undefined} className="flex max-h-[92vh] flex-col gap-5 overflow-y-auto rounded-box-l bg-card p-box-l ring-0">
        <div className="pr-8">
          <DialogTitle className="title-box text-[20px] leading-[1.2] font-semibold">{title}</DialogTitle>
          {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
        </div>
        {children}
        {footer}
      </DialogContent>
    </Dialog>
  )
}

// ---------- barra de abajo y vacío ----------
export function PBottomNav<T extends string>({ items, value, onChange }: { items: { key: T; icon: LucideIcon; label?: string }[]; value: T; onChange: (k: T) => void }) {
  return (
    <div className="flex h-16 w-full items-center rounded-box-l bg-card">
      {items.map(({ key, icon: Icon, label }) => {
        const on = value === key
        return (
          <button key={key} type="button" aria-label={label} onClick={() => onChange(key)}
            className={cn("flex h-full flex-1 flex-col items-center justify-center gap-1.5 transition-colors", on ? "text-primary" : "text-muted-foreground hover:text-foreground")}>
            <Icon className="size-6" />
            <span className={cn("dot", on ? "bg-primary" : "bg-transparent")} />
          </button>
        )
      })}
    </div>
  )
}

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
