// Guía: las piezas que vienen de no-coke (número grande, barra de progreso, fichas de datos, carrusel y botón para deslizar).
import * as React from "react"
import { Trophy } from "lucide-react"

import { Carousel } from "@/components/controls/carousel"
import { SwipeButton } from "@/components/controls/swipe-button"
import { StatCard } from "@/components/cards/stat-card"
import { Button } from "@/components/ui/button"
import { HeroNumber } from "@/components/ui/hero-number"
import { Progress } from "@/components/ui/progress"

export function HeroNumberDemo() {
  const [spin, setSpin] = React.useState(0)
  return (
    <div className="flex w-full flex-wrap items-center gap-box-m">
      <div className="h-96 w-full max-w-xs rounded-box-l bg-card p-box-l">
        <HeroNumber key={spin} value={22} label="días sin tomar" note="Desde el 27 de septiembre" action={<Button size="sm" variant="secondary">Ver mis recaídas</Button>} />
      </div>
      <Button size="sm" variant="secondary" onClick={() => setSpin((x) => x + 1)}>Volver a girar</Button>
    </div>
  )
}

export function ProgressDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-box-xs rounded-box-l bg-card p-box-m text-sm">
      <span className="font-medium">Nivel 5 · Tres semanas</span>
      <Progress value={22 / 30} label="Próximo hito" />
      <span className="text-xs text-muted-foreground">Próximo hito: un mes (faltan 8 días)</span>
    </div>
  )
}

export function StatCardsDemo() {
  return (
    <div className="grid h-96 w-full max-w-sm grid-cols-2 grid-rows-2 gap-box-gap">
      <StatCard value="30,8" unit="L" title="Litros evitados" text="88 vasos menos" onInfo={() => {}} />
      <StatCard value="4048" unit="mg" title="Cafeína evitada" text="≈ 43 tazas de café" onInfo={() => {}} />
      <StatCard value="—" unit="mmol" title="Carga ácida" text="Sin botón de explicación" />
      <StatCard value="88" unit="vasos" title="Vasos evitados" text="De 350 ml" />
    </div>
  )
}

const LEVELS = ["Primera victoria", "72 horas libres", "Una semana", "Dos semanas", "Tres semanas", "Un mes"]
const DAYS = [1, 3, 7, 14, 21, 30]

export function CarouselDemo() {
  return (
    <div className="w-full max-w-sm rounded-box-l bg-card py-box-m">
      <Carousel start={4} label="Hitos">
        {LEVELS.map((t, i) => {
          const done = i <= 4
          return (
            <div key={t} className="flex flex-col gap-box-s rounded-box-l bg-inset p-box-m">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Nivel {i + 1}</span>
                <span className={done ? "font-medium" : "text-muted-foreground"}>Día {DAYS[i]}</span>
              </div>
              <div className="flex h-24 items-center justify-center">
                <Trophy className={done ? "size-10 text-brand" : "size-10 text-muted-foreground"} />
              </div>
              <span className={done ? "text-lg font-medium text-brand-text" : "text-lg font-medium text-muted-foreground"}>{t}</span>
            </div>
          )
        })}
      </Carousel>
    </div>
  )
}

export function SwipeButtonDemo() {
  const [n, setN] = React.useState(0)
  return (
    <div className="flex w-full max-w-sm flex-col gap-box-xs">
      <SwipeButton label="Tuve una recaída" onConfirm={() => setN((x) => x + 1)} />
      <span className="text-xs text-muted-foreground">Confirmado {n} {n === 1 ? "vez" : "veces"}</span>
    </div>
  )
}
