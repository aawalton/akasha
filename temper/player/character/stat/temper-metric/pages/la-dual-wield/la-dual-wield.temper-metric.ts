import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const laDualWield = {
  id: "01a0de67-c00a-7114-8dab-073b8464b092",
  type: "page-type/temper-metric",
  slug: "la-dual-wield",
  title: "LA Dual Wield",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
