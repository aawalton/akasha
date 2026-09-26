import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const healingReceivedBase = {
  id: "01a0de67-c00a-74c6-858d-03bfd0a8db3f",
  type: "page-type/temper-metric",
  slug: "healing-received-base",
  title: "Healing Received",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
