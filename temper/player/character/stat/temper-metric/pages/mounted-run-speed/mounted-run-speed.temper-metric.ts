import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const mountedRunSpeed = {
  id: "01a0de67-c00b-7528-803e-3b398e7d30b0",
  type: "page-type/temper-metric",
  slug: "mounted-run-speed",
  title: "Mounted Run Speed",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
