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
  createdAt: "2026-09-26T15:48:56.456Z",
  updatedAt: "2026-09-26T16:20:34.000Z",
} as const satisfies TemperMetric
