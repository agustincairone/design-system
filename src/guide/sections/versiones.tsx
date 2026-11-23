// Guía, sección "Versiones": qué trajo cada versión y qué apps la tienen hoy.
import { APPS, appVersion } from "@/guide/apps"
import { Section } from "@/guide/layout"
import { VERSIONS } from "@/guide/versions"

export function VersionesSection() {
  return (
    <Section
      id="versiones"
      title="Versiones"
      description="Qué trajo cada versión, en simple (todas de noviembre de 2026). Cuando una app se actualiza, recibe todo lo que hay entre su versión y la última."
    >
      <div className="divide-y rounded-3xl bg-card">
        {VERSIONS.map((v) => {
          const apps = APPS.filter((a) => appVersion(a.id) === v.v)
          return (
            <div key={v.v} className="grid gap-3 p-4 sm:grid-cols-[180px_1fr]">
              <div>
                <div className="font-mono text-sm font-medium">{v.v}</div>
                <div className="text-xs text-muted-foreground">{v.date}</div>
                {apps.length > 0 && (
                  <div className="mt-1 text-xs">
                    <span className="text-muted-foreground">La tienen:</span>{" "}
                    {apps.length === APPS.length ? "todas las apps" : apps.map((a) => a.name).join(" · ")}
                  </div>
                )}
              </div>
              <ul className="flex flex-col gap-1 text-sm">
                {v.items.map((t) => <li key={t}>{t}</li>)}
              </ul>
            </div>
          )
        })}
      </div>
    </Section>
  )
}
