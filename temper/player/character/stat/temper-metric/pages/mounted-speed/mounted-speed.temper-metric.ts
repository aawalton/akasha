import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const mountedSpeed = {
  id: "01a0de67-c00b-70ee-92ca-0bdde102d9c5",
  type: "page-type/temper-metric",
  slug: "mounted-speed",
  title: "Mounted Speed",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
