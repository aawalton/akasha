import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const movementWalkSpeed = {
  id: "01a0de67-c00b-7724-9894-7d4b5127da10",
  type: "page-type/temper-metric",
  slug: "movement-walk-speed",
  title: "Walk Speed",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
