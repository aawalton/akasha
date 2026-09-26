import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const damageDoneBleed = {
  id: "01a0de67-c008-79bf-88bf-4167380befa9",
  type: "page-type/temper-metric",
  slug: "damage-done-bleed",
  title: "Damage Done (Bleed)",
  category: "advanced",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_BLEED_DAMAGE",
  esoStatValuePart: "percent",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
