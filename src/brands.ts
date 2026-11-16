// Acentos de cada app, sólo para previsualizarlos en esta guía.
// La fuente de verdad para las apps es registry.json (items brand-*).

export type BrandId = "neutral" | "loop" | "pay-tracker" | "outfit-tracker"

type Vars = { brand: string; fg: string; text: string; strong: string }

export const BRANDS: Record<BrandId, { name: string; light: Vars; dark: Vars }> = {
  neutral: {
    name: "Neutro",
    light: { brand: "oklch(21.6% 0.006 56.043)", fg: "oklch(98.5% 0.001 106.423)", text: "oklch(21.6% 0.006 56.043)", strong: "oklch(37.4% 0.01 67.558)" },
    dark: { brand: "oklch(97% 0.001 106.424)", fg: "oklch(21.6% 0.006 56.043)", text: "oklch(97% 0.001 106.424)", strong: "oklch(86.9% 0.005 56.366)" },
  },
  loop: {
    name: "LOOP",
    light: { brand: "oklch(64.6% 0.222 41.116)", fg: "oklch(100% 0 0)", text: "oklch(64.6% 0.222 41.116)", strong: "oklch(55.3% 0.195 38.402)" },
    dark: { brand: "oklch(64.6% 0.222 41.116)", fg: "oklch(100% 0 0)", text: "oklch(64.6% 0.222 41.116)", strong: "oklch(55.3% 0.195 38.402)" },
  },
  "pay-tracker": {
    name: "pay-tracker (provisorio)",
    light: { brand: "#22c55e", fg: "#0a0a0a", text: "oklch(0.398 0.106 149.6)", strong: "#15803d" },
    dark: { brand: "#22c55e", fg: "#0a0a0a", text: "#22c55e", strong: "#15803d" },
  },
  "outfit-tracker": {
    name: "outfit-tracker (provisorio)",
    light: { brand: "#ec4899", fg: "#0a0a0a", text: "oklch(0.361 0.116 354.3)", strong: "#be185d" },
    dark: { brand: "#ec4899", fg: "#0a0a0a", text: "#ec4899", strong: "#be185d" },
  },
}

const KEYS = ["primary", "ring", "chart-1", "sidebar-primary", "sidebar-ring"]

export function applyBrand(id: BrandId, mode: "light" | "dark") {
  const root = document.documentElement.style
  if (id === "neutral") {
    for (const k of [...KEYS, "brand", "brand-foreground", "brand-text", "brand-strong", "primary-foreground", "sidebar-primary-foreground"]) {
      root.removeProperty(`--${k}`)
    }
    return
  }
  const v = BRANDS[id][mode]
  root.setProperty("--brand", v.brand)
  root.setProperty("--brand-foreground", v.fg)
  root.setProperty("--brand-text", v.text)
  root.setProperty("--brand-strong", v.strong)
  root.setProperty("--primary-foreground", v.fg)
  root.setProperty("--sidebar-primary-foreground", v.fg)
  for (const k of KEYS) root.setProperty(`--${k}`, v.brand)
}
