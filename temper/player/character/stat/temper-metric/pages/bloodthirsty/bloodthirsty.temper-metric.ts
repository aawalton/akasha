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
} as const satisfies TemperMetric
