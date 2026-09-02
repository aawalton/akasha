"use client"

import { computeSoothingHealingDone } from "@temper/game-companions-core/equipment/companion-traits-data"
import {
  type CompanionFormulaStats,
  extractNonSoothingHealingDoneSources,
} from "@temper/game-companions-core/formulas/companion-skill-formula"
import type { RotationResult } from "@temper/game-companions-core/rotation/rotation-types"
import type { CompanionScalingMetricId } from "@akasha/temper-companions-core/companion-value-formula"
import type { CompanionEffectSource } from "@temper/game-companions-core/stats/companion-effect-sources"
import type { CompanionMetricValue } from "@temper/game-companions-core/stats/companion-metrics.generated"
import type { CompanionMetricId } from "@akasha/temper-companions-core/companion-metric-ids"
import { createContext, type ReactNode, useMemo } from "react"
import { useCompanionStatsCalculation } from "@/components/companion-skills/hooks/use-companion-stats-calculation"
import { useCompanion } from "@/components/companions/context/use-companion"

export interface CompanionStatsContextValue {
  stats: Partial<Record<CompanionMetricId, CompanionMetricValue>>
  sources: readonly CompanionEffectSource[]
  rotation: RotationResult | null
  isLoading: boolean
  hasError: boolean
  formulaStats: CompanionFormulaStats
}

export const CompanionStatsContext = createContext<CompanionStatsContextValue | null>(null)

interface CompanionStatsProviderProps {
  children: ReactNode
}

export function CompanionStatsProvider({ children }: CompanionStatsProviderProps) {
  const build = useCompanion()
  const { stats, sources, rotation, isLoading, hasError } = useCompanionStatsCalculation(build)

  const formulaStats = useMemo<CompanionFormulaStats>(() => {
    const metrics = new Map<CompanionScalingMetricId, number>([
      ["companion-weapon-damage", stats["companion-weapon-damage"]?.value ?? 2000],
      ["companion-health-maximum", stats["companion-health-maximum"]?.value ?? 30000],
    ])
    const damageDone = stats["companion-damage-done"]?.value ?? 0
    const soothingHD = computeSoothingHealingDone(build)
    return {
      metrics,
      tooltipDamageMultiplier: 1 + damageDone,
      damageDone,
      healingSoothingHD: soothingHD,
      healingOtherSources: extractNonSoothingHealingDoneSources(sources),
      abilityCooldown: stats["companion-ability-cooldown"]?.value ?? 0,
      buffDuration: stats["companion-buff-duration"]?.value ?? 0,
    }
  }, [stats, sources, build])

  const value = useMemo<CompanionStatsContextValue>(
    () => ({
      stats,
      sources,
      rotation,
      isLoading,
      hasError,
      formulaStats,
    }),
    [stats, sources, rotation, isLoading, hasError, formulaStats]
  )

  return <CompanionStatsContext.Provider value={value}>{children}</CompanionStatsContext.Provider>
}
