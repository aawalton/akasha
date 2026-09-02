import type { CompanionMetricTemplate } from "@akasha/temper-companions-core/companion-metric-template"

export const companionCriticalChanceMetric = {
  id: "companion-critical-chance",
  name: "Critical Chance",
  valueType: "rating",
  effectType: "integer",
  divisor: 15000,
  cap: 1,
  ratingFloorIncrement: 0.05,
} satisfies CompanionMetricTemplate
