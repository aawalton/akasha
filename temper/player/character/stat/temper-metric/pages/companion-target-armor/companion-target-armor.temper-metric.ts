import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const companionTargetArmor = {
  id: "01a0df07-1cd5-74b5-8904-f2e406ffcada",
  type: "page-type/temper-metric",
  slug: "companion-target-armor",
  title: "Target Armor",
  subject: "companion",
  valueType: "rating",
  effectType: "integer",
  divisor: 50000,
  cap: 0.5,
} as const satisfies TemperMetric
