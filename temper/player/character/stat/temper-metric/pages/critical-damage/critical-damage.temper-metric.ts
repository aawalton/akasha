import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const criticalDamage = {
  id: "01a0de67-c008-7bff-8008-a0a811a2a04b",
  type: "page-type/temper-metric",
  slug: "critical-damage",
  title: "Critical Damage",
  category: "advanced",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_CRITICAL_DAMAGE",
  esoStatValuePart: "percent",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
