import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const damageTakenLa = {
  id: "01a0de67-c009-7202-9900-f62485e81fd3",
  type: "page-type/temper-metric",
  slug: "damage-taken-la",
  title: "Damage Taken (Light Attack)",
  valueType: "fractional-change",
  polarity: "lower-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
