// Anota qué piezas del sistema usa cada app, para la guía (página "Apps" y el "lo usan" de cada pieza).
// Lee las apps que están al lado de esta carpeta (../pay-tracker, ../wine-tracker, …): qué versión del
// sistema tienen en package.json y qué piezas importan. Escribe src/guide/usage.json.
// Se corre a mano después de actualizar una app: npm run usage
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const APPS = { pay: "pay-tracker", outfit: "outfit-tracker", wine: "wine-tracker", loop: "loop", bookmarks: "bookmarks", "no-coke": "no-coke-tracker" }

const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name)
    return e.isDirectory() ? walk(p) : [p]
  })

// Todas las piezas: src/components/<carpeta>/<nombre>.tsx → "carpeta/nombre"
const compDir = path.join(root, "src/components")
const pieces = walk(compDir)
  .filter((f) => f.endsWith(".tsx"))
  .map((f) => path.relative(compDir, f).replace(/\.tsx$/, ""))
  .sort()

// Piezas que usan otras piezas por dentro (ej: la hoja usa el degradé)
const inside = {}
for (const p of pieces) {
  const src = fs.readFileSync(path.join(compDir, p + ".tsx"), "utf8")
  for (const [, dep] of src.matchAll(/from "@\/components\/([a-z/-]+)"/g)) {
    if (dep !== p && pieces.includes(dep)) (inside[dep] ??= new Set()).add(p)
  }
}

const apps = {}
for (const [id, folder] of Object.entries(APPS)) {
  const dir = path.join(root, "..", folder)
  if (!fs.existsSync(dir)) throw new Error(`No encuentro la app ${folder} al lado del sistema`)
  const pkg = fs.readFileSync(path.join(dir, "package.json"), "utf8")
  const version = pkg.match(/design-system#(v[0-9.]+)/)?.[1] ?? null
  const used = new Set()
  for (const f of walk(path.join(dir, "src")).filter((f) => /\.(jsx?|tsx?)$/.test(f))) {
    const src = fs.readFileSync(f, "utf8")
    for (const [, p] of src.matchAll(/@agustincairone\/design-system\/components\/([a-z/-]+)["']/g)) used.add(p)
  }
  apps[id] = { version, pieces: [...used].filter((p) => pieces.includes(p)).sort() }
}

const out = {
  apps,
  pieces,
  inside: Object.fromEntries(Object.entries(inside).map(([k, v]) => [k, [...v].sort()])),
}
fs.writeFileSync(path.join(root, "src/guide/usage.json"), JSON.stringify(out, null, 2) + "\n")
const unused = pieces.filter((p) => !Object.values(apps).some((a) => a.pieces.includes(p)) && !inside[p])
console.log(`usage.json listo: ${pieces.length} piezas, ${unused.length} sin usar (${unused.join(", ")})`)
for (const [id, a] of Object.entries(apps)) console.log(`  ${id}: ${a.version}, ${a.pieces.length} piezas`)
