// Guía: todas las secciones en orden, agrupadas como en el índice de la izquierda.
// Para sumar una sección: crear su archivo en esta carpeta y agregarla acá.
import type * as React from "react"

import { AppsSection } from "./apps"
import { AudioSection } from "./audio"
import { BotonesSection } from "./botones"
import { CajasSection } from "./cajas"
import { ColoresSection } from "./colores"
import { ControlesSection } from "./controles"
import { ElegirSection } from "./elegir"
import { FlejeSection } from "./fleje"
import { FormulariosSection } from "./formularios"
import { ListasSection } from "./listas"
import { NavegacionSection } from "./navegacion"
import { NumerosSection } from "./numeros"
import { ReglasSection } from "./reglas"
import { TipografiaSection } from "./tipografia"
import { UsarSection } from "./usar"
import { VentanasSection } from "./ventanas"
import { VersionesSection } from "./versiones"

type Entry = { id: string; label: string; Component: () => React.ReactElement }

export const SECTIONS: [string, Entry[]][] = [
  [
    "Fundamentos",
    [
      { id: "reglas", label: "Reglas", Component: ReglasSection },
      { id: "colores", label: "Colores", Component: ColoresSection },
      { id: "tipografia", label: "Tipografía", Component: TipografiaSection },
      { id: "numeros", label: "Números en vivo", Component: NumerosSection },
      { id: "cajas", label: "Espacios y cajas", Component: CajasSection },
    ],
  ],
  [
    "Componentes",
    [
      { id: "fleje", label: "Fleje y títulos", Component: FlejeSection },
      { id: "botones", label: "Botones", Component: BotonesSection },
      { id: "formularios", label: "Formularios", Component: FormulariosSection },
      { id: "elegir", label: "Elegir opciones", Component: ElegirSection },
      { id: "controles", label: "Controles", Component: ControlesSection },
      { id: "listas", label: "Tarjetas y listas", Component: ListasSection },
      { id: "navegacion", label: "Navegación", Component: NavegacionSection },
      { id: "ventanas", label: "Ventanas y avisos", Component: VentanasSection },
    ],
  ],
  ["Música", [{ id: "audio", label: "Audio (LOOP)", Component: AudioSection }]],
  [
    "Uso",
    [
      { id: "apps", label: "Apps", Component: AppsSection },
      { id: "versiones", label: "Versiones", Component: VersionesSection },
      { id: "usar", label: "Cómo usarlo", Component: UsarSection },
    ],
  ],
]
