"use client"

import type { CharacterState } from "akasha/temper/temper-character-build/build-types/build-types.module.code.ts"
import { buildStateToEffectSources } from "akasha/temper/temper-characters-stats/build-state-adapter/build-state-adapter.module.code.ts"
import {
  compareMetricValuesUnfiltered,
  filterByAffectedMetrics,
} from "akasha/temper/temper-characters-stats/compare-stats/compare-stats.module.code.ts"
import {
  diffEffectSources,
  summarizeEffectChanges,
} from "akasha/temper/temper-characters-stats/diff-effect-sources/diff-effect-sources.module.code.ts"
import { calculateBuildStatsByBar } from "akasha/temper/temper-characters-stats/metric-calculator/metric-calculator.module.code.ts"
import type { MetricValue } from "akasha/temper/temper-characters-stats/metric-value/metric-value.module.code.ts"
import { useEffect, useRef } from "react"
import { toast } from "sonner"
import type { EffectSource } from "../../formula-framework/effect-source/effect-source.module.code.ts"
import type { MetricId } from "../../formula-framework/metric-id/metric-id.module.code.ts"
import {
  type StatChangeNotification,
  StatChangesDescription,
} from "../stat-changes-description/stat-changes-description.module.code.tsx"

export function useStatChangeNotifications(
  build: CharacterState,
  activeStatsTab: "primary" | "backup"
) {
  const previousFrontStats = useRef<Partial<Record<MetricId, MetricValue>>>({})
  const previousBackStats = useRef<Partial<Record<MetricId, MetricValue>>>({})
  const previousFrontSources = useRef<readonly EffectSource[]>([])
  const previousBackSources = useRef<readonly EffectSource[]>([])
  const isInitialMount = useRef(true)

  useEffect(() => {
    const frontResult = calculateBuildStatsByBar(build, "primary-weapon-bar")
    const backResult = calculateBuildStatsByBar(build, "backup-weapon-bar")
    const currentFrontStats = frontResult.metrics
    const currentBackStats = backResult.metrics
    const currentFrontSources = buildStateToEffectSources(build, "primary-weapon-bar")
    const currentBackSources = buildStateToEffectSources(build, "backup-weapon-bar")

    if (isInitialMount.current) {
      previousFrontStats.current = currentFrontStats
      previousBackStats.current = currentBackStats
      previousFrontSources.current = currentFrontSources
      previousBackSources.current = currentBackSources
      isInitialMount.current = false
      return
    }

    const previousStats =
      activeStatsTab === "primary" ? previousFrontStats.current : previousBackStats.current
    const currentStats = activeStatsTab === "primary" ? currentFrontStats : currentBackStats
    const previousSources =
      activeStatsTab === "primary" ? previousFrontSources.current : previousBackSources.current
    const currentSources = activeStatsTab === "primary" ? currentFrontSources : currentBackSources

    const diff = diffEffectSources(previousSources, currentSources)
    const summary = summarizeEffectChanges(diff)

    previousFrontStats.current = currentFrontStats
    previousBackStats.current = currentBackStats
    previousFrontSources.current = currentFrontSources
    previousBackSources.current = currentBackSources

    const hasChanges =
      summary.affectedMetricIds.size > 0 ||
      summary.addedBuffIds.length > 0 ||
      summary.removedBuffIds.length > 0

    if (hasChanges) {
      const allChanges = compareMetricValuesUnfiltered(previousStats, currentStats)

      const filteredChanges = filterByAffectedMetrics(allChanges, summary.affectedMetricIds)

      const notification: StatChangeNotification = {
        metricChanges: filteredChanges,
        addedBuffIds: summary.addedBuffIds,
        removedBuffIds: summary.removedBuffIds,
      }

      const hasVisibleChanges =
        filteredChanges.length > 0 ||
        summary.addedBuffIds.length > 0 ||
        summary.removedBuffIds.length > 0

      if (hasVisibleChanges) {
        toast("", {
          description: <StatChangesDescription notification={notification} />,
          duration: 5000,
        })
      }
    }
  }, [build, activeStatsTab])
}
