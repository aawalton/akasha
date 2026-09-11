import type { RotationMetricEntry } from "akasha/temper/companions-core/companion-rotation-metrics/companion-rotation-metrics.module.code.ts"
import type { CompanionStatsResult } from "akasha/temper/companions-core/companion-stats-result/companion-stats-result.module.code.ts"
import {
  computeSupportDpsContribution,
  computeSupportTpsContribution,
  extractAllyVisibleBuffUptimes,
} from "akasha/temper/companions-core/companion-support-contributions/companion-support-contributions.module.code.ts"
import type { ReferenceBaseline } from "akasha/temper/companions-core/companion-support-types/companion-support-types.module.code.ts"

export function computeSupportMetrics(
  result: CompanionStatsResult,
  baseline: ReferenceBaseline
): readonly RotationMetricEntry[] {
  const rotation = result.rotation
  if (!rotation) return []

  const supportBuffs = extractAllyVisibleBuffUptimes(result)

  const supportDps = computeSupportDpsContribution(supportBuffs, baseline)
  const supportTps = computeSupportTpsContribution(supportBuffs, baseline)
  const supportScore = supportDps + supportTps / 10

  return [
    { metricId: "companion-support-dps", value: supportDps * 4 },
    { metricId: "companion-support-tps", value: supportTps },
    { metricId: "companion-support-score", value: supportScore },
  ]
}
