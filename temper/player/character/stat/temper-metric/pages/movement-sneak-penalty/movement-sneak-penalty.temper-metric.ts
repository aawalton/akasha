import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const movementSneakPenalty = {
  id: "01a0de67-c00b-7bb4-a906-f53e1534f06d",
  type: "page-type/temper-metric",
  slug: "movement-sneak-penalty",
  title: "Sneak Penalty",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
