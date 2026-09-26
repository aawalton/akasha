import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const companionHpsTotal = {
  id: "01a0df07-1cd5-7455-8dd2-698336da7985",
  type: "page-type/temper-metric",
  slug: "companion-hps-total",
  title: "Healing Per Second",
  subject: "companion",
  valueType: "integer",
  valueSource: "rotation",
  formula: "ts",
} as const satisfies TemperMetric
