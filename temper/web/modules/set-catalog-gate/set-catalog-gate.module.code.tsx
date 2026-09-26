"use client"

import type { SetCatalog } from "akasha/temper/player/character/characters-equipment/modules/sets-all/sets-all.module.code.ts"
import { useSetCatalog } from "akasha/temper/web/modules/use-set-catalog/use-set-catalog.module.code.tsx"
import type { ReactNode } from "react"

export function SetCatalogGate({
  children,
  fallback,
}: {
  children: (catalog: SetCatalog) => ReactNode
  fallback: ReactNode
}) {
  const catalog = useSetCatalog()
  return <>{catalog === null ? fallback : children(catalog)}</>
}
