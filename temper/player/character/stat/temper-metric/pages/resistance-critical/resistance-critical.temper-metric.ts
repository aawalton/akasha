import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const resistanceCritical = {
  id: "01a0de67-c00b-7808-bbbf-e0911f0ea7ef",
  type: "page-type/temper-metric",
  slug: "resistance-critical",
  title: "Critical Resistance",
  category: "base",
  valueType: "rating",
  polarity: "higher-is-better",
  esoStatConstantName: "STAT_CRITICAL_RESISTANCE",
  divisor: 6600,
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
