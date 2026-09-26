"use client"

import { useSkillCatalog } from "akasha/temper/web/modules/use-skill-catalog/use-skill-catalog.module.code.tsx"
import type { ReactNode } from "react"

export function SkillCatalogGate({
  children,
  fallback,
}: {
  children: ReactNode
  fallback: ReactNode
}) {
  const catalog = useSkillCatalog()
  return <>{catalog === null ? fallback : children}</>
}
