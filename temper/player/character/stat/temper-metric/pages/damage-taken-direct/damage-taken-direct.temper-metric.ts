import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const damageTakenDirect = {
  id: "01a0de67-c009-71c4-ba03-07f25a1a1537",
  type: "page-type/temper-metric",
  slug: "damage-taken-direct",
  title: "Direct Damage Taken",
  valueType: "fractional-change",
  polarity: "lower-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
