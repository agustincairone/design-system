// La guía del sistema: barra de arriba, índice, portada (elegir el color de una app) y las secciones.
// Cada sección vive en su archivo, en src/guide/sections/.
import * as React from "react"
import { Bookmark, CupSoda, Hand, Music, Settings, Shirt, Wallet, Wine } from "lucide-react"

import { useTheme } from "@/components/theme-provider"
import { ThemeToggle } from "@/components/theme-toggle"
import { BRANDS, type BrandId, applyBrand } from "@/brands"
import { SECTIONS } from "@/guide/sections"

const ICONS: Record<BrandId, typeof Music> = {
  neutral: Settings,
  loop: Music,
  "pay-tracker": Wallet,
  "outfit-tracker": Shirt,
  "wine-tracker": Wine,
  bookmarks: Bookmark,
  "no-coke-tracker": CupSoda,
  gesture: Hand,
}

export function App() {
  const { resolvedTheme } = useTheme()
  const [brand, setBrand] = React.useState<BrandId>("neutral")

  React.useEffect(() => applyBrand(brand, resolvedTheme), [brand, resolvedTheme])

  return (
    <div className="min-h-svh">
      {/* Barra superior */}
      <header className="sticky top-0 z-20 border-b border-input bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center gap-4 px-4">
          <div className="flex items-center gap-2">
            <div className="size-5 rounded-full bg-brand" />
            <span className="font-semibold tracking-tight">Sistema de diseño</span>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-[180px_1fr]">
        {/* Índice */}
        <nav className="sticky top-14 hidden h-fit py-12 md:block">
          <div className="flex flex-col gap-6 text-sm">
            {SECTIONS.map(([group, items]) => (
              <div key={group}>
                <p className="eyebrow mb-2 px-2">{group}</p>
                <ul className="space-y-1">
                  {items.map(({ id, label }) => (
                    <li key={id}>
                      <a
                        href={`#${id}`}
                        className="block rounded-md px-2 py-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </nav>

        <main className="min-w-0 pb-24">
          {/* Portada */}
          <div className="py-12">
            <h1 className="text-4xl font-semibold tracking-tighter sm:text-5xl">
              Una sola forma de diseñar,
              <br />
              <span className="text-muted-foreground">para todas tus apps.</span>
            </h1>
            <p className="mt-4 max-w-prose text-muted-foreground">
              Misma tipografía, mismos grises, mismos componentes. Cada app
              tiene su propio color de acento. Elegí uno para ver cómo queda:
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {(Object.keys(BRANDS) as BrandId[]).map((id) => {
                const b = BRANDS[id]
                const Icon = ICONS[id]
                const active = brand === id
                return (
                  <button
                    key={id}
                    onClick={() => setBrand(id)}
                    className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition-colors ${
                      active
                        ? "border-foreground bg-accent text-foreground"
                        : "border-input text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span
                      className="size-3 rounded-full border"
                      style={{ background: b.light.brand }}
                    />
                    <Icon className="size-3.5" />
                    {b.name}
                  </button>
                )
              })}
            </div>
          </div>

          {SECTIONS.flatMap(([, items]) => items).map(({ id, Component }) => (
            <Component key={id} />
          ))}
        </main>
      </div>
    </div>
  )
}

export default App
