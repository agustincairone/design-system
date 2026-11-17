import * as React from "react"

import { cn } from "@/lib/utils"

// Fleje: el título de cada app, igual en todas.
//   nombre (title-page) + nombre en japonés (color de la app) + texto gris + números de puntitos.
// En pantalla ancha: nombre arriba y texto gris abajo a la izquierda, números a la derecha.
// En el celular: nombre y japonés a la izquierda; texto gris y números a la derecha.
// La letra de puntitos (font-readout) se usa sólo para estos números y el dato de cada sección.

type Eyebrow = "caps" | "plain"
const EYEBROW: Record<Eyebrow, string> = { caps: "eyebrow", plain: "eyebrow-plain" }

export type Stat = { value: number | string; label: string; digits?: number }

// Número de puntitos. Con `digits`, completa con ceros apagados (07, 012).
export function Readout({ value, digits, className }: { value: number | string; digits?: number; className?: string }) {
  const text = String(value)
  const pad = digits && typeof value === "number" ? "0".repeat(Math.max(0, digits - text.length)) : ""
  return (
    <span data-slot="readout" className={cn("live-number font-readout leading-none font-bold", className)}>
      {pad && <span className="opacity-20">{pad}</span>}
      {text}
    </span>
  )
}

export function AppHero({
  name,
  jp,
  description,
  stats = [],
  eyebrow = "caps",
  aside,
  className,
}: {
  name: string
  jp: string
  description: string
  stats?: Stat[]
  eyebrow?: Eyebrow
  aside?: React.ReactNode
  className?: string
}) {
  return (
    <header data-slot="app-hero" className={cn("flex items-stretch gap-6", className)}>
      <div className="grid min-w-0 flex-1 grid-cols-[minmax(0,1fr)_auto] gap-x-6 gap-y-3 sm:gap-y-8">
        <div className="row-span-2 self-start sm:row-span-1">
          <h1 className="title-page">{name}</h1>
          <p lang="ja" className="mt-2 text-lg leading-none text-brand">
            {jp}
          </p>
        </div>
        <p className={cn(EYEBROW[eyebrow], "col-start-2 row-start-1 max-w-40 justify-self-end text-right sm:col-start-1 sm:row-start-2 sm:max-w-none sm:justify-self-start sm:self-end sm:text-left")}>
          {description}
        </p>
        {stats.length > 0 && (
          <div className="col-start-2 row-start-2 flex justify-end gap-5 self-end sm:row-span-2 sm:row-start-1">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col items-end gap-1">
                <Readout value={s.value} digits={s.digits} className="text-4xl" />
                <span className={EYEBROW[eyebrow]}>{s.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      {aside}
    </header>
  )
}

// Título de sección con su dato a la derecha (texto gris + número de puntitos).
export function SectionHeader({
  title,
  value,
  label,
  digits,
  eyebrow = "caps",
  className,
}: {
  title: React.ReactNode
  value?: number | string | null
  label?: string
  digits?: number
  eyebrow?: Eyebrow
  className?: string
}) {
  return (
    <div data-slot="section-header" className={cn("flex items-baseline justify-between gap-4", className)}>
      <h2 className="title-box min-w-0 truncate">{title}</h2>
      {value != null && value !== "" && (
        <div className="flex shrink-0 items-baseline gap-2">
          {label && <span className={EYEBROW[eyebrow]}>{label}</span>}
          <Readout value={value} digits={digits} className="text-2xl" />
        </div>
      )}
    </div>
  )
}
