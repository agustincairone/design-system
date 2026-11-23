import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Check, ChevronDown, Pencil, Trash2 } from "lucide-react";
import { cn } from "../../lib/utils.js";
import { Button } from "../ui/button.js";
const same = (a, b) => !!a && a.id === b.id && a.parent === b.parent;
function RowActions({ editing, onEdit, onSave, onDelete }) {
    return (_jsxs("div", { className: "-mr-1 flex shrink-0 items-center", children: [editing ? (_jsx(Button, { variant: "ghost", size: "icon-sm", "aria-label": "Guardar", className: "text-brand-text", onClick: onSave, children: _jsx(Check, { className: "size-3.5" }) })) : (_jsx(Button, { variant: "ghost", size: "icon-sm", "aria-label": "Editar", className: "text-muted-foreground", onClick: onEdit, children: _jsx(Pencil, { className: "size-3.5" }) })), _jsx(Button, { variant: "ghost", size: "icon-sm", "aria-label": "Borrar", className: "text-destructive hover:text-destructive", onClick: onDelete, children: _jsx(Trash2, { className: "size-3.5" }) })] }));
}
// Campo para escribir un nombre (cambiar uno o agregar uno nuevo)
function NameInput({ value, onChange, onSave, onCancel, placeholder, strong }) {
    return (_jsx("input", { autoFocus: true, value: value, placeholder: placeholder, onChange: (e) => onChange(e.target.value), onKeyDown: (e) => { if (e.key === "Enter")
            onSave(); if (e.key === "Escape")
            onCancel(); }, className: cn("min-w-0 flex-1 bg-transparent caret-brand outline-none placeholder:text-muted-foreground", strong && "font-medium") }));
}
export function EditableList({ items, onRename, onDelete, onAdd, addLabel = "Agregar", addChildLabel = "Agregar", addPlaceholder, addChildPlaceholder, empty, className, }) {
    const [open, setOpen] = React.useState(null);
    const [editing, setEditing] = React.useState(null);
    const [editValue, setEditValue] = React.useState("");
    const [adding, setAdding] = React.useState(null); // "" = afuera; si no, el id de la cosa
    const [newValue, setNewValue] = React.useState("");
    const startEdit = (w, label) => { setEditing(w); setEditValue(label); setAdding(null); };
    const saveEdit = (item, parent) => {
        const name = editValue.trim();
        if (name && name !== item.label)
            onRename?.(item, name, parent);
        setEditing(null);
    };
    const startAdd = (where) => { setAdding(where); setNewValue(""); setEditing(null); };
    const saveAdd = (parent) => {
        const name = newValue.trim();
        if (name)
            onAdd?.(name, parent);
        setAdding(null);
        setNewValue("");
    };
    const cancelAdd = () => { setAdding(null); setNewValue(""); };
    // El nombre arranca siempre a la misma altura: los ítems de adentro llevan el ícono de afuera invisible
    const iconSlot = (icon, hidden) => icon != null && _jsx("span", { "aria-hidden": hidden, className: cn("shrink-0 text-brand-text", hidden && "invisible"), children: icon });
    return (_jsxs("div", { "data-slot": "editable-list", className: cn("overflow-hidden rounded-box-l bg-card text-sm", className), children: [items.length === 0 && adding !== "" && empty && (_jsx("p", { className: "px-box-m py-box-l text-center text-muted-foreground", children: empty })), items.map((item) => {
                const here = { id: item.id };
                const isEditing = same(editing, here);
                const canOpen = item.children !== undefined;
                const isOpen = canOpen && open === item.id;
                return (_jsxs("div", { className: "border-b border-border", children: [_jsxs("div", { className: "flex items-center gap-box-s px-box-m py-box-s", children: [isEditing ? (_jsxs("div", { className: "flex min-w-0 flex-1 items-center gap-1.5", children: [iconSlot(item.icon), _jsx(NameInput, { strong: true, value: editValue, onChange: setEditValue, onSave: () => saveEdit(item), onCancel: () => setEditing(null) })] })) : (_jsxs("button", { type: "button", "aria-expanded": canOpen ? isOpen : undefined, disabled: !canOpen, onClick: () => setOpen(isOpen ? null : item.id), className: "flex min-w-0 flex-1 items-center gap-1.5 self-stretch text-left disabled:cursor-default", children: [iconSlot(item.icon), _jsx("span", { className: "truncate font-medium", children: item.label }), item.meta != null && _jsx("span", { className: "shrink-0 text-xs text-muted-foreground", children: item.meta }), canOpen && _jsx(ChevronDown, { className: cn("ml-auto size-4 shrink-0 text-muted-foreground transition-transform duration-200", isOpen && "rotate-180") })] })), _jsx(RowActions, { editing: isEditing, onEdit: () => startEdit(here, item.label), onSave: () => saveEdit(item), onDelete: () => onDelete?.(item) })] }), isOpen && (_jsxs("div", { className: "border-t border-border", children: [item.children.map((child) => {
                                    const there = { id: child.id, parent: item.id };
                                    const childEditing = same(editing, there);
                                    return (_jsxs("div", { className: "flex items-center gap-box-s border-b border-border px-box-m py-box-s", children: [_jsxs("div", { className: "flex min-w-0 flex-1 items-center gap-1.5", children: [iconSlot(item.icon, true), childEditing ? (_jsx(NameInput, { value: editValue, onChange: setEditValue, onSave: () => saveEdit(child, item), onCancel: () => setEditing(null) })) : (_jsxs("span", { className: "min-w-0 text-muted-foreground", children: [child.label, child.meta != null && _jsxs("span", { className: "text-xs", children: [" \u00B7 ", child.meta] })] }))] }), _jsx(RowActions, { editing: childEditing, onEdit: () => startEdit(there, child.label), onSave: () => saveEdit(child, item), onDelete: () => onDelete?.(child, item) })] }, child.id));
                                }), onAdd && (adding === item.id ? (_jsxs("div", { className: "flex items-center gap-box-s bg-inset px-box-m py-box-s", children: [_jsxs("div", { className: "flex min-w-0 flex-1 items-center gap-1.5", children: [iconSlot(item.icon, true), _jsx(NameInput, { value: newValue, onChange: setNewValue, onSave: () => saveAdd(item), onCancel: cancelAdd, placeholder: addChildPlaceholder })] }), _jsx(Button, { variant: "ghost", size: "icon-sm", "aria-label": "Agregar", className: "-mr-1 text-brand-text", onClick: () => saveAdd(item), children: _jsx(Check, { className: "size-4" }) })] })) : (_jsxs("button", { type: "button", onClick: () => startAdd(item.id), className: "flex w-full items-center gap-1.5 bg-inset px-box-m py-box-m text-left font-medium text-brand-text hover:bg-card-hover", children: [iconSlot(item.icon, true), "+ ", addChildLabel] })))] }))] }, item.id));
            }), onAdd && (adding === "" ? (_jsxs("div", { className: "flex items-center gap-box-s px-box-m py-box-s", children: [_jsx(NameInput, { strong: true, value: newValue, onChange: setNewValue, onSave: () => saveAdd(), onCancel: cancelAdd, placeholder: addPlaceholder }), _jsx(Button, { variant: "ghost", size: "icon-sm", "aria-label": "Agregar", className: "-mr-1 text-brand-text", onClick: () => saveAdd(), children: _jsx(Check, { className: "size-4" }) })] })) : (_jsxs("button", { type: "button", onClick: () => startAdd(""), className: "flex w-full items-center px-box-m py-box-m text-left font-medium text-brand-text hover:bg-card-hover", children: ["+ ", addLabel] })))] }));
}
