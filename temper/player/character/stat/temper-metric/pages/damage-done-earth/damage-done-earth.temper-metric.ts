import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const damageDoneEarth = {
  id: "01a0de67-c008-75df-bf6a-ea8e6b0d7270",
  type: "page-type/temper-metric",
  slug: "damage-done-earth",
  title: "Damage Done (Earth)",
  category: "advanced",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_EARTH_DAMAGE",
  esoStatValuePart: "percent",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
