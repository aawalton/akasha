import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const targetCriticalResistance = {
  id: "01a0de67-c00c-75cf-a681-067d70409241",
  type: "page-type/temper-metric",
  slug: "target-critical-resistance",
  title: "Target Critical Resistance",
  valueType: "rating",
  polarity: "higher-is-better",
  divisor: 5000,
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
