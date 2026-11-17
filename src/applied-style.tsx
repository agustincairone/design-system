// Guía: "Estilo aplicado" = lo que ya se eligió, mostrado como quedaría en outfit-tracker.
import * as React from "react"
import { ImageIcon } from "lucide-react"

import { Segmented } from "@/components/controls/segmented"
import { TabBar } from "@/components/controls/tab-bar"
import { BRANDS } from "@/brands"
import { useTheme } from "@/components/theme-provider"

const CATS = ["Zapatillas", "Abajo", "Remera", "Camisa", "Arriba", "Campera"]

// Pinta lo de adentro con el color de outfit-tracker, para ver cómo queda en esa app
function OutfitColor({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme()
  const v = BRANDS["outfit-tracker"][resolvedTheme === "dark" ? "dark" : "light"]
  const style = { "--primary": v.brand, "--primary-foreground": v.fg, "--brand": v.brand, "--brand-foreground": v.fg, "--brand-text": v.text, "--brand-strong": v.strong, "--ring": v.brand } as React.CSSProperties
  return <div style={style}>{children}</div>
}

function Rule({ title, rule, children }: { title: string; rule: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <div>
        <div className="text-sm font-medium">{title}</div>
        <div className="text-xs text-muted-foreground">{rule}</div>
      </div>
      {children}
    </div>
  )
}

export function AppliedStyle() {
  const [cat, setCat] = React.useState("Zapatillas")
  const [mode, setMode] = React.useState("year")
  const [range, setRange] = React.useState("mes")

  return (
    <OutfitColor>
      <div className="grid gap-10">
        <Rule title="Tabs" rule="Hasta 3 opciones → píldora con opciones (normal). Más de 3 → tab de ancho completo (diseño outfit), pegada arriba de la caja.">
          <div className="grid items-start gap-3 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <span className="eyebrow">2 opciones · píldora</span>
              <div className="rounded-box-l bg-card p-box-l">
                <Segmented label="Período" value={mode} onChange={setMode} options={[{ value: "year", label: "Año" }, { value: "month", label: "Mes" }]} />
              </div>
              <span className="eyebrow pt-2">3 opciones · píldora</span>
              <div className="rounded-box-l bg-card p-box-l">
                <Segmented label="Rango" value={range} onChange={setRange} options={[{ value: "mes", label: "Este mes" }, { value: "anio", label: "Este año" }, { value: "todo", label: "Todo" }]} />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <span className="eyebrow">6 opciones · tab de ancho completo</span>
              <div className="overflow-hidden rounded-box-l bg-card">
                <TabBar label="Categoría" value={cat} onChange={setCat} options={CATS.map((c) => ({ value: c, label: c }))} />
                <div className="grid grid-cols-3 gap-box-gap p-box-l">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex aspect-square items-center justify-center rounded-box-s bg-inset">
                      <ImageIcon className="size-5 text-muted-foreground" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Rule>
      </div>
    </OutfitColor>
  )
}
