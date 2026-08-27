import type { CompanionState } from "@temper/game-companions-core/companion-types"
import {
  type CompanionSuggestion,
  generateSuggestions,
} from "@temper/game-companions-core/optimizer/companion-suggestion-generator"
import { useMemo } from "react"

export function useCompanionSuggestions(build: CompanionState): readonly CompanionSuggestion[] {
  return useMemo(() => {
    if (build.companion.baseRoles.length === 0) return []
    return generateSuggestions(build)
  }, [build])
}
