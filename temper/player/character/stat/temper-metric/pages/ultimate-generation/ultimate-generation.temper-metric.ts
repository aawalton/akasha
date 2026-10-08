import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const ultimateGeneration = {
  id: "01a0de67-c00d-7015-b568-cbdcd1186cad",
  type: "page-type/temper-metric",
  slug: "ultimate-generation",
  title: "Ultimate Generation",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-09-26T15:48:56.461Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
