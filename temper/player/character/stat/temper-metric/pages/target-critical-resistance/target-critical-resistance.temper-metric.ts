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
  createdAt: "2026-09-26T15:48:56.460Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
