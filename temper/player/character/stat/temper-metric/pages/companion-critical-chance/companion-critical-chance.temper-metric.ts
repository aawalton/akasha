import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const companionCriticalChance = {
  id: "01a0df07-1cd4-7fab-9eba-39b8180820f5",
  type: "page-type/temper-metric",
  slug: "companion-critical-chance",
  title: "Critical Chance",
  subject: "companion",
  valueType: "rating",
  effectType: "integer",
  divisor: 15000,
  cap: 1,
  ratingFloorIncrement: 0.05,
} as const satisfies TemperMetric
