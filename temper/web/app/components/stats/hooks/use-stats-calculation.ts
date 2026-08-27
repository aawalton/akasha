import type { CharacterState } from "@temper/game-characters-character/build-types"
import { calculateBuildStatsByBar } from "@temper/game-characters-stats/metric-calculator"
import type { MetricId } from "@temper/shared-formula-framework/metric-ids.generated"
import type { MetricValue } from "@temper/game-characters-stats/metrics/types"
import type { EffectSource } from "@temper/shared-formula-framework/effect-source"
import { useEffect, useState } from "react"

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
