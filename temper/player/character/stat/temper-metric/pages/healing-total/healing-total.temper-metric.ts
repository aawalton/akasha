import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const healingTotal = {
  id: "01a0de67-c00a-7e05-b707-80ca73c5ff41",
  type: "page-type/temper-metric",
  slug: "healing-total",
  title: "Healing Total",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-09-26T15:48:56.458Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
