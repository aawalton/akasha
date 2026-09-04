import {
  type CompanionSuggestion,
  generateSuggestions,
} from "@akasha/temper-companions-core/companion-suggestion-generator"
import type { CompanionState } from "@akasha/temper-companions-core/companion-types"
import { useMemo } from "react"

export function useCompanionSuggestions(build: CompanionState): readonly CompanionSuggestion[] {
  return useMemo(() => {
    if (build.companion.baseRoles.length === 0) return []
    return generateSuggestions(build)
  }, [build])
}
