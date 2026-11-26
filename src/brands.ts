// Acentos de cada app, sólo para previsualizarlos en esta guía.
// La fuente de verdad para las apps es registry.json (items brand-*).

export type BrandId = "neutral" | "loop" | "pay-tracker" | "outfit-tracker" | "wine-tracker" | "bookmarks" | "no-coke-tracker"

type Vars = { brand: string; fg: string; text: string; strong: string; hover: string }

export const BRANDS: Record<BrandId, { name: string; light: Vars; dark: Vars }> = {
  neutral: {
    name: "Neutro",
    light: { brand: "oklch(21.6% 0.006 56.043)", fg: "oklch(98.5% 0.001 106.423)", text: "oklch(21.6% 0.006 56.043)", strong: "oklch(37.4% 0.01 67.558)", hover: "oklch(26.8% 0.007 34.298)" },
    dark: { brand: "oklch(97% 0.001 106.424)", fg: "oklch(21.6% 0.006 56.043)", text: "oklch(97% 0.001 106.424)", strong: "oklch(86.9% 0.005 56.366)", hover: "oklch(98.5% 0.001 106.423)" },
  },
  loop: {
    name: "LOOP",
    light: { brand: "oklch(64.6% 0.222 41.116)", fg: "oklch(100% 0 0)", text: "oklch(64.6% 0.222 41.116)", strong: "oklch(55.3% 0.195 38.402)", hover: "oklch(70.5% 0.213 47.604)" },
    dark: { brand: "oklch(64.6% 0.222 41.116)", fg: "oklch(100% 0 0)", text: "oklch(64.6% 0.222 41.116)", strong: "oklch(55.3% 0.195 38.402)", hover: "oklch(70.5% 0.213 47.604)" },
  },
  "pay-tracker": {
    name: "pay-tracker (green-700 / green-600)",
    light: { brand: "oklch(52.7% 0.154 150.069)", fg: "oklch(100% 0 0)", text: "oklch(52.7% 0.154 150.069)", strong: "oklch(44.8% 0.119 151.328)", hover: "oklch(62.7% 0.194 149.214)" },
    dark: { brand: "oklch(62.7% 0.194 149.214)", fg: "oklch(100% 0 0)", text: "oklch(62.7% 0.194 149.214)", strong: "oklch(52.7% 0.154 150.069)", hover: "oklch(72.3% 0.219 149.579)" },
  },
  "outfit-tracker": {
    name: "outfit-tracker (neutro)",
    light: { brand: "oklch(21.6% 0.006 56.043)", fg: "oklch(98.5% 0.001 106.423)", text: "oklch(21.6% 0.006 56.043)", strong: "oklch(37.4% 0.01 67.558)", hover: "oklch(26.8% 0.007 34.298)" },
    dark: { brand: "oklch(97% 0.001 106.424)", fg: "oklch(21.6% 0.006 56.043)", text: "oklch(97% 0.001 106.424)", strong: "oklch(86.9% 0.005 56.366)", hover: "oklch(98.5% 0.001 106.423)" },
  },
  "wine-tracker": {
    name: "wine-tracker (rose-900 / rose-700)",
    light: { brand: "oklch(41% 0.159 10.272)", fg: "oklch(100% 0 0)", text: "oklch(41% 0.159 10.272)", strong: "oklch(27.1% 0.105 12.094)", hover: "oklch(45.5% 0.188 13.697)" },
    dark: { brand: "oklch(51.4% 0.222 16.935)", fg: "oklch(100% 0 0)", text: "oklch(51.4% 0.222 16.935)", strong: "oklch(45.5% 0.188 13.697)", hover: "oklch(58.6% 0.253 17.585)" },
  },
  bookmarks: {
    name: "bookmarks (blue-600)",
    light: { brand: "oklch(54.6% 0.245 262.881)", fg: "oklch(100% 0 0)", text: "oklch(54.6% 0.245 262.881)", strong: "oklch(48.8% 0.243 264.376)", hover: "oklch(62.3% 0.214 259.815)" },
    dark: { brand: "oklch(54.6% 0.245 262.881)", fg: "oklch(100% 0 0)", text: "oklch(54.6% 0.245 262.881)", strong: "oklch(48.8% 0.243 264.376)", hover: "oklch(62.3% 0.214 259.815)" },
  },
  "no-coke-tracker": {
    name: "no-coke-tracker (red-600)",
    light: { brand: "oklch(57.7% 0.245 27.325)", fg: "oklch(100% 0 0)", text: "oklch(57.7% 0.245 27.325)", strong: "oklch(50.5% 0.213 27.518)", hover: "oklch(63.7% 0.237 25.331)" },
    dark: { brand: "oklch(57.7% 0.245 27.325)", fg: "oklch(100% 0 0)", text: "oklch(57.7% 0.245 27.325)", strong: "oklch(50.5% 0.213 27.518)", hover: "oklch(63.7% 0.237 25.331)" },
  },
}

const KEYS = ["primary", "ring", "chart-1", "sidebar-primary", "sidebar-ring"]

export function applyBrand(id: BrandId, mode: "light" | "dark") {
  const root = document.documentElement.style
  if (id === "neutral") {
    for (const k of [...KEYS, "brand", "brand-foreground", "brand-text", "brand-strong", "brand-hover", "primary-foreground", "sidebar-primary-foreground"]) {
      root.removeProperty(`--${k}`)
    }
    return
  }
  const v = BRANDS[id][mode]
  root.setProperty("--brand", v.brand)
  root.setProperty("--brand-foreground", v.fg)
  root.setProperty("--brand-text", v.text)
  root.setProperty("--brand-strong", v.strong)
  root.setProperty("--brand-hover", v.hover)
  root.setProperty("--primary-foreground", v.fg)
  root.setProperty("--sidebar-primary-foreground", v.fg)
  for (const k of KEYS) root.setProperty(`--${k}`, v.brand)
}
