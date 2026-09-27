import {
  type CompanionSuggestion,
  generateSuggestions,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-suggestion-generator/companion-suggestion-generator.module.code.ts"
import type { CompanionState } from "akasha/temper/catalog/companion/companions-core/modules/companion-types/companion-types.module.code.ts"
import { useHeldCompanionCatalog } from "akasha/temper/web/modules/use-companion-catalog/use-companion-catalog.module.code.tsx"
import { useHeldMetricCatalog } from "akasha/temper/web/modules/use-metric-catalog/use-metric-catalog.module.code.tsx"
import { useMemo } from "react"

export function useCompanionSuggestions(build: CompanionState): readonly CompanionSuggestion[] {
  const catalog = useHeldCompanionCatalog()
  const metrics = useHeldMetricCatalog()
  return useMemo(() => {
    if (catalog === null || metrics === null) return []
    if (build.companion.baseRoles.length === 0) return []
    return generateSuggestions(build)
  }, [build, catalog, metrics])
}
