// Guía, sección "Colores".
import { Section } from "@/guide/layout"
import { PALETTE, SHADES } from "@/palette"

const TOKENS: { name: string; cls: string; note: string }[] = [
  { name: "background", cls: "bg-background", note: "Fondo de la página" },
  { name: "card", cls: "bg-card", note: "Tarjetas y paneles" },
  { name: "muted", cls: "bg-muted", note: "Zonas secundarias" },
  { name: "accent", cls: "bg-accent", note: "Hover y seleccionados" },
  { name: "inset", cls: "bg-inset", note: "Caja adentro de otra caja" },
  { name: "tile", cls: "bg-tile", note: "Fichas con foto" },
  { name: "raised", cls: "bg-raised", note: "Encima de inset/tile (en oscuro, un paso más claro)" },
  { name: "raised-2", cls: "bg-raised-2", note: "Encima de raised (ej: aviso de archivada sobre la foto)" },
  { name: "border", cls: "bg-border", note: "Divisores y bordes adentro de las cajas" },
  { name: "input", cls: "bg-input", note: "Borde de lo que va sobre la página: campos, botones con borde, chips" },
  { name: "muted-foreground", cls: "bg-muted-foreground", note: "Texto secundario" },
  { name: "foreground", cls: "bg-foreground", note: "Texto principal" },
  { name: "brand", cls: "bg-brand", note: "Acento de la app" },
  { name: "destructive", cls: "bg-destructive", note: "Borrar (siempre rojo)" },
  { name: "warning", cls: "bg-warning", note: "Atención (ej: medidor de LOOP)" },
  { name: "success", cls: "bg-success", note: "Todo bien (ej: medidor de LOOP)" },
  { name: "overlay", cls: "bg-overlay", note: "Fondo detrás de las hojas (negro transparente)" },
]

export function ColoresSection() {
  return (
    <Section
      id="colores"
      title="Colores"
      description="La base es gris cálido (stone), en claro y en oscuro. Cada app usa UN solo color de la paleta como acento. El rojo queda reservado para borrar y errores, en todas las apps."
    >
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {TOKENS.map((t) => (
          <div key={t.name} className="overflow-hidden rounded-2xl border border-input bg-card">
            <div className={`h-16 ${t.cls}`} />
            <div className="p-3">
              <div className="font-mono text-xs">{t.name}</div>
              <div className="mt-0.5 text-xs text-muted-foreground">{t.note}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 mb-3 flex items-baseline justify-between gap-4">
        <h3 className="font-medium">Paleta completa</h3>
        <span className="eyebrow">50 → 950</span>
      </div>
      <div className="overflow-x-auto rounded-2xl border border-input bg-card p-4">
        <div className="grid min-w-[560px] gap-1.5">
          {Object.entries(PALETTE).map(([name, shades]) => {
            const tag =
              name === "red" ? "borrar" : name === "orange" ? "LOOP · 600" : name === "stone" ? "base" : ""
            return (
              <div key={name} className="grid grid-cols-[88px_repeat(11,1fr)] items-center gap-1.5">
                <div className="font-mono text-xs">
                  {name}
                  {tag && <div className="text-2xs text-brand-text">{tag}</div>}
                </div>
                {SHADES.map((sh) => (
                  <div
                    key={sh}
                    title={`${name}-${sh}`}
                    className={`h-7 rounded-md ${
                      (name === "orange" && sh === "600") || (name === "red" && sh === "600")
                        ? "ring-2 ring-foreground ring-offset-2 ring-offset-card"
                        : ""
                    }`}
                    style={{ background: shades[sh] }}
                  />
                ))}
              </div>
            )
          })}
          <div className="grid grid-cols-[88px_repeat(11,1fr)] gap-1.5 pt-1">
            <div />
            {SHADES.map((sh) => (
              <div key={sh} className="text-center font-mono text-2xs text-muted-foreground">
                {sh}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
