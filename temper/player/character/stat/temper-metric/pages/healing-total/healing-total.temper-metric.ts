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
} as const satisfies TemperMetric
