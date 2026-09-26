import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const companionTpsShield = {
  id: "01a0df07-1cd5-76a7-a8ac-0f4f087e5b31",
  type: "page-type/temper-metric",
  slug: "companion-tps-shield",
  title: "Shields Per Second",
  subject: "companion",
  valueType: "integer",
} as const satisfies TemperMetric
