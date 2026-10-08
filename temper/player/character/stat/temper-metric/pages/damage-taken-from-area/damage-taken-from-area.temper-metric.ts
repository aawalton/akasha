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
  createdAt: "2026-09-26T15:48:56.457Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
