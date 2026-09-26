"use client"

import { useRecipeCatalog } from "akasha/temper/web/modules/use-recipe-catalog/use-recipe-catalog.module.code.tsx"
import type { ReactNode } from "react"

export function RecipeCatalogGate({
  children,
  fallback,
}: {
  children: ReactNode
  fallback: ReactNode
}) {
  return <>{useRecipeCatalog() === null ? fallback : children}</>
}
