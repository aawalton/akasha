import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const poisonedDuration = {
  id: "01a0de67-c00b-7df1-bb3e-558a25675128",
  type: "page-type/temper-metric",
  slug: "poisoned-duration",
  title: "Poisoned Duration",
  valueType: "number-per-second",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
