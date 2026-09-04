import { convertRatingToChance } from "@akasha/temper-formula-framework/rating-chance"
import type { CompanionMetricId } from "../companion-metric-ids/companion-metric-ids.module.code.ts"
import { companionMetrics } from "../companion-metrics/companion-metrics.module.code.ts"

export function getCritChancePercent(metricValues: Map<CompanionMetricId, number>): number {
  const critRating = metricValues.get("companion-critical-chance") ?? 0
  const critMetric = companionMetrics.data["companion-critical-chance"]
  if (critMetric.valueType === "rating") {
    return convertRatingToChance(
      critRating,
      critMetric.divisor,
      critMetric.cap,
      critMetric.ratingFloorIncrement
    )
  }
  return 0
}

export function accumulateDamageBuffDelta(
  buff: string,
  value: number | undefined,
  valueType: string | undefined,
  uptime: number,
  critChancePercent: number
): number {
  if (valueType !== "fractional-change" || typeof value !== "number") return 0

  if (
    buff === "major-berserk" ||
    buff === "minor-berserk" ||
    buff === "major-brutality" ||
    buff === "minor-brutality" ||
    buff === "major-sorcery" ||
    buff === "minor-sorcery" ||
    buff === "minor-slayer"
  ) {
    return value * uptime
  }

  if (buff === "major-force" || buff === "minor-force") {
    return value * critChancePercent * uptime
  }

  return 0
}
