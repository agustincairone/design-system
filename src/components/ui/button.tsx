import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Slot } from "radix-ui"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-full border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3",
  {
    variants: {
      variant: {
        // deshabilitado en grises (como outfit), no el color de la app a media luz
        default: "bg-primary text-primary-foreground hover:bg-brand-hover disabled:bg-secondary disabled:text-muted-foreground disabled:opacity-100",
        outline:
          "border-input bg-transparent hover:border-brand hover:text-brand aria-expanded:border-brand aria-expanded:text-brand dark:border-input",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-brand hover:text-brand-foreground active:bg-brand-strong active:text-brand-foreground aria-expanded:bg-brand aria-expanded:text-brand-foreground",
        // Relleno blanco (en modo oscuro, del color de las cajas). Ej: flechas para cambiar de mes
        card: "bg-card text-foreground hover:bg-brand hover:text-brand-foreground active:bg-brand-strong active:text-brand-foreground",
        ghost:
          "hover:bg-card-hover hover:text-foreground aria-expanded:bg-card-hover aria-expanded:text-foreground",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive-hover focus-visible:border-destructive/40 focus-visible:ring-destructive/30",
        // Botón de solo texto: siempre subrayado y siempre del tamaño normal (14px), nunca chico
        link: "text-brand-text underline underline-offset-4 hover:decoration-2",
        // Borrar algo sin que grite: borde y texto rojos, se llena de rojo al pasar el mouse
        "destructive-outline":
          "border-border bg-transparent text-destructive hover:border-destructive hover:bg-destructive hover:text-destructive-foreground",
        // Cancelar/borrar suave: fondo gris y texto rojo (diseño outfit)
        "destructive-soft":
          "bg-secondary text-destructive hover:bg-destructive hover:text-destructive-foreground",
        // Agregar algo nuevo: borde punteado y texto gris
        dashed:
          "border-dashed border-input bg-transparent text-muted-foreground hover:border-brand hover:text-brand",
      },
      size: {
        default:
          "h-10 gap-1.5 px-4 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
        sm: "h-8 gap-1 rounded-full px-3 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        icon: "size-10",
        "icon-xs":
          "size-6 rounded-full in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-7 rounded-full in-data-[slot=button-group]:rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
