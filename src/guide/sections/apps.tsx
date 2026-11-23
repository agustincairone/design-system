// Guía, sección "Apps": cada app con su color, su link, qué versión tiene, qué piezas usa y qué le falta.
import { BRANDS } from "@/brands"
import { useTheme } from "@/components/theme-provider"
import { Badge } from "@/components/ui/badge"
import { APPS, OTHER_APPS, appPieces, appVersion, pieceName, unusedPieces } from "@/guide/apps"
import { Section } from "@/guide/layout"
import { VERSIONS } from "@/guide/versions"

// Claro y oscuro y su botón los usan todas: no suman al leer la lista de cada app
const ALWAYS = ["theme-provider", "theme-toggle"]

export function AppsSection() {
  const { resolvedTheme } = useTheme()
  const mode = resolvedTheme === "dark" ? "dark" : "light"
  const latest = VERSIONS[0].v
  const unused = unusedPieces()
  return (
    <Section
      id="apps"
      title="Apps"
      description="Las apps que usan el sistema: su color, qué versión tienen, qué piezas usan y qué les falta. Todas usan además claro y oscuro."
    >
      <div className="grid gap-3 md:grid-cols-2">
        {APPS.map((a) => {
          const v = appVersion(a.id)
          const pieces = appPieces(a.id).filter((p) => !ALWAYS.includes(p))
          return (
            <div key={a.id} className="flex flex-col gap-4 rounded-3xl bg-card p-5">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="size-3 shrink-0 rounded-full" style={{ background: BRANDS[a.brand][mode].brand }} />
                <span className="font-medium">{a.name}</span>
                <span className="ml-auto text-xs text-muted-foreground">
                  <span className="font-mono">{v}</span> · {v === latest ? "al día" : "atrasada"}
                </span>
              </div>
              {a.url ? (
                <a href={a.url} target="_blank" rel="noreferrer" className="-mt-2 text-sm font-medium text-brand-text underline-offset-4 hover:underline">
                  {a.url.replace("https://", "")}
                </a>
              ) : (
                <span className="-mt-2 text-sm text-muted-foreground">Sin link anotado</span>
              )}
              <div>
                <p className="mb-2 text-xs text-muted-foreground">Usa {pieces.length} piezas</p>
                <div className="flex flex-wrap gap-1">
                  {pieces.map((p) => (
                    <Badge key={p} variant="secondary">{pieceName(p)}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-2 text-xs text-muted-foreground">Pendiente</p>
                {a.pending.length ? (
                  <ul className="flex list-disc flex-col gap-1 pl-5 text-sm">
                    {a.pending.map((t) => <li key={t}>{t}</li>)}
                  </ul>
                ) : (
                  <p className="text-sm">Nada</p>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-3 grid gap-3 md:grid-cols-2">
        <div className="flex flex-col gap-3 rounded-3xl bg-card p-5">
          <span className="font-medium">Sin usar todavía ({unused.length})</span>
          <div className="flex flex-wrap gap-1">
            {unused.map((p) => (
              <Badge key={p} variant="outline">{pieceName(p)}</Badge>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">Están en el sistema por si alguna vez las querés. Ninguna app las usa.</p>
        </div>
        <div className="flex flex-col gap-3 rounded-3xl bg-card p-5">
          <span className="font-medium">Sin el sistema</span>
          <p className="text-sm text-muted-foreground">{OTHER_APPS.join(" y ")} todavía no usan el sistema.</p>
        </div>
      </div>
    </Section>
  )
}
