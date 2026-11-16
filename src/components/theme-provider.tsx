import * as React from "react"

/**
 * Tema de la app: "system" (automático, sigue al dispositivo), "light" o "dark".
 * Se guarda en el navegador y pone la clase .light / .dark en <html>.
 *
 * Para evitar el "flash" de color al cargar, agregá en index.html, dentro de <head>:
 *   <script>try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark")t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.classList.add(t)}catch(e){}</script>
 */

export type Theme = "system" | "light" | "dark"
export type ResolvedTheme = "light" | "dark"

type ThemeProviderState = {
  theme: Theme
  resolvedTheme: ResolvedTheme
  setTheme: (theme: Theme) => void
}

const QUERY = "(prefers-color-scheme: dark)"
const THEMES: Theme[] = ["system", "light", "dark"]

const ThemeContext = React.createContext<ThemeProviderState | undefined>(
  undefined
)

const systemTheme = (): ResolvedTheme =>
  window.matchMedia(QUERY).matches ? "dark" : "light"

function readStored(key: string): Theme | null {
  try {
    const v = localStorage.getItem(key)
    return THEMES.includes(v as Theme) ? (v as Theme) : null
  } catch {
    return null
  }
}

/** Evita que todo "se anime" al cambiar de tema. */
function withoutTransitions(fn: () => void) {
  const style = document.createElement("style")
  style.textContent = "*,*::before,*::after{transition:none!important}"
  document.head.appendChild(style)
  fn()
  window.getComputedStyle(document.body)
  requestAnimationFrame(() => requestAnimationFrame(() => style.remove()))
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "theme",
}: {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}) {
  const [theme, setThemeState] = React.useState<Theme>(
    () => readStored(storageKey) ?? defaultTheme
  )
  const [resolvedTheme, setResolved] = React.useState<ResolvedTheme>(() =>
    theme === "system" ? systemTheme() : theme
  )

  const setTheme = React.useCallback(
    (next: Theme) => {
      try {
        localStorage.setItem(storageKey, next)
      } catch {
        /* sin almacenamiento: igual cambia en esta sesión */
      }
      setThemeState(next)
    },
    [storageKey]
  )

  React.useEffect(() => {
    const apply = () => {
      const resolved = theme === "system" ? systemTheme() : theme
      withoutTransitions(() => {
        const root = document.documentElement
        root.classList.remove("light", "dark")
        root.classList.add(resolved)
        root.style.colorScheme = resolved
      })
      setResolved(resolved)
    }
    apply()
    if (theme !== "system") return
    const mq = window.matchMedia(QUERY)
    mq.addEventListener("change", apply)
    return () => mq.removeEventListener("change", apply)
  }, [theme])

  // Si cambiás el tema en otra pestaña, se sincroniza
  React.useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === storageKey) setThemeState(readStored(storageKey) ?? defaultTheme)
    }
    window.addEventListener("storage", onStorage)
    return () => window.removeEventListener("storage", onStorage)
  }, [storageKey, defaultTheme])

  const value = React.useMemo(
    () => ({ theme, resolvedTheme, setTheme }),
    [theme, resolvedTheme, setTheme]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = React.useContext(ThemeContext)
  if (!ctx) throw new Error("useTheme debe usarse dentro de <ThemeProvider>")
  return ctx
}
