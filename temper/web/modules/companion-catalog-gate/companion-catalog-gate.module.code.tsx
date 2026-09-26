"use client"

import { useCompanionCatalog } from "akasha/temper/web/modules/use-companion-catalog/use-companion-catalog.module.code.tsx"
import type { ReactNode } from "react"

export function CompanionCatalogGate({
  children,
  fallback,
}: {
  children: ReactNode
  fallback: ReactNode
}) {
  return <>{useCompanionCatalog() === null ? fallback : children}</>
}
