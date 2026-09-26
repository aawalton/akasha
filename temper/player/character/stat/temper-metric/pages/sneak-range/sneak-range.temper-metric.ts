import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const sneakRange = {
  id: "01a0de67-c00c-7d1b-adfb-e41c673328b0",
  type: "page-type/temper-metric",
  slug: "sneak-range",
  title: "Sneak Range",
  valueType: "number-per-second",
  polarity: "lower-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
