import * as React from "react"
import { Check, ChevronDown, Pencil, Trash2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

// Lista que se edita (diseño de bookmarks): una caja con una fila por cosa, para administrar una lista
// (ej: las categorías y sus subcategorías). Cada fila: ícono opcional (va del color de la app, ej: ✸;
// un emoji queda con sus colores), nombre, un dato chico en gris (ej: "3 bookmarks"), lápiz y tacho.
// - El lápiz convierte el nombre en un campo: Enter o el tilde guardan, Escape cancela.
// - El tacho avisa a la app (`onDelete`), que pide confirmación (ConfirmSheet).
// - Si una cosa tiene `children` (aunque esté vacío), la fila se abre y muestra sus ítems corridos a la
//   altura del nombre, con "+ Agregar…" en una franja gris al final.
// - Con `onAdd`, al final va "+ Agregar…": se convierte en un campo para escribir el nombre nuevo.

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

// Campo para escribir un nombre (cambiar uno o agregar uno nuevo)
function NameInput({ value, onChange, onSave, onCancel, placeholder, strong }: {
  value: string; onChange: (v: string) => void; onSave: () => void; onCancel: () => void; placeholder?: string; strong?: boolean
}) {
  return (
    <input
      autoFocus
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => { if (e.key === "Enter") onSave(); if (e.key === "Escape") onCancel() }}
      className={cn("min-w-0 flex-1 bg-transparent caret-brand outline-none placeholder:text-muted-foreground", strong && "font-medium")}
    />
  )
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
  className,
}: {
  items: EditableItem[]
  /** el nombre nuevo de una cosa; `parent` es la de afuera si es un ítem de adentro */
  onRename?: (item: EditableItem, name: string, parent?: EditableItem) => void
  onDelete?: (item: EditableItem, parent?: EditableItem) => void
  /** agregar una cosa (o un ítem adentro de `parent`); sin esto no aparece "+ Agregar…" */
  onAdd?: (name: string, parent?: EditableItem) => void
  addLabel?: string
  addChildLabel?: string
  addPlaceholder?: string
  addChildPlaceholder?: string
  /** texto si la lista está vacía */
  empty?: React.ReactNode
  className?: string
}) {
  const [open, setOpen] = React.useState<string | null>(null)
  const [editing, setEditing] = React.useState<Where | null>(null)
  const [editValue, setEditValue] = React.useState("")
  const [adding, setAdding] = React.useState<string | null>(null) // "" = afuera; si no, el id de la cosa
  const [newValue, setNewValue] = React.useState("")

  const startEdit = (w: Where, label: string) => { setEditing(w); setEditValue(label); setAdding(null) }
  const saveEdit = (item: EditableItem, parent?: EditableItem) => {
    const name = editValue.trim()
    if (name && name !== item.label) onRename?.(item, name, parent)
    setEditing(null)
  }
  const startAdd = (where: string) => { setAdding(where); setNewValue(""); setEditing(null) }
  const saveAdd = (parent?: EditableItem) => {
    const name = newValue.trim()
    if (name) onAdd?.(name, parent)
    setAdding(null); setNewValue("")
  }
  const cancelAdd = () => { setAdding(null); setNewValue("") }

  // El nombre arranca siempre a la misma altura: los ítems de adentro llevan el ícono de afuera invisible
  const iconSlot = (icon: React.ReactNode, hidden?: boolean) =>
    icon != null && <span aria-hidden={hidden} className={cn("shrink-0 text-brand-text", hidden && "invisible")}>{icon}</span>

  return (
    <div data-slot="editable-list" className={cn("overflow-hidden rounded-box-l bg-card text-sm", className)}>
      {items.length === 0 && adding !== "" && empty && (
        <p className="px-box-m py-box-l text-center text-muted-foreground">{empty}</p>
      )}

      {items.map((item) => {
        const here = { id: item.id }
        const isEditing = same(editing, here)
        const canOpen = item.children !== undefined
        const isOpen = canOpen && open === item.id
        return (
          <div key={item.id} className="border-b border-border">
            <div className="flex items-center gap-box-s px-box-m py-box-s">
              {isEditing ? (
                <div className="flex min-w-0 flex-1 items-center gap-1.5">
                  {iconSlot(item.icon)}
                  <NameInput strong value={editValue} onChange={setEditValue} onSave={() => saveEdit(item)} onCancel={() => setEditing(null)} />
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
                    <div key={child.id} className="flex items-center gap-box-s border-b border-border px-box-m py-box-s">
                      <div className="flex min-w-0 flex-1 items-center gap-1.5">
                        {iconSlot(item.icon, true)}
                        {childEditing ? (
                          <NameInput value={editValue} onChange={setEditValue} onSave={() => saveEdit(child, item)} onCancel={() => setEditing(null)} />
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
                  <div className="flex items-center gap-box-s bg-inset px-box-m py-box-s">
                    <div className="flex min-w-0 flex-1 items-center gap-1.5">
                      {iconSlot(item.icon, true)}
                      <NameInput value={newValue} onChange={setNewValue} onSave={() => saveAdd(item)} onCancel={cancelAdd} placeholder={addChildPlaceholder} />
                    </div>
                    <Button variant="ghost" size="icon-sm" aria-label="Agregar" className="-mr-1 text-brand-text" onClick={() => saveAdd(item)}><Check className="size-4" /></Button>
                  </div>
                ) : (
                  <button type="button" onClick={() => startAdd(item.id)} className="flex w-full items-center gap-1.5 bg-inset px-box-m py-box-m text-left font-medium text-brand-text hover:bg-card-hover">
                    {iconSlot(item.icon, true)}+ {addChildLabel}
                  </button>
                ))}
              </div>
            )}
          </div>
        )
      })}

      {onAdd && (adding === "" ? (
        <div className="flex items-center gap-box-s px-box-m py-box-s">
          <NameInput strong value={newValue} onChange={setNewValue} onSave={() => saveAdd()} onCancel={cancelAdd} placeholder={addPlaceholder} />
          <Button variant="ghost" size="icon-sm" aria-label="Agregar" className="-mr-1 text-brand-text" onClick={() => saveAdd()}><Check className="size-4" /></Button>
        </div>
      ) : (
        <button type="button" onClick={() => startAdd("")} className="flex w-full items-center px-box-m py-box-m text-left font-medium text-brand-text hover:bg-card-hover">
          + {addLabel}
        </button>
      ))}
    </div>
  )
}
