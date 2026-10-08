import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const bloodthirsty = {
  id: "01a0de67-c008-7ece-adb5-38e306d4b23f",
  type: "page-type/temper-metric",
  slug: "bloodthirsty",
  title: "Bloodthirsty",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-09-26T15:48:56.456Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
