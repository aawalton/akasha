import type { CompanionState } from "@akasha/temper-companions-core/companion-types"
import type { RotationResult } from "@temper/game-companions-core/rotation/rotation-types"
import type { CompanionMetricValue } from "@temper/game-companions-core/stats/companion-metrics.generated"
import type { CompanionMetricId } from "@akasha/temper-companions-core/companion-metric-ids"
import { calculateCompanionStats } from "@temper/game-companions-core/stats/companion-stats-calculator"
import { type CompanionEffectSource } from "@temper/game-companions-core/stats/companion-effect-sources"
import { useEffect, useState } from "react"

export function useCompanionStatsCalculation(build: CompanionState) {
  const [stats, setStats] = useState<Partial<Record<CompanionMetricId, CompanionMetricValue>>>({})
  const [sources, setSources] = useState<readonly CompanionEffectSource[]>([])
  const [rotation, setRotation] = useState<RotationResult | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    let cancelled = false

    function loadStats() {
      setIsLoading(true)
      try {
        const result = calculateCompanionStats(build)
        if (!cancelled) {
          setStats(result.metrics)
          setSources(result.sources)
          setRotation(result.rotation)
          setHasError(false)
        }
      } catch (error) {
        console.error("[CompanionStatsPanel] Failed to calculate stats:", error)
        if (!cancelled) {
          setStats({})
          setSources([])
          setRotation(null)
          setHasError(true)
        }
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
    stats,
    sources,
    rotation,
    isLoading,
    hasError,
  }
}
