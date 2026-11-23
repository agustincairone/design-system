// Guía, sección "Ventanas y avisos".
import * as React from "react"
import { toast } from "sonner"
import { Bell } from "lucide-react"

import { BottomSheet, ConfirmSheet, StepHeader } from "@/components/ui/bottom-sheet"
import { Button } from "@/components/ui/button"
import { FloatAccordion } from "@/components/ui/float-accordion"
import { SplashPreview } from "@/components/ui/splash"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Demo, Section } from "@/guide/layout"
import { EmptyDemo, MoreSheetsDemo, SheetsDemo } from "@/guide/guide-demos"
import { SummaryFieldsDemo } from "@/guide/link-demos"

export function VentanasSection() {
  const [confirmOpen, setConfirmOpen] = React.useState(false)
  const [sheetOpen, setSheetOpen] = React.useState(false)
  return (
    <Section
      id="ventanas"
      title="Ventanas y avisos"
      description="Hojas desde abajo, confirmaciones, ayudas al pasar el mouse, avisos que aparecen y se van solos, y el estado vacío."
    >
      <div className="grid gap-4">
        <Demo uses={["ui/bottom-sheet"]} label="Hojas: todas salen desde abajo y flotan a 16px de los bordes (acá se muestran abiertas)" className="block">
          <SheetsDemo />
        </Demo>
        <Demo uses={["ui/bottom-sheet"]} label="Más hojas: con pestañas, con pasos, filtro, borrar mostrando lo que se borra y aviso de repetido" className="block">
          <MoreSheetsDemo />
        </Demo>
        <Demo uses={["ui/bottom-sheet"]} label="Resumen antes de guardar: la imagen y cada dato con su nombre arriba, en dos columnas" className="block">
          <SummaryFieldsDemo />
        </Demo>
        <Demo uses={["ui/bottom-sheet"]} label="Pasos adentro de una caja de la página: el mismo encabezado de las hojas con pasos" className="block">
          <div className="max-w-md rounded-box-l bg-card p-box-m">
            <StepHeader title="Zapatillas" step={{ current: 2, total: 6 }} onBack={() => {}} />
          </div>
        </Demo>
        <Demo uses={["ui/bottom-sheet", "ui/tooltip", "ui/sonner"]} label="Probalo: confirmación, hoja desde abajo, ayuda al pasar el mouse y aviso que se va solo (abajo al centro)">
          <Button variant="outline" onClick={() => setConfirmOpen(true)}>Confirmación</Button>
          <ConfirmSheet open={confirmOpen} onOpenChange={setConfirmOpen} title="Borrar pago" question="¿Borrar este pago?"
            detail="No se puede deshacer. El pago desaparece del historial." confirmLabel="Borrar"
            onConfirm={() => { setConfirmOpen(false); toast("Pago borrado") }} />

          <Button variant="outline" onClick={() => setSheetOpen(true)}>Hoja desde abajo</Button>
          <BottomSheet open={sheetOpen} onOpenChange={setSheetOpen} title="Filtros">
            <p className="text-sm text-muted-foreground">Todas las ventanas salen desde abajo.</p>
          </BottomSheet>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Notificaciones">
                <Bell />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Notificaciones</TooltipContent>
          </Tooltip>

          <Button
            variant="secondary"
            onClick={() =>
              toast.success("¡Guardado!", { description: "Tus cambios están a salvo." })
            }
          >
            Mostrar aviso
          </Button>
        </Demo>
        <Demo uses={["ui/empty-state"]} label="Estado vacío">
          <EmptyDemo />
        </Demo>
        <Demo uses={["ui/splash"]} label="Pantalla de carga al abrir la app: el fondo de la página y tres puntitos que laten suave, sin logo. Los puntitos aparecen a los 0,3 s; se va con un fundido cuando la app tiene qué mostrar. Probala en claro y en oscuro">
          <SplashPreview className="border border-input" />
        </Demo>
        <Demo uses={["ui/float-accordion"]} label="Acordeón flotante: tocalo y crece hacia arriba sobre la página">
          <div className="w-full max-w-md">
            <FloatAccordion title="Sugerencia para hoy" onInfo={() => setSheetOpen(true)}>
              <div className="divide-y divide-border text-sm">
                <p className="py-2.5">Nike Air Force</p>
                <p className="py-2.5">Levis 501</p>
                <p className="py-2.5">Uniqlo U</p>
              </div>
            </FloatAccordion>
          </div>
        </Demo>
      </div>
    </Section>
  )
}
