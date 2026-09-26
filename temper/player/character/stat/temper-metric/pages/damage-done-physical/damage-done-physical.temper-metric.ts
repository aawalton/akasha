import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const damageDonePhysical = {
  id: "01a0de67-c008-7fe3-bbb4-88425ef997f8",
  type: "page-type/temper-metric",
  slug: "damage-done-physical",
  title: "Damage Done (Physical)",
  category: "advanced",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_PHYSICAL_DAMAGE",
  esoStatValuePart: "percent",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
