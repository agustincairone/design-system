// Guía, sección "Tipografía".
import { Section } from "@/guide/layout"

// Escala de letra (para la tabla de Tipografía)
const TYPE_SCALE: [string, string, string][] = [
  ["11", "text-2xs", "Piezas chicas: la nota de un paso, las fichas chicas, la tabla del historial"],
  ["13", "text-xs", "Texto chico, etiquetas"],
  ["15", "text-sm", "Texto base"],
  ["18", "text-lg", "Títulos de las hojas"],
  ["20", "text-xl", "Título de caja"],
  ["26", "text-2xl", "Montos importantes, número del fleje"],
  ["30", "text-3xl", "Emoji de las filas del inicio"],
  ["36", "text-4xl", "Números de la placa de LOOP"],
  ["48", "text-5xl", "Tempo y reloj de LOOP"],
  ["144", "text-hero", "Número principal de una pantalla: los días de racha de no-coke"],
]

export function TipografiaSection() {
  return (
    <Section
      id="tipografia"
      title="Tipografía"
      description="Geist para todo el texto, Geist Mono para etiquetas. Los tamaños salen sólo de esta escala; si algo tiene que ser más grande, se sube un paso entero."
    >
      <div className="mb-4 divide-y rounded-3xl bg-card">
        {TYPE_SCALE.map(([px, cls, use]) => (
          <div key={cls} className="grid items-center gap-3 p-4 sm:grid-cols-[180px_1fr]">
            <div>
              <div className="text-sm font-medium">{px}px</div>
              <div className="font-mono text-xs text-muted-foreground">{cls}</div>
            </div>
            <div className="flex min-w-0 items-baseline gap-4">
              <span className={`${cls} shrink-0 leading-none font-medium`}>Aa</span>
              <span className="truncate text-xs text-muted-foreground">{use}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="divide-y rounded-3xl bg-card">
        {[
          ["Título de página", "Geist semibold, 40px (clase title-page)", <div className="title-page">Mis pagos</div>],
          ["Título de caja", "Geist semibold, 20px (clase title-box)", <div className="title-box">Agregar un sonido</div>],
          ["Número grande quieto", "Geist light, muy grande", <div className="live-number text-6xl font-light tracking-tighter">$ 125.430<span className="text-muted-foreground">,50</span></div>],
          ["Etiqueta", "Geist Mono, mayúsculas, 13px (clase eyebrow). La usa LOOP.", <span className="eyebrow">Total del mes</span>],
          ["Monto importante", "Geist medium, 26px (text-2xl). Deuda, total del mes.", <div className="text-2xl font-medium text-brand-text">$758.070</div>],
          ["Número de la placa", "36px (text-4xl). Los números quietos de la placa de LOOP: canales y pasos.", <span className="live-number font-readout text-4xl leading-none font-bold">16</span>],
          ["Número grande de pantalla", "48px (text-5xl). El tempo y el reloj de LOOP.", <span className="live-number font-readout text-5xl font-bold">110</span>],
          ["Número principal de pantalla", "Geist Pixel Circle, 144px (text-hero). Uno solo por pantalla: los días de racha de no-coke.", <span className="live-number font-clock text-hero">23</span>],
          ["Nota mini", "11px (text-2xs). Sólo para piezas chicas: la nota de un paso de LOOP, las fichas chicas y la tabla del historial de outfit.", <span className="font-mono text-2xs font-semibold">C#2</span>],
          ["Emoji de fila", "30px (text-3xl). El emoji al principio de cada fila del inicio (los grupos de pay).", <span className="text-3xl leading-none">🏠</span>],
          ["Emoji grande", "48px (text-emoji). Un solo tamaño, para pantallas especiales: login, error, unirse a un grupo.", <span className="text-emoji">🔒</span>],
          ["Valor de un control", "Geist Mono semibold, 15px", <span className="live-number font-mono text-sm font-semibold">450ms · +3dB · 60%</span>],
          ["Texto", "Geist regular", <p className="max-w-prose">Texto normal para párrafos y descripciones, cómodo en el celular.</p>],
          ["Unidad / ayuda", "Chico y gris", <span className="text-sm text-muted-foreground">120 BPM · actualizado hace 2 min</span>],
          ["Link", "Color de la app", <a href="#tipografia" className="text-sm font-medium text-brand-text underline-offset-4 hover:underline">Ver detalle →</a>],
        ].map(([role, how, sample]) => (
          <div key={role as string} className="grid gap-3 p-5 sm:grid-cols-[180px_1fr] sm:items-center">
            <div>
              <div className="text-sm font-medium">{role}</div>
              <div className="text-xs text-muted-foreground">{how}</div>
            </div>
            <div className="min-w-0">{sample}</div>
          </div>
        ))}
      </div>
    </Section>
  )
}
