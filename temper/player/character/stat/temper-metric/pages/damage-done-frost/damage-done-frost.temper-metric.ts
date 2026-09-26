import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const damageDoneFrost = {
  id: "01a0de67-c008-7cdd-8084-5daf8ce0e2cc",
  type: "page-type/temper-metric",
  slug: "damage-done-frost",
  title: "Damage Done (Frost)",
  category: "advanced",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_COLD_DAMAGE",
  esoStatValuePart: "percent",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
