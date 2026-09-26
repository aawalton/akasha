import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const criticalRating = {
  id: "01a0de67-c008-7607-b503-6980ac55de87",
  type: "page-type/temper-metric",
  slug: "critical-rating",
  title: "Critical Rating",
  category: "base",
  valueType: "rating",
  polarity: "higher-is-better",
  esoStatConstantName: "STAT_CRITICAL_CHANCE",
  divisor: 21912,
  cap: 1,
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
