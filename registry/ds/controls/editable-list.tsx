import * as React from "react"
import { Check, ChevronDown, Pencil, Trash2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { BottomSheet, ConfirmSheet } from "@/components/ui/bottom-sheet"

// Lista que se edita (diseño de bookmarks): una caja con una fila por cosa, para administrar una lista
// (ej: las categorías y sus subcategorías). Cada fila: ícono opcional (va del color de la app, ej: ✸;
// un emoji queda con sus colores), nombre, un dato chico en gris (ej: "3 bookmarks"), lápiz y tacho.
// - El lápiz convierte el nombre en un campo: Enter o el tilde guardan, Escape cancela. Si tocás otra
//   cosa mientras escribís, se guarda lo escrito.
// - El tacho avisa a la app (`onDelete`), que pide confirmación (ConfirmSheet).
// - Si una cosa tiene `children` (aunque esté vacío), la fila se abre y muestra sus ítems corridos a la
//   altura del nombre, con "+ Agregar…" en una franja gris al final.
// - Con `onAdd`, al final va "+ Agregar…": se convierte en un campo para escribir el nombre nuevo.
// - `flush`: sin caja, de lado a lado (adentro de una hoja). Para una hoja con Cancelar y Confirmar,
//   usar EditListSheet.

export type EditableItem = {
  id: string
  label: string
  /** dato chico en gris al lado del nombre (ej: "3 bookmarks") */
  meta?: React.ReactNode
  /** va antes del nombre, del color de la app (ej: "✸"); un emoji queda con sus colores */
  icon?: React.ReactNode
  /** ítems de adentro: con esto la fila se abre (aunque esté vacío, para poder agregar) */
  children?: EditableItem[]
}

type Where = { id: string; parent?: string }
const same = (a: Where | null, b: Where) => !!a && a.id === b.id && a.parent === b.parent

function RowActions({ editing, onEdit, onSave, onDelete }: { editing: boolean; onEdit: () => void; onSave: () => void; onDelete: () => void }) {
  return (
    <div className="-mr-1 flex shrink-0 items-center">
      {editing ? (
        <Button variant="ghost" size="icon-sm" aria-label="Guardar" className="text-brand-text" onClick={onSave}><Check className="size-3.5" /></Button>
      ) : (
        <Button variant="ghost" size="icon-sm" aria-label="Editar" className="text-muted-foreground" onClick={onEdit}><Pencil className="size-3.5" /></Button>
      )}
      <Button variant="ghost" size="icon-sm" aria-label="Borrar" className="text-destructive hover:text-destructive" onClick={onDelete}><Trash2 className="size-3.5" /></Button>
    </div>
  )
}

// Campo para escribir un nombre (cambiar uno o agregar uno nuevo). Al salir del campo se guarda.
function NameInput({ value, onChange, onSave, onCancel, placeholder, strong }: {
  value: string; onChange: (v: string) => void; onSave: () => void; onCancel: () => void; placeholder?: string; strong?: boolean
}) {
  return (
    <input
      autoFocus
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onSave}
      onKeyDown={(e) => { if (e.key === "Enter") onSave(); if (e.key === "Escape") onCancel() }}
      className={cn("min-w-0 flex-1 bg-transparent caret-brand outline-none placeholder:text-muted-foreground", strong && "font-medium")}
    />
  )
}

type ListText = {
  addLabel?: string
  addChildLabel?: string
  addPlaceholder?: string
  addChildPlaceholder?: string
  /** texto si la lista está vacía */
  empty?: React.ReactNode
}

