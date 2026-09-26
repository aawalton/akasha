import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const damageTakenFromArea = {
  id: "01a0de67-c009-740a-91f7-d3d3cec06d93",
  type: "page-type/temper-metric",
  slug: "damage-taken-from-area",
  title: "Damage Taken from Area",
  valueType: "fractional-change",
  polarity: "lower-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
