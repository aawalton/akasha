import { calculateBuildStatsByBar } from "akasha/temper/characters-stats/metric-calculator/metric-calculator.module.code.ts"
import type { MetricValue } from "akasha/temper/characters-stats/metric-value/metric-value.module.code.ts"
import type { CharacterState } from "akasha/temper/temper-character-build/build-types/build-types.module.code.ts"
import { useEffect, useState } from "react"
import type { EffectSource } from "../../formula-framework/effect-source/effect-source.module.code.ts"
import type { MetricId } from "../../formula-framework/metric-id/metric-id.module.code.ts"

export function useStatsCalculation(build: CharacterState) {
  const [frontStats, setFrontStats] = useState<Partial<Record<MetricId, MetricValue>>>({})
  const [backStats, setBackStats] = useState<Partial<Record<MetricId, MetricValue>>>({})
  const [frontSources, setFrontSources] = useState<readonly EffectSource[]>([])
  const [backSources, setBackSources] = useState<readonly EffectSource[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    function loadStats() {
      setIsLoading(true)
      try {
        const frontResult = calculateBuildStatsByBar(build, "primary-weapon-bar")
        const backResult = calculateBuildStatsByBar(build, "backup-weapon-bar")
        if (!cancelled) {
          setFrontStats(frontResult.metrics)
          setBackStats(backResult.metrics)
          setFrontSources(frontResult.sources)
          setBackSources(backResult.sources)
        }
      } catch (error) {
        console.error("[StatsPanel] Failed to calculate stats:", error)
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    loadStats()

    return () => {
      cancelled = true
    }
  }, [build])

  return {
    frontStats,
    backStats,
    frontSources,
    backSources,
    isLoading,
  }
}
