// Ícono de la app instalada: el emoji de la app en el medio, sobre el gris claro de la página (#e7e5e4),
// ocupando la mitad del ícono y centrado por el dibujo, sin círculo blanco. Así la pantalla que pone
// Android al abrir es igual en todas las apps: el emoji solo sobre el gris, del mismo tamaño y en el mismo lugar.
// Dibuja icon-512.png (en el manifest va con purpose "maskable") e icon-192.png con el emoji del Mac
// (necesita Google Chrome instalado).
//
// uso: npm run icons -- 🏠 ../pay-tracker/public
import { spawn } from "node:child_process"
import { writeFileSync, rmSync, mkdtempSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"

const [emoji, out] = process.argv.slice(2)
if (!emoji || !out) {
  console.error("uso: npm run icons -- <emoji> <carpeta public de la app>")
  process.exit(1)
}
const PORT = 9341
const prof = mkdtempSync(join(tmpdir(), "ds-icons-"))
const chrome = spawn("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", ["--headless=new", `--remote-debugging-port=${PORT}`, `--user-data-dir=${prof}`, "about:blank"], { stdio: "ignore" })
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
let pages
for (let i = 0; i < 40 && !pages; i++) {
  try { pages = await (await fetch(`http://127.0.0.1:${PORT}/json`)).json() } catch { await sleep(500) }
}
const ws = new WebSocket(pages.find((p) => p.type === "page").webSocketDebuggerUrl)
await new Promise((r) => (ws.onopen = r))
let id = 0
const send = (method, params = {}) => new Promise((res) => { const i = ++id; ws.addEventListener("message", function f(e) { const m = JSON.parse(e.data); if (m.id === i) { ws.removeEventListener("message", f); res(m.result) } }); ws.send(JSON.stringify({ id: i, method, params })) })

const draw = `(() => {
  const BG = "#e7e5e4", SHARE = 0.5 // el lado más largo del emoji ocupa la mitad del ícono
  const big = document.createElement("canvas"); big.width = big.height = 320
  const g = big.getContext("2d"); g.font = '160px "Apple Color Emoji"'; g.textAlign = "center"; g.textBaseline = "middle"; g.fillText(${JSON.stringify(emoji)}, 160, 160)
  const d = g.getImageData(0, 0, 320, 320).data; let x0 = 320, y0 = 320, x1 = 0, y1 = 0
  for (let y = 0; y < 320; y++) for (let x = 0; x < 320; x++) if (d[(y * 320 + x) * 4 + 3] > 8) { x0 = Math.min(x0, x); y0 = Math.min(y0, y); x1 = Math.max(x1, x); y1 = Math.max(y1, y) }
  const bw = x1 - x0 + 1, bh = y1 - y0 + 1, res = {}
  for (const n of [512, 192]) {
    const c = document.createElement("canvas"); c.width = c.height = n
    const k = c.getContext("2d"); k.fillStyle = BG; k.fillRect(0, 0, n, n)
    const s = (n * SHARE) / Math.max(bw, bh), w = bw * s, h = bh * s
    k.imageSmoothingEnabled = true; k.imageSmoothingQuality = "high"
    k.drawImage(big, x0, y0, bw, bh, (n - w) / 2, (n - h) / 2, w, h)
    res[n] = c.toDataURL("image/png")
  }
  return JSON.stringify(res)
})()`
const r = await send("Runtime.evaluate", { expression: draw, returnByValue: true })
const res = JSON.parse(r.result.value)
for (const n of [512, 192]) writeFileSync(join(out, `icon-${n}.png`), Buffer.from(res[n].split(",")[1], "base64"))
console.log(`listo: ${out}/icon-512.png e icon-192.png`)
chrome.kill()
await sleep(500)
rmSync(prof, { recursive: true, force: true })
process.exit(0)
