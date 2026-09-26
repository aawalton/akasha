import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const healthRestore = {
  id: "01a0de67-c00a-7127-b12c-10cb114fab38",
  type: "page-type/temper-metric",
  slug: "health-restore",
  title: "Restore Health",
  valueType: "number-per-second",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
