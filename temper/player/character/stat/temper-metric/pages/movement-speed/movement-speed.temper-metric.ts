import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const movementSpeed = {
  id: "01a0de67-c00b-723a-b09e-a5b009073a61",
  type: "page-type/temper-metric",
  slug: "movement-speed",
  title: "Movement Speed",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
