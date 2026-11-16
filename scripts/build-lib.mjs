// Arma el paquete que usan las apps (carpeta lib/), a partir de lo que muestra la guía.
//   npm run build:lib
// - src/components y src/lib → lib/ en JavaScript (sin tipos), con imports relativos
// - src/index.css → lib/theme.css (todo el tema: Tailwind, fuentes, tokens, utilidades)
// - registry.json (items brand-*) → lib/brands/<app>.css (el color de cada app)
// La carpeta lib/ se guarda en git: es lo que bajan las apps al instalar el paquete.

import fs from "node:fs"
import path from "node:path"
import ts from "typescript"

const root = path.resolve(import.meta.dirname, "..")
const out = path.join(root, "lib")
fs.rmSync(out, { recursive: true, force: true })

const write = (file, text) => {
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, text)
}

// ---------- componentes ----------
const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name)
    return e.isDirectory() ? walk(p) : [p]
  })

const sources = [...walk(path.join(root, "src/components")), path.join(root, "src/lib/utils.ts")].filter((f) => /\.tsx?$/.test(f))

for (const file of sources) {
  const rel = path.relative(path.join(root, "src"), file) // components/ui/button.tsx
  const target = path.join(out, rel.replace(/\.tsx?$/, ".js"))
  let code = ts.transpileModule(fs.readFileSync(file, "utf8"), {
    compilerOptions: { jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext, verbatimModuleSyntax: false },
    fileName: file,
  }).outputText
  // "@/components/ui/button" → "../ui/button.js"
  code = code.replace(/(from\s+|import\s*\(\s*)(["'])@\/([^"']+)\2/g, (_, pre, q, spec) => {
    let r = path.relative(path.dirname(target), path.join(out, spec))
    if (!r.startsWith(".")) r = "./" + r
    return `${pre}${q}${r}.js${q}`
  })
  // imports relativos entre archivos ("./drag") también necesitan la extensión
  code = code.replace(/(from\s+)(["'])(\.{1,2}\/[^"']+?)(?<!\.js)\2/g, "$1$2$3.js$2")
  write(target, code)
}

// ---------- tema ----------
let css = fs.readFileSync(path.join(root, "src/index.css"), "utf8")
css = css.replace('@import "shadcn/tailwind.css";', '@import "./shadcn-tailwind.css";')
css = css.replace('@import "./styles/geist-pixel-circle.css";', '@import "./fonts/geist-pixel-circle.css";')
css = css.replace('@custom-variant dark', '/* que Tailwind encuentre las clases de los componentes del paquete */\n@source "./components";\n\n@custom-variant dark')
write(path.join(out, "theme.css"), "/* Generado por scripts/build-lib.mjs desde src/index.css. No editar a mano. */\n" + css)
fs.copyFileSync(path.join(root, "node_modules/shadcn/dist/tailwind.css"), path.join(out, "shadcn-tailwind.css"))
fs.mkdirSync(path.join(out, "fonts"), { recursive: true })
fs.copyFileSync(path.join(root, "src/styles/geist-pixel-circle.css"), path.join(out, "fonts/geist-pixel-circle.css"))

// ---------- colores de cada app ----------
const registry = JSON.parse(fs.readFileSync(path.join(root, "registry.json"), "utf8"))
const block = (sel, vars) => `${sel} {\n${Object.entries(vars).map(([k, v]) => `  --${k}: ${v};`).join("\n")}\n}\n`
for (const item of registry.items.filter((i) => i.name.startsWith("brand-"))) {
  const id = item.name.slice("brand-".length)
  write(path.join(out, "brands", `${id}.css`), `/* Color de ${id}. Importalo después de theme.css */\n` + block(":root", item.cssVars.light) + "\n" + block(".dark", item.cssVars.dark))
}

console.log(`lib/ listo: ${sources.length} componentes + theme.css + ${registry.items.filter((i) => i.name.startsWith("brand-")).length} colores`)
