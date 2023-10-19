import Link from "next/link"

import { cn } from "@/lib/utils"

export function MainNav({
    className,
    ...props
  }: React.HTMLAttributes<HTMLElement>) {
    return (
      <nav
        className={cn("flex items-center space-x-4 lg:space-x-6", className)}
        {...props}
      >
        <Link
          href="dashboard"
          className="text-sm font-medium transition-colors hover:text-primary"
        >
          Resumen general
        </Link>
        <Link
          href="/dashboard/subscriptions"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Subscripciones
        </Link>
        <Link
          href="/dashboard/users"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Usuarios
        </Link>
        <Link
          href="/dashboard/properties"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Propiedades
        </Link>
      </nav>
    )
  }