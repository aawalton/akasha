import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const companionSpsTotal = {
  id: "01a0df07-1cd5-7704-a301-5b787b1f4663",
  type: "page-type/temper-metric",
  slug: "companion-sps-total",
  title: "Shielding Per Second",
  subject: "companion",
  valueType: "integer",
  valueSource: "rotation",
  formula: "ts",
} as const satisfies TemperMetric
