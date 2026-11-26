// Guía, sección "Controles".
import * as React from "react"
import { FieldSlider } from "@/components/controls/field-slider"
import { NumberSlider } from "@/components/controls/number-slider"
import { SplitSlider } from "@/components/controls/split-slider"
import { Stepper } from "@/components/controls/stepper"
import { ControlCard, Demo, Section } from "@/guide/layout"
import { CarouselDemo, SwipeButtonDemo } from "@/guide/no-coke-demos"
import { ScaleSliderDemo, StarRatingDemo } from "@/guide/guide-demos"

function ControlsDemo() {
  const [width, setWidth] = React.useState(3)
  const [radius, setRadius] = React.useState(347)
  const [count, setCount] = React.useState(1)
  const [rows, setRows] = React.useState(27)
  const [cols, setCols] = React.useState(54)
  const [mix, setMix] = React.useState(0.37)
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <ControlCard uses={["controls/field-slider"]} name="Campo-slider" use="Arrastrás de costado en cualquier parte. Con pocos valores, muestra un punto por cada uno.">
        <div className="grid w-full max-w-sm gap-3">
          <FieldSlider label="Ancho" value={width} min={1} max={8} defaultValue={3} onChange={setWidth} />
          <FieldSlider label="Radio" value={radius} min={0} max={500} defaultValue={250} onChange={setRadius} />
        </div>
      </ControlCard>
      <ControlCard uses={["controls/field-slider"]} name="Campo-slider vertical" use="La misma píldora parada: se arrastra para arriba o para abajo.">
        <div className="flex h-56 gap-3">
          <FieldSlider orientation="vertical" label="Ancho" value={width} min={1} max={8} defaultValue={3} onChange={setWidth} />
          <FieldSlider orientation="vertical" label="Radio" value={radius} min={0} max={500} defaultValue={250} onChange={setRadius} />
        </div>
      </ControlCard>
      <ControlCard uses={["controls/stepper"]} name="Stepper" use="Cantidades chicas (− 1 +).">
        <div className="flex flex-col items-center gap-5">
          <Stepper label="Cantidad" value={count} min={0} max={16} onChange={setCount} />
        </div>
      </ControlCard>
      <ControlCard uses={["controls/number-slider"]} name="Número + slider" use="Podés escribir el número exacto o arrastrar.">
        <div className="grid w-full max-w-sm gap-3">
          <NumberSlider label="Filas" value={rows} min={1} max={64} onChange={setRows} />
          <NumberSlider label="Columnas" value={cols} min={1} max={64} onChange={setCols} />
        </div>
      </ControlCard>
      <ControlCard uses={["controls/split-slider"]} name="Reparto entre dos" use="Cuánto de cada cosa: seco/efecto, izquierda/derecha. Doble clic = mitad y mitad.">
        <SplitSlider left="Seco" right="Efecto" value={mix} onChange={setMix} className="max-w-sm" />
      </ControlCard>
      <ControlCard uses={["controls/scale-slider"]} name="Escala corta" use="Un valor de 1 a 5 con nombre, explicación (ⓘ), una marquita por valor y los extremos. Ej: el perfil de un vino.">
        <ScaleSliderDemo />
      </ControlCard>
      <ControlCard uses={["ui/stars"]} name="Estrellas para puntuar" use="Un puntaje de 1 a 5. Al pasar el mouse se ve cómo quedaría.">
        <StarRatingDemo />
      </ControlCard>
    </div>
  )
}

export function ControlesSection() {
  return (
    <Section
      id="controles"
      title="Controles"
      description="Para cambiar un número de otras formas, no sólo con un slider. Sirven en cualquier app."
    >
      <ControlsDemo />
      <div className="mt-4 flex flex-col gap-4">
        <Demo uses={["controls/swipe-button"]} label="Botón para deslizar (de no-coke): para algo que no se deshace fácil. Se arrastra el círculo hasta el otro lado; si se suelta antes, vuelve. Mide como la barra de abajo y va en su lugar">
          <SwipeButtonDemo />
        </Demo>
        <Demo uses={["controls/carousel"]} label="Carrusel de fichas (los hitos de no-coke): una al centro y asomando las de los costados. Se pasa con el dedo o con las flechas, que dicen en cuál vas">
          <CarouselDemo />
        </Demo>
      </div>
    </Section>
  )
}
