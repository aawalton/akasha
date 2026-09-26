"use client"

import {
  companionCatalogContext,
  useCompanionCatalog,
} from "akasha/temper/web/modules/use-companion-catalog/use-companion-catalog.module.code.tsx"
import type { ReactNode } from "react"

export function CompanionCatalogGate({
  children,
  fallback,
}: {
  children: ReactNode
  fallback: ReactNode
}) {
  const catalog = useCompanionCatalog()
  if (catalog === null) return <>{fallback}</>
  return (
    <companionCatalogContext.Provider value={catalog}>{children}</companionCatalogContext.Provider>
  )
}
