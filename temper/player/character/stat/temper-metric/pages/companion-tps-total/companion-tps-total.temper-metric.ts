import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const companionTpsTotal = {
  id: "01a0df07-1cd5-7098-8f2a-dd0c79b58db0",
  type: "page-type/temper-metric",
  slug: "companion-tps-total",
  title: "Toughness Per Second",
  subject: "companion",
  valueType: "integer",
  valueSource: "rotation",
  formula: "ts",
} as const satisfies TemperMetric
