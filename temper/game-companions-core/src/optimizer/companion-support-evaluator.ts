import type { RotationMetricEntry } from "../stats/companion-rotation-metrics"
import type { CompanionStatsResult } from "../stats/companion-stats-calculator-impl"
import {
  computeSupportDpsContribution,
  computeSupportTpsContribution,
  extractAllyVisibleBuffUptimes,
} from "./companion-support-contributions"
import type { ReferenceBaseline } from "./companion-support-types"


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
