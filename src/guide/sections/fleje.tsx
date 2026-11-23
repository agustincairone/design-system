// Guía, sección "Fleje y títulos".
import { AppHero, LiveDate, SectionHeader } from "@/components/ui/app-hero"
import { Section } from "@/guide/layout"

export function FlejeSection() {
  return (
    <Section
      id="fleje"
      uses={["ui/app-hero"]}
      title="Fleje y títulos"
      description="El título de cada app, igual en todas: nombre, nombre en japonés, un texto gris y un número general en letra de puntitos. Cada sección lleva su título con un dato a la derecha. Achicá la ventana para ver cómo se acomoda en el celular."
    >
      <div className="grid grid-cols-1 gap-box-gap">
        <div className="rounded-box-l bg-card p-box-l">
          <AppHero name="Loop" jp="ループ — リズムマシン" description="16-step sampler composer" stats={[{ value: 6, label: "channels", digits: 2 }, { value: 16, label: "steps", digits: 2 }]} />
        </div>
        <div className="rounded-box-l bg-card p-box-l">
          <AppHero name="Outfit" jp="コーデ日記" stats={[{ value: <LiveDate />, label: "registro diario de outfits" }]} />
        </div>
        <div className="grid gap-box-gap rounded-box-l bg-card p-box-l">
          <SectionHeader title="¿Qué me puse hoy?" icon="☀️" value="12/22°" />
          <SectionHeader title="Historial" label="días cargados" value={124} />
          <SectionHeader title="Mis prendas" label="prendas" value={48} />
          <SectionHeader title="Estadísticas" label="prendas usadas" value={31} />
        </div>
      </div>
    </Section>
  )
}
