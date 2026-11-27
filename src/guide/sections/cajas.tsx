// Guía, sección "Espacios y cajas".
import { Section } from "@/guide/layout"

// Escala de espacios (para Espacios y cajas)
const SPACE_SCALE: [number, string, string][] = [
  [4, "box-2xs", "Label arriba del campo"],
  [8, "box-xs", "Entre caja y caja (gap-box-gap)"],
  [12, "box-s", "Relleno de caja S"],
  [16, "box-m", "Relleno de caja M"],
  [20, "box-l", "Relleno de caja L"],
  [24, "box-xl", ""],
  [40, "box-2xl", "Relleno del estado vacío"],
  [40, "section", "Entre bloques grandes"],
  [112, "screen-end", "Libre al final de cada pantalla"],
  [168, "screen-end-float", "Libre al final si hay botón flotante encima de la barra"],
]

export function CajasSection() {
  return (
    <Section
      id="cajas"
      title="Espacios y cajas"
      description="Todos los espacios salen de esta escala. Las cajas nunca llevan borde: se separan sólo por el color de fondo. El relleno de cada caja es L 20, M 16 o S 12, según lo que le quede mejor."
    >
      <div className="mb-4 divide-y rounded-3xl bg-card">
        {SPACE_SCALE.map(([px, token, use]) => (
          <div key={token} className="grid items-center gap-3 p-4 sm:grid-cols-[180px_1fr]">
            <div>
              <div className="text-sm font-medium">{px}px</div>
              <div className="font-mono text-xs text-muted-foreground">{token}</div>
            </div>
            <div className="flex min-w-0 items-center gap-4">
              <span className="h-3 shrink-0 rounded-bar bg-brand" style={{ width: px }} />
              <span className="truncate text-xs text-muted-foreground">{use}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="rounded-box-l bg-card p-box-l">
        <p className="eyebrow mb-3">L · esquinas 16 · relleno 20</p>
        <div className="grid gap-box-gap sm:grid-cols-2">
          <div className="rounded-box-m bg-inset p-box-m">
            <p className="eyebrow mb-3">M · esquinas 16 · relleno 16</p>
            <div className="flex gap-3">
              <div className="rounded-box-s bg-card p-box-s">
                <p className="eyebrow">S · 12 · 12</p>
              </div>
            </div>
          </div>
          <div className="rounded-box-m bg-inset p-box-m">
            <p className="eyebrow mb-1">Clases</p>
            <p className="font-mono text-sm">rounded-box-s · m · l</p>
            <p className="font-mono text-sm">p-box-s · m · l</p>
            <p className="font-mono text-sm">gap-box-gap (8px entre cajas)</p>
            <p className="font-mono text-sm">gap-section (40px entre bloques)</p>
            <p className="mt-2 text-sm text-muted-foreground">Un AudioPanel con variant="inset" ya es una caja M.</p>
          </div>
        </div>
      </div>
    </Section>
  )
}
