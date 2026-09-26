import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const companionDpsTotal = {
  id: "01a0df07-1cd5-7188-bed8-5522083d838a",
  type: "page-type/temper-metric",
  slug: "companion-dps-total",
  title: "Damage Per Second",
  subject: "companion",
  valueType: "integer",
  valueSource: "rotation",
  formula: "ts",
} as const satisfies TemperMetric
