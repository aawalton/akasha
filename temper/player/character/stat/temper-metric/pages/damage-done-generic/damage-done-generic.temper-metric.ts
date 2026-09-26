import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const damageDoneGeneric = {
  id: "01a0de67-c008-7de5-88f2-1b1226f1c415",
  type: "page-type/temper-metric",
  slug: "damage-done-generic",
  title: "Damage Done (Generic)",
  category: "advanced",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_GENERIC_DAMAGE",
  esoStatValuePart: "percent",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
