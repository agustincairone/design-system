// Guía, sección "Cómo usarlo".
import { SPLASH_HTML } from "@/components/ui/splash"
import { Section } from "@/guide/layout"

export function UsarSection() {
  return (
    <Section
      id="usar"
      title="Cómo usarlo en una app"
      description="Esto lo hace Claude por vos, pero queda anotado."
    >
      <div className="space-y-3 rounded-lg border border-input bg-muted/40 p-5 font-mono text-sm">
        <div className="text-muted-foreground"># 1. en package.json de la app, con la última versión publicada (vX.Y.Z)</div>
        <div>"@agustincairone/design-system": "github:agustincairone/design-system#vX.Y.Z"</div>
        <div className="pt-2 text-muted-foreground"># 2. en src/index.css: el tema y el color de la app</div>
        <div>@import "@agustincairone/design-system/theme.css";</div>
        <div>@import "@agustincairone/design-system/brands/pay-tracker.css";</div>
        <div className="pt-2 text-muted-foreground"># 3. cada pieza se importa así</div>
        <div>{'import { Button } from "@agustincairone/design-system/components/ui/button"'}</div>
        <div className="pt-2 text-muted-foreground"># 4. en index.html: que el iPhone no haga zoom al tocar un campo y que la app instalada llegue hasta el borde (la rayita de abajo toma el color de la página)</div>
        <div>{'<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, viewport-fit=cover" />'}</div>
        <div className="pt-2 text-muted-foreground"># 5. la barra de abajo va pegada al borde con el aire del sistema (la barra de la hora toma sola el color de la página)</div>
        <div>{'<div className="fixed inset-x-0 bottom-0 z-50 px-box-m pb-screen-bottom"><BottomNav … /></div>'}</div>
        <div className="pt-2 text-muted-foreground"># 6. en el manifest de la app instalable: sin theme_color (con un color fijo, Android pinta así la barra de abajo en claro y en oscuro)</div>
        <div>{'{ "name": "…", "background_color": "#e7e5e4", "icons": […] }'}</div>
        <div className="pt-2 text-muted-foreground"># 7. después de pasar una app a otra versión, en la carpeta del sistema: así la guía sabe qué usa cada app (páginas Apps y Versiones, y el "Lo usan" de cada pieza)</div>
        <div>npm run usage</div>
        <div className="pt-2 text-muted-foreground"># 8. pantalla de carga: en index.html, adentro de body y antes de div id="root" (necesita public/icon-512.png)</div>
        <div className="break-all">{SPLASH_HTML}</div>
        <div className="pt-2 text-muted-foreground"># y en el componente de arriba de todo, en vez de mostrar "Cargando...": se va cuando ya se sabe si hay sesión</div>
        <div>{'useHideSplash(user !== undefined)  // y mientras tanto, return null'}</div>
      </div>
    </Section>
  )
}
