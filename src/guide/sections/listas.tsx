// Guía, sección "Tarjetas y listas".
import * as React from "react"
import { Check, Shirt, Wallet, X } from "lucide-react"

import { ExpandList, ExpandRow, ExpandRowItem } from "@/components/controls/expand-row"
import { BottomSheet } from "@/components/ui/bottom-sheet"
import { Badge } from "@/components/ui/badge"
import { Demo, Section } from "@/guide/layout"
import { ItemCardsDemo, ScoresDemo, TallCardsDemo } from "@/guide/guide-demos"
import { EditableListDemo, EditListSheetDemo, LinkCardsDemo } from "@/guide/link-demos"
import { StatCardsDemo } from "@/guide/no-coke-demos"
import { IconListDemo } from "@/guide/gesture-demos"

// Filas que se abren (ej: gastos por mes en Análisis de pay)
function ExpandRowsDemo() {
  return (
    <div className="w-full max-w-sm">
        <ExpandRow defaultOpen title="Noviembre 2026" sub="IPC 2,2%" right={<span className="font-medium text-brand-text">$758.070</span>}>
          <ExpandRow defaultOpen title="🏠 Casa" right={<span className="font-medium text-muted-foreground">$561.770</span>}>
            <ExpandRowItem label="🛒 Supermercado" value="$320.000" />
            <ExpandRowItem label="⚡ Servicios" value="$241.770" />
          </ExpandRow>
          <ExpandRow title="🤖 Personal" right={<span className="font-medium text-muted-foreground">$76.300</span>}>
            <ExpandRowItem label="💊 Farmacia" value="$76.300" />
          </ExpandRow>
        </ExpandRow>
        <ExpandRow title="Octubre 2026" sub="IPC 2,7%" right={<span className="font-medium text-brand-text">$638.070</span>}>
          <ExpandRowItem label="🛒 Supermercado" value="$638.070" />
        </ExpandRow>
        <ExpandRow title="Septiembre 2026" sub="Sin gastos para abrir" right={<span className="font-medium text-brand-text">$0</span>} />
      </div>
  )
}

// Una fila del ejemplo: el nombre a la izquierda y las piezas a la derecha
function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
      <span className="eyebrow w-40 shrink-0">{label}</span>
      <div className="flex flex-wrap items-center gap-2">{children}</div>
    </div>
  )
}

function LabelsDemo() {
  return (
    <div className="flex flex-col gap-4">
      <Row label="Sin ícono">
        <Badge>Principal</Badge>
        <Badge variant="secondary">Secundario</Badge>
        <Badge variant="outline">Con borde</Badge>
        <Badge variant="destructive">Peligro</Badge>
      </Row>
      <Row label="Con ícono">
        <Badge><Check /> Pagado</Badge>
        <Badge variant="secondary"><Shirt /> Remera</Badge>
        <Badge variant="outline"><Wallet /> Servicios</Badge>
        <Badge variant="destructive"><X /> Vencido</Badge>
      </Row>
    </div>
  )
}

// Filas que se abren adentro de una hoja: de lado a lado (ej: las recaídas de no-coke)
function ExpandRowsSheetDemo() {
  return (
    <BottomSheet inline open onOpenChange={() => {}} title="Mis recaídas">
      <ExpandList flush>
        <ExpandRow defaultOpen title="03/11/2026" sub="14:00 hs · Dos semanas" right={<span className="font-medium text-brand-text">16 días</span>}>
          <ExpandRowItem label="Litros evitados" value="22 L" />
          <ExpandRowItem label="Cafeína evitada" value="1700 mg" />
        </ExpandRow>
        <ExpandRow title="17/10/2026" sub="21:00 hs · Dos semanas" right={<span className="font-medium text-brand-text">20 días</span>}>
          <ExpandRowItem label="Litros evitados" value="28 L" />
        </ExpandRow>
      </ExpandList>
    </BottomSheet>
  )
}

export function ListasSection() {
  return (
    <Section
      id="listas"
      title="Tarjetas y listas"
      description="Para mostrar cosas: fichas con foto, filas que se abren, labels, estrellas y datos con puntaje. Y la lista que se edita, para administrar una lista."
    >
      <div className="grid gap-4">
        <Demo uses={["cards/item-card"]} label="Fichas de prenda: grilla de 3, chiquita y fila. La elegida con borde del color de la app (blanco en oscuro)">
          <ItemCardsDemo />
        </Demo>
        <Demo uses={["cards/item-card"]} label="Ficha alta: grilla de 2, foto vertical y texto a la izquierda, con lugar para estrellas">
          <TallCardsDemo />
        </Demo>
        <Demo uses={["cards/link-card"]} label="Fichas de un link: grilla de 2 con la imagen apaisada y el botón para abrir, y fila de la lista. Ícono del sitio, editar y borrar, y la categoría con la estrellita del color de la app" className="block">
          <LinkCardsDemo />
        </Demo>
        <Demo uses={["ui/icon-list"]} label="Lista con ícono (de gesture): el ícono del color de la app, o un emoji, a la izquierda y el texto a la derecha. Con título, el texto va abajo en gris">
          <IconListDemo />
        </Demo>
        <Demo uses={["cards/stat-card"]} label="Fichas de un dato (de no-coke): el número con su unidad arriba a la izquierda; qué es y a cuánto equivale abajo a la izquierda, con el espacio libre en el medio. Con explicación, toda la ficha se toca y lleva la (i)">
          <StatCardsDemo />
        </Demo>
        <Demo uses={["ui/stars", "ui/chip"]} label="Estrellas (14px en las fichas, 16px en el detalle) y datos con puntaje: sólo muestran, no se tocan">
          <ScoresDemo />
        </Demo>
        <Demo uses={["controls/expand-row"]} label="Filas que se abren: lo de adentro aparece abajo, con una línea entre fila y fila y corrido a la derecha (el tercer nivel en gris). Los montos quedan en una misma columna">
          <ExpandRowsDemo />
        </Demo>
        <Demo uses={["controls/expand-row"]} label="Filas que se abren en una hoja (ExpandList flush): de lado a lado, con el texto alineado con el título, como la lista que se edita en una hoja">
          <ExpandRowsSheetDemo />
        </Demo>
        <Demo uses={["controls/editable-list"]} label="Lista que se edita: para administrar una lista (ej: categorías y subcategorías). Lápiz para cambiar el nombre ahí mismo, tacho para borrar (la app pide confirmación), las de adentro se abren y + Agregar al final" className="block">
          <EditableListDemo />
        </Demo>
        <Demo uses={["controls/editable-list"]} label="Lista que se edita en una hoja: los cambios se juntan y se guardan con Confirmar. Cancelar (o la cruz) pregunta si estás seguro cuando hay cambios sin guardar">
          <EditListSheetDemo />
        </Demo>
        <Demo uses={["ui/badge"]} label="Labels: sólo muestran un estado o una categoría, no se tocan" className="block">
          <LabelsDemo />
        </Demo>
      </div>
    </Section>
  )
}
