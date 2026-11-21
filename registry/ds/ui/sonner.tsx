import { useTheme } from "@/components/theme-provider"
import { Toaster as Sonner, type ToasterProps } from "sonner"
import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon, Loader2Icon } from "lucide-react"

// `aboveNav`: en las apps con barra de abajo, el aviso sale abajo al centro, encima de la barra
// (la barra ocupa 80px desde el borde: 64 de alto + 16 de aire) con 16px de separación.
const ABOVE_NAV = { bottom: 96 }

const Toaster = ({ aboveNav, ...props }: ToasterProps & { aboveNav?: boolean }) => {
  const { resolvedTheme } = useTheme()

  return (
    <Sonner
      theme={resolvedTheme}
      className="toaster group"
      icons={{
        success: (
          <CircleCheckIcon className="size-4" />
        ),
        info: (
          <InfoIcon className="size-4" />
        ),
        warning: (
          <TriangleAlertIcon className="size-4" />
        ),
        error: (
          <OctagonXIcon className="size-4" />
        ),
        loading: (
          <Loader2Icon className="size-4 animate-spin" />
        ),
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "cn-toast",
        },
      }}
      {...(aboveNav ? { position: "bottom-center" as const, offset: ABOVE_NAV, mobileOffset: ABOVE_NAV } : {})}
      {...props}
    />
  )
}

export { Toaster }
