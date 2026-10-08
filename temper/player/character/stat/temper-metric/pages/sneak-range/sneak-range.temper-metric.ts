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
  createdAt: "2026-09-26T15:48:56.460Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