export function EditableList({
  items,
  onRename,
  onDelete,
  onAdd,
  addLabel = "Agregar",
  addChildLabel = "Agregar",
  addPlaceholder,
  addChildPlaceholder,
  empty,
  flush,
  className,
}: ListText & {
  items: EditableItem[]
  /** el nombre nuevo de una cosa; `parent` es la de afuera si es un ítem de adentro */
  onRename?: (item: EditableItem, name: string, parent?: EditableItem) => void
  onDelete?: (item: EditableItem, parent?: EditableItem) => void
  /** agregar una cosa (o un ítem adentro de `parent`); sin esto no aparece "+ Agregar…" */
  onAdd?: (name: string, parent?: EditableItem) => void
  /** sin caja, de lado a lado: adentro de una hoja */
  flush?: boolean
  className?: string
}) {
  const [open, setOpen] = React.useState<string | null>(null)
  const [editing, setEditing] = React.useState<Where | null>(null)
  const [editValue, setEditValue] = React.useState("")
  const [adding, setAdding] = React.useState<string | null>(null) // "" = afuera; si no, el id de la cosa
  const [newValue, setNewValue] = React.useState("")
  // Lo que se está escribiendo ahora (así Enter + salir del campo no guardan dos veces)
  const editingNow = React.useRef<Where | null>(null)
  const addingNow = React.useRef<string | null>(null)

  const startEdit = (w: Where, label: string) => { editingNow.current = w; setEditing(w); setEditValue(label) }
  const cancelEdit = () => { editingNow.current = null; setEditing(null) }
  const saveEdit = (item: EditableItem, parent?: EditableItem) => {
    if (!same(editingNow.current, { id: item.id, parent: parent?.id })) return
    editingNow.current = null
    const name = editValue.trim()
    if (name && name !== item.label) onRename?.(item, name, parent)
    setEditing(null)
  }
  const startAdd = (where: string) => { addingNow.current = where; setAdding(where); setNewValue("") }
  const cancelAdd = () => { addingNow.current = null; setAdding(null); setNewValue("") }
  const saveAdd = (parent?: EditableItem) => {
    if (addingNow.current !== (parent?.id ?? "")) return
    addingNow.current = null
    const name = newValue.trim()
    if (name) onAdd?.(name, parent)
    setAdding(null); setNewValue("")
  }

  // El nombre arranca siempre a la misma altura: los ítems de adentro llevan el ícono de afuera invisible
  const iconSlot = (icon: React.ReactNode, hidden?: boolean) =>
    icon != null && <span aria-hidden={hidden} className={cn("shrink-0 text-brand-text", hidden && "invisible")}>{icon}</span>

  return (
    <div
      data-slot="editable-list"
      className={cn(
        "text-sm",
        flush ? "-mx-box-l [--row-px:var(--spacing-box-l)]" : "overflow-hidden rounded-box-l bg-card [--row-px:var(--spacing-box-m)]",
        className
      )}
    >
      {items.length === 0 && adding !== "" && empty && (
        <p className="px-(--row-px) py-box-l text-center text-muted-foreground">{empty}</p>
      )}

      {items.map((item) => {
        const here = { id: item.id }
        const isEditing = same(editing, here)
        const canOpen = item.children !== undefined
        const isOpen = canOpen && open === item.id
        return (
          <div key={item.id} className="border-b border-border">
            <div className="flex items-center gap-box-s px-(--row-px) py-box-s">
              {isEditing ? (
                <div className="flex min-w-0 flex-1 items-center gap-1.5">
                  {iconSlot(item.icon)}
                  <NameInput strong value={editValue} onChange={setEditValue} onSave={() => saveEdit(item)} onCancel={cancelEdit} />
                </div>
              ) : (
                <button
                  type="button"
                  aria-expanded={canOpen ? isOpen : undefined}
                  disabled={!canOpen}
                  onClick={() => setOpen(isOpen ? null : item.id)}
                  className="flex min-w-0 flex-1 items-center gap-1.5 self-stretch text-left disabled:cursor-default"
                >
                  {iconSlot(item.icon)}
                  <span className="truncate font-medium">{item.label}</span>
                  {item.meta != null && <span className="shrink-0 text-xs text-muted-foreground">{item.meta}</span>}
                  {canOpen && <ChevronDown className={cn("ml-auto size-4 shrink-0 text-muted-foreground transition-transform duration-200", isOpen && "rotate-180")} />}
                </button>
              )}
              <RowActions editing={isEditing} onEdit={() => startEdit(here, item.label)} onSave={() => saveEdit(item)} onDelete={() => onDelete?.(item)} />
            </div>

            {isOpen && (
              <div className="border-t border-border">
                {item.children!.map((child) => {
                  const there = { id: child.id, parent: item.id }
                  const childEditing = same(editing, there)
                  return (
                    <div key={child.id} className="flex items-center gap-box-s border-b border-border px-(--row-px) py-box-s">
                      <div className="flex min-w-0 flex-1 items-center gap-1.5">
                        {iconSlot(item.icon, true)}
                        {childEditing ? (
                          <NameInput value={editValue} onChange={setEditValue} onSave={() => saveEdit(child, item)} onCancel={cancelEdit} />
                        ) : (
                          <span className="min-w-0 text-muted-foreground">
                            {child.label}
                            {child.meta != null && <span className="text-xs"> · {child.meta}</span>}
                          </span>
                        )}
                      </div>
                      <RowActions editing={childEditing} onEdit={() => startEdit(there, child.label)} onSave={() => saveEdit(child, item)} onDelete={() => onDelete?.(child, item)} />
                    </div>
                  )
                })}
                {onAdd && (adding === item.id ? (
                  <div className="flex items-center gap-box-s bg-inset px-(--row-px) py-box-s">
                    <div className="flex min-w-0 flex-1 items-center gap-1.5">
                      {iconSlot(item.icon, true)}
                      <NameInput value={newValue} onChange={setNewValue} onSave={() => saveAdd(item)} onCancel={cancelAdd} placeholder={addChildPlaceholder} />
                    </div>
                    <Button variant="ghost" size="icon-sm" aria-label="Agregar" className="-mr-1 text-brand-text" onClick={() => saveAdd(item)}><Check className="size-4" /></Button>
                  </div>
                ) : (
                  <button type="button" onClick={() => startAdd(item.id)} className="flex w-full items-center gap-1.5 bg-inset px-(--row-px) py-box-m text-left font-medium text-brand-text hover:bg-card-hover">
                    {iconSlot(item.icon, true)}+ {addChildLabel}
                  </button>
                ))}
              </div>
            )}
          </div>
        )
      })}

      {onAdd && (adding === "" ? (
        <div className="flex items-center gap-box-s px-(--row-px) py-box-s">
          <NameInput strong value={newValue} onChange={setNewValue} onSave={() => saveAdd()} onCancel={cancelAdd} placeholder={addPlaceholder} />
          <Button variant="ghost" size="icon-sm" aria-label="Agregar" className="-mr-1 text-brand-text" onClick={() => saveAdd()}><Check className="size-4" /></Button>
        </div>
      ) : (
        <button type="button" onClick={() => startAdd("")} className="flex w-full items-center px-(--row-px) py-box-m text-left font-medium text-brand-text hover:bg-card-hover">
          + {addLabel}
        </button>
      ))}
    </div>
  )
}

