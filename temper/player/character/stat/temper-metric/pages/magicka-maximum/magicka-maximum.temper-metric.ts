import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const magickaMaximum = {
  id: "01a0de67-c00b-7046-b8dc-67c5247d787c",
  type: "page-type/temper-metric",
  slug: "magicka-maximum",
  title: "Max Magicka",
  category: "base",
  valueType: "integer",
  polarity: "higher-is-better",
  esoStatConstantName: "STAT_MAGICKA_MAX",
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-09-26T15:48:56.459Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
