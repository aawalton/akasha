import type { CompanionFormulaStats } from "@temper/game-companions-core/formulas/companion-skill-formula"
import { useContext } from "react"
import { CompanionStatsContext, type CompanionStatsContextValue } from "./companion-stats-context"

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