// ——— La lista en una hoja, con Cancelar y Confirmar ———
// Los cambios se juntan y recién se guardan con Confirmar (`onSave` recibe la lista entera nueva).
// Cancelar, la cruz o tocar afuera: si hay cambios sin guardar, pregunta si estás seguro.
// Borrar no pide confirmación (nada se guarda hasta Confirmar).

const shape = (list: EditableItem[]): unknown => list.map((i) => [i.id, i.label, i.children ? shape(i.children) : null])
const inside = (list: EditableItem[], parent: EditableItem | undefined, fn: (l: EditableItem[]) => EditableItem[]) =>
  parent ? list.map((i) => (i.id === parent.id ? { ...i, children: fn(i.children ?? []) } : i)) : fn(list)
let newId = 0

export function EditListSheet({
  open,
  onOpenChange,
  title,
  items,
  onSave,
  newItem = (name) => ({ id: `nuevo-${++newId}`, label: name }),
  formatName = (name) => name,
  cancelLabel = "Cancelar",
  confirmLabel = "Confirmar",
  ...text
}: ListText & {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: React.ReactNode
  items: EditableItem[]
  /** la lista entera como quedó, al tocar Confirmar */
  onSave: (items: EditableItem[]) => void
  /** cómo se arma una cosa nueva (ej: con su emoji); por defecto sólo el nombre */
  newItem?: (name: string, parent?: EditableItem) => EditableItem
  /** cómo queda escrito un nombre (ej: con mayúscula al principio) */
  formatName?: (name: string) => string
  cancelLabel?: string
  confirmLabel?: string
}) {
  const [draft, setDraft] = React.useState(items)
  const [asking, setAsking] = React.useState(false)
  // Cada vez que se abre, arranca de lo guardado
  const [wasOpen, setWasOpen] = React.useState(open)
  if (open !== wasOpen) {
    setWasOpen(open)
    if (open) { setDraft(items); setAsking(false) }
  }

  const changed = JSON.stringify(shape(draft)) !== JSON.stringify(shape(items))
  const tryClose = () => (changed ? setAsking(true) : onOpenChange(false))
  const confirm = () => { if (changed) onSave(draft); onOpenChange(false) }

  return (
    <>
      <BottomSheet open={open && !asking} onOpenChange={(o) => { if (!o) tryClose() }} title={title}>
        <EditableList
          flush
          className="-mt-4"
          items={draft}
          onRename={(item, name, parent) => setDraft((d) => inside(d, parent, (l) => l.map((x) => (x.id === item.id ? { ...x, label: formatName(name) } : x))))}
          onDelete={(item, parent) => setDraft((d) => inside(d, parent, (l) => l.filter((x) => x.id !== item.id)))}
          onAdd={(name, parent) => setDraft((d) => inside(d, parent, (l) => [...l, newItem(formatName(name), parent)]))}
          {...text}
        />
        <div className="flex gap-box-xs *:flex-1">
          <Button variant="destructive-soft" onClick={tryClose}>{cancelLabel}</Button>
          <Button onClick={confirm}>{confirmLabel}</Button>
        </div>
      </BottomSheet>
      <ConfirmSheet
        open={open && asking}
        onOpenChange={(o) => { if (!o) setAsking(false) }}
        title={title}
        question="¿Seguro que querés salir sin guardar?"
        detail="Los cambios que hiciste se van a perder."
        cancelLabel="Seguir editando"
        confirmLabel="Salir sin guardar"
        onConfirm={() => { setAsking(false); onOpenChange(false) }}
      />
    </>
  )
}
