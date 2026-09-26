import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const damageDoneShock = {
  id: "01a0de67-c009-7173-8df3-9f0403f2cef2",
  type: "page-type/temper-metric",
  slug: "damage-done-shock",
  title: "Damage Done (Shock)",
  category: "advanced",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_SHOCK_DAMAGE",
  esoStatValuePart: "percent",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
