import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const companionPenetration = {
  id: "01a0df07-1cd5-711a-a0eb-670cae07608b",
  type: "page-type/temper-metric",
  slug: "companion-penetration",
  title: "Penetration",
  subject: "companion",
  valueType: "integer",
  effectType: "integer",
} as const satisfies TemperMetric
