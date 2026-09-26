import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const damageDoneDisease = {
  id: "01a0de67-c008-7c00-8099-688e4074abb8",
  type: "page-type/temper-metric",
  slug: "damage-done-disease",
  title: "Damage Done (Disease)",
  category: "advanced",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_DISEASE_DAMAGE",
  esoStatValuePart: "percent",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
