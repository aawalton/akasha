import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const targetPhysicalDebuff = {
  id: "01a0de67-c00c-7dd3-8a59-ae9354916b7d",
  type: "page-type/temper-metric",
  slug: "target-physical-debuff",
  title: "Target Physical Debuff",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-09-26T15:48:56.460Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
