import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const damageTakenFall = {
  id: "01a0de67-c009-7926-86db-7f4ce85a7e56",
  type: "page-type/temper-metric",
  slug: "damage-taken-fall",
  title: "Damage Taken (Fall)",
  valueType: "fractional-change",
  polarity: "lower-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
