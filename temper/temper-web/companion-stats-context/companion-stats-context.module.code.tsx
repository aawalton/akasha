"use client"

import type { CompanionEffectSource } from "akasha/temper/temper-companions-core/companion-effect-sources/companion-effect-sources.module.code.ts"
import type { CompanionMetricId } from "akasha/temper/temper-companions-core/companion-metric-ids/companion-metric-ids.module.code.ts"
import type { CompanionMetricValue } from "akasha/temper/temper-companions-core/companion-metrics/companion-metrics.module.code.ts"
import {
  type CompanionFormulaStats,
  extractNonSoothingHealingDoneSources,
} from "akasha/temper/temper-companions-core/companion-skill-formula/companion-skill-formula.module.code.ts"
import { computeSoothingHealingDone } from "akasha/temper/temper-companions-core/companion-soothing-healing/companion-soothing-healing.module.code.ts"
import type { CompanionScalingMetricId } from "akasha/temper/temper-companions-core/companion-value-formula/companion-value-formula.module.code.ts"
import type { RotationResult } from "akasha/temper/temper-companions-core/rotation-types/rotation-types.module.code.ts"
import { createContext, type ReactNode, useMemo } from "react"
import { useCompanion } from "../use-companion/use-companion.module.code.ts"
import { useCompanionStatsCalculation } from "../use-companion-stats-calculation/use-companion-stats-calculation.module.code.ts"

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
