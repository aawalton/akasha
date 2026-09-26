import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const companionScore = {
  id: "01a0df07-1cd5-74fa-b5dc-8d7d07705a87",
  type: "page-type/temper-metric",
  slug: "companion-score",
  title: "Score",
  subject: "companion",
  valueType: "integer",
  valueSource: "rotation",
  formula: "ts",
} as const satisfies TemperMetric
