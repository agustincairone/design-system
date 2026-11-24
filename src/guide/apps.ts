// Guía: las apps que usan el sistema y el nombre de cada pieza en castellano.
// Qué versión tiene cada app y qué piezas usa sale de usage.json (lo escribe `npm run usage`).
import type { BrandId } from "@/brands"
import usage from "./usage.json"

export type AppId = keyof typeof usage.apps

export type AppInfo = {
  id: AppId
  name: string
  brand: BrandId
  url?: string
  /** lo que falta en esa app (en simple) */
  pending: string[]
}

export const APPS: AppInfo[] = [
  {
    id: "pay",
    name: "pay",
    brand: "pay-tracker",
    url: "https://pay-tracker-three.vercel.app",
    pending: ["Probar en el iPhone, con la app instalada, si la barra de la hora toma el color de la página."],
  },
  {
    id: "outfit",
    name: "outfit",
    brand: "outfit-tracker",
    url: "https://outfit-tracker-omega.vercel.app",
    pending: ["Probar en el iPhone, con la app instalada, si la barra de la hora toma el color de la página."],
  },
  {
    id: "wine",
    name: "wine",
    brand: "wine-tracker",
    url: "https://wine-tracker-sandy.vercel.app",
    pending: ["Probar en el iPhone, con la app instalada, si la barra de la hora toma el color de la página."],
  },
  {
    id: "loop",
    name: "LOOP",
    brand: "loop",
    url: "https://loop-seven-pi.vercel.app",
    pending: ["Probar en el iPhone, con la app instalada, si la barra de la hora toma el color de la página."],
  },
  {
    id: "bookmarks",
    name: "bookmarks",
    brand: "bookmarks",
    url: "https://bookmarks-pink.vercel.app",
    pending: ["Probar en el iPhone, con la app instalada, si la barra de la hora toma el color de la página."],
  },
]

/** apps que todavía no usan el sistema */
export const OTHER_APPS = ["no-coke", "gesture"]

export const PIECES: Record<string, string> = {
  "audio/audio-panel": "Panel de audio",
  "audio/bar-fader": "Barras",
  "audio/dial": "Dial",
  "audio/level-meter": "Vúmetro",
  "audio/param-buttons": "Botones ⏻ y 🎧",
  "audio/param-slider": "Slider con valor",
  "audio/rotary-knob": "Perilla",
  "audio/round-toggle": "Botón redondo",
  "audio/selector-knob": "Selector",
  "audio/speaker-grille": "Rejilla de parlante",
  "audio/tuner": "Sintonizador",
  "audio/xy-pad": "Pad XY",
  "cards/item-card": "Fichas con foto",
  "cards/link-card": "Fichas de link",
  "controls/bottom-nav": "Barra de abajo",
  "controls/color-swatches": "Colores",
  "controls/date-strip": "Días",
  "controls/editable-list": "Lista que se edita",
  "controls/expand-row": "Filas que se abren",
  "controls/field-column": "Columna vertical",
  "controls/field-slider": "Campo-slider",
  "controls/icon-tile": "Fichas con ícono",
  "controls/number-slider": "Número + slider",
  "controls/scale-slider": "Escala corta",
  "controls/segmented": "Píldora",
  "controls/split-slider": "Reparto entre dos",
  "controls/stepper": "Contador (− 1 +)",
  "controls/tab-bar": "Pestañas",
  "controls/tile-group": "Fichas para elegir",
  "theme-provider": "Claro y oscuro",
  "theme-toggle": "Botón de claro y oscuro",
  "ui/ai-button": "Botón de IA",
  "ui/app-hero": "Fleje y títulos",
  "ui/badge": "Labels",
  "ui/bottom-sheet": "Hojas",
  "ui/button": "Botón",
  "ui/checkbox": "Casilla",
  "ui/chip": "Chips",
  "ui/dropdown-menu": "Menú desplegable",
  "ui/empty-state": "Estado vacío",
  "ui/field-label": "Nombre del campo",
  "ui/float-accordion": "Acordeón flotante",
  "ui/floating-button": "Botón flotante",
  "ui/input": "Campo de texto",
  "ui/label": "Texto de la casilla",
  "ui/line-input": "Campo de línea",
  "ui/roll-number": "Número que gira",
  "ui/scroll-fade": "Degradé al desplazar",
  "ui/search-input": "Buscador",
  "ui/select": "Desplegable",
  "ui/slider": "Slider",
  "ui/sonner": "Aviso",
  "ui/splash": "Pantalla de carga",
  "ui/stars": "Estrellas",
  "ui/suggest-input": "Campo con sugerencias",
  "ui/textarea": "Notas (varias líneas)",
  "ui/toggle": "Botón de prender y apagar",
  "ui/tooltip": "Ayuda al pasar el mouse",
}

export const pieceName = (p: string) => PIECES[p] ?? p
export const appVersion = (id: AppId) => usage.apps[id].version
export const appPieces = (id: AppId) => usage.apps[id].pieces
/** las apps que usan una pieza, en el orden de APPS */
export const appsUsing = (piece: string) => APPS.filter((a) => usage.apps[a.id].pieces.includes(piece))
/** las piezas que usan esta por dentro (ej: la hoja usa el degradé) */
export const usedInside = (piece: string): string[] => (usage.inside as Record<string, string[]>)[piece] ?? []
export const unusedPieces = () => usage.pieces.filter((p) => appsUsing(p).length === 0 && usedInside(p).length === 0)
