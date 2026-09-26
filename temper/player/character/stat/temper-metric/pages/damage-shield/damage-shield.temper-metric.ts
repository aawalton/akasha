import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const damageShield = {
  id: "01a0de67-c009-73c9-94a0-03674fcfad9d",
  type: "page-type/temper-metric",
  slug: "damage-shield",
  title: "Damage Shield",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
