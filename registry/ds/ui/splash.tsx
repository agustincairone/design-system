import * as React from "react"

import { cn } from "@/lib/utils"

// Pantalla de carga, la misma en todas las apps: el ícono de la app en un círculo blanco sobre el gris
// claro de la página. Copia la que arma el celular al abrir la app instalada (con el ícono y el
// background_color del manifest), así se ve una sola pantalla de carga y no dos.
//
// Va escrita en el index.html de la app (SPLASH_HTML), así aparece desde el primer instante, antes de que
// cargue nada. La app la saca cuando ya tiene qué mostrar, con useHideSplash(listo) en el componente de
// arriba de todo, en lugar de mostrar un "Cargando...". Se va con un fundido corto.
// Es siempre clara, como la del celular (el manifest no tiene color para oscuro).

/** el fondo: el mismo que el background_color del manifest (el gris claro de la página) */
export const SPLASH_COLOR = "#e7e5e4"

// Como en Android: el ícono de 240px recortado en un círculo de 160px
const SCREEN = `position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;background:${SPLASH_COLOR};transition:opacity .2s`
const CIRCLE = "width:160px;height:160px;border-radius:50%;overflow:hidden;display:flex;align-items:center;justify-content:center"
const ICON = "width:240px;height:240px;flex:none"

/** lo que va en el index.html de la app, adentro de <body> y antes de <div id="root"> */
export const SPLASH_HTML = `<div id="splash" style="${SCREEN}"><div style="${CIRCLE}"><img src="/icon-512.png" alt="" style="${ICON}" /></div></div>`

/** saca la pantalla de carga con un fundido corto */
export function hideSplash() {
  const el = document.getElementById("splash")
  if (!el || el.dataset.hiding) return
  el.dataset.hiding = "1"
  el.style.opacity = "0"
  window.setTimeout(() => el.remove(), 250)
}

/** saca la pantalla de carga cuando `ready` pasa a true (ej: ya se sabe si hay sesión y están los datos) */
export function useHideSplash(ready: boolean) {
  React.useEffect(() => {
    if (ready) hideSplash()
  }, [ready])
}

// "position:fixed;inset:0" → { position: "fixed", inset: "0" }
const toStyle = (css: string) =>
  Object.fromEntries(
    css.split(";").map((rule) => {
      const [k, v] = rule.split(":")
      return [k.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase()), v]
    })
  ) as React.CSSProperties

/** Sólo para la guía: cómo se ve en un celular, dibujada en una caja a la mitad del tamaño real. */
export function SplashPreview({ icon, className }: { icon: string; className?: string }) {
  return (
    <div className={cn("relative h-[422px] w-[195px] shrink-0 overflow-hidden rounded-box-l", className)}>
      <div className="absolute top-0 left-0 h-[844px] w-[390px] origin-top-left scale-50">
        <div style={{ ...toStyle(SCREEN), position: "absolute" }}>
          <div style={toStyle(CIRCLE)}>
            <img src={icon} alt="" style={toStyle(ICON)} />
          </div>
        </div>
      </div>
    </div>
  )
}
