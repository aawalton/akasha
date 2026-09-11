import type { CompanionFormulaStats } from "akasha/temper/companions-core/companion-skill-formula/companion-skill-formula.module.code.ts"
import {
  CompanionStatsContext,
  type CompanionStatsContextValue,
} from "akasha/temper/web/companion-stats-context/companion-stats-context.module.code.tsx"
import { useContext } from "react"

export function useCompanionStats(): CompanionStatsContextValue {
  const context = useContext(CompanionStatsContext)

  if (!context) {
    throw new Error("useCompanionStats must be used within a CompanionStatsProvider")
  }

  return context
}

export function useCompanionFormulaStats(): {
  formulaStats: CompanionFormulaStats
  isLoading: boolean
} {
  const context = useContext(CompanionStatsContext)

  if (!context) {
    throw new Error("useCompanionFormulaStats must be used within a CompanionStatsProvider")
  }

  return {
    formulaStats: context.formulaStats,
    isLoading: context.isLoading,
  }
}
