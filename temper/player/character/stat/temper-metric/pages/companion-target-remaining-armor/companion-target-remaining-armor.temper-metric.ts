import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const companionTargetRemainingArmor = {
  id: "01a0df07-1cd5-744a-aca2-adaf49ec1dad",
  type: "page-type/temper-metric",
  slug: "companion-target-remaining-armor",
  title: "Target Remaining Armor",
  subject: "companion",
  valueType: "rating",
  divisor: 50000,
  cap: 0.5,
  formula: "ts",
} as const satisfies TemperMetric
