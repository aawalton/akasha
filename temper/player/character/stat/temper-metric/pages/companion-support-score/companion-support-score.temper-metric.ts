import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const companionSupportScore = {
  id: "01a0df07-1cd5-7dd8-ae52-2f1f4936dc7b",
  type: "page-type/temper-metric",
  slug: "companion-support-score",
  title: "Support Score",
  subject: "companion",
  valueType: "integer",
  valueSource: "rotation",
  formula: "ts",
} as const satisfies TemperMetric
