import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const damageDonePoison = {
  id: "01a0de67-c009-7895-a8cf-4fa72cab6ffb",
  type: "page-type/temper-metric",
  slug: "damage-done-poison",
  title: "Damage Done (Poison)",
  category: "advanced",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_POISON_DAMAGE",
  esoStatValuePart: "percent",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
