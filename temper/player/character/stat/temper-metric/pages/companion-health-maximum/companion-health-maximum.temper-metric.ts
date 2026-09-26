import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const companionHealthMaximum = {
  id: "01a0df07-1cd5-7876-954d-0a7a13ba4486",
  type: "page-type/temper-metric",
  slug: "companion-health-maximum",
  title: "Maximum Health",
  subject: "companion",
  valueType: "integer",
  formula: "ts",
} as const satisfies TemperMetric
