import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const mountedWalkSpeed = {
  id: "01a0de67-c00b-7969-be77-35fc2d6d3aa5",
  type: "page-type/temper-metric",
  slug: "mounted-walk-speed",
  title: "Mounted Walk Speed",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-09-26T15:48:56.459Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
