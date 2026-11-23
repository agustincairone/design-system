// Guía, sección "Navegación".
import { ChevronDown, CreditCard, LogOut, Settings } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Demo, Section } from "@/guide/layout"
import { BottomNavDemo } from "@/guide/guide-demos"

export function NavegacionSection() {
  return (
    <Section
      id="navegacion"
      title="Navegación"
      description="Para moverse por la app: la barra de abajo y el menú desplegable (el ⋮ de cada fila)."
    >
      <div className="grid gap-4">
        <Demo uses={["controls/bottom-nav"]} label="Barra de abajo: blanca cuando no hay nada detrás, de vidrio mientras pasa contenido por detrás. Íconos de 24px, la sección actual del color de la app con el puntito">
          <BottomNavDemo />
        </Demo>
        <Demo uses={["ui/dropdown-menu"]} label="Menú desplegable">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Opciones <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings /> Ajustes
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard /> Pagos
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">
                <LogOut /> Cerrar sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Demo>
      </div>
    </Section>
  )
}
