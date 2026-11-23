// Guía, sección "Botones".
import { ChevronLeft, ChevronRight, Copy, Headphones, Plus, Sparkles, VolumeX, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Demo, Section } from "@/guide/layout"
import { AiButtonDemo, FloatingButtonDemo } from "@/guide/link-demos"

export function BotonesSection() {
  return (
    <Section
      id="botones"
      title="Botones"
      description="El botón principal usa el color de la app; idealmente uno solo por pantalla. El resto, en grises. Los botones de solo texto van subrayados (en rojo para cancelar)."
    >
      <div className="grid gap-4">
        <Demo uses={["ui/button"]} label="Variantes">
          <Button>Principal</Button>
          <Button variant="secondary">Secundario</Button>
          <Button variant="card">Blanco</Button>
          <Button variant="outline">Con borde</Button>
          <Button variant="ghost">Fantasma</Button>
          <Button variant="destructive">Borrar</Button>
          <Button variant="destructive-outline">Quitar</Button>
          <Button variant="destructive-soft">Cancelar</Button>
          <Button variant="dashed"><Plus /> Agregar</Button>
          <Button variant="link">Link</Button>
          <Button variant="destructive-link">Cancelar</Button>
          <Button disabled>Deshabilitado</Button>
        </Demo>
        <Demo uses={["ui/button"]} label="Tamaños e íconos">
          <Button size="sm">Chico</Button>
          <Button>Normal</Button>
          <Button>
            <Plus /> Agregar
          </Button>
          <Button variant="outline" size="icon" aria-label="Copiar">
            <Copy />
          </Button>
          <Button disabled>Deshabilitado</Button>
        </Demo>
        <Demo uses={["ui/button"]} label="Deshabilitados: todos los botones llenos quedan iguales (fondo gris y texto gris); los de borde y los de texto se aclaran">
          <Button disabled>Principal</Button>
          <Button variant="secondary" disabled>Secundario</Button>
          <Button variant="card" disabled>Blanco</Button>
          <Button variant="destructive" disabled>Borrar</Button>
          <Button variant="destructive-soft" disabled>Cancelar</Button>
          <Button variant="outline" disabled>Con borde</Button>
          <Button variant="link" disabled>Link</Button>
        </Demo>
        <Demo uses={["ui/button"]} label="Botoncitos redondos (icon-sm): silenciar, solo, al azar, quitar">
          <Button variant="outline" size="icon-sm" aria-label="Silenciar"><VolumeX /></Button>
          <Button size="icon-sm" aria-label="Silenciado"><VolumeX /></Button>
          <Button variant="outline" size="icon-sm" aria-label="Solo"><Headphones /></Button>
          <Button size="icon-sm" aria-label="Al azar"><Sparkles /></Button>
          <Button variant="destructive-outline" size="icon-sm" aria-label="Quitar"><X /></Button>
        </Demo>
        <Demo uses={["ui/button"]} label="Flechas para cambiar de mes (icon-sm blanco), distintas al volver (con borde)">
          <Button variant="outline" size="icon-sm" aria-label="Volver"><ChevronLeft /></Button>
          <Button variant="card" size="icon-sm" aria-label="Mes anterior"><ChevronLeft /></Button>
          <Button variant="card" size="icon-sm" aria-label="Mes siguiente"><ChevronRight /></Button>
        </Demo>
        <Demo uses={["ui/floating-button"]} label="Botón flotante para agregar: abajo al centro, con ícono y texto, sin sombra (con aboveNav, encima de la barra de abajo)">
          <FloatingButtonDemo />
        </Demo>
        <Demo uses={["ui/ai-button"]} label="Generar con IA: botón chico gris con el destello del color de la app; mientras trabaja, apagado">
          <AiButtonDemo />
        </Demo>
      </div>
    </Section>
  )
}
