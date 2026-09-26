import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const damageDoneMagic = {
  id: "01a0de67-c008-7181-8f50-8e907dd90948",
  type: "page-type/temper-metric",
  slug: "damage-done-magic",
  title: "Damage Done (Magic)",
  category: "advanced",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_MAGIC_DAMAGE",
  esoStatValuePart: "percent",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
