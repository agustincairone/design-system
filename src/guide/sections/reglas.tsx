// Guía, sección "Reglas".
import { Section } from "@/guide/layout"
import { Rules } from "@/guide/rules"

export function ReglasSection() {
  return (
    <Section
      id="reglas"
      title="Reglas"
      description="Las decisiones del sistema en un solo lugar. Toda app nueva las sigue."
    >
      <Rules />
    </Section>
  )
}
