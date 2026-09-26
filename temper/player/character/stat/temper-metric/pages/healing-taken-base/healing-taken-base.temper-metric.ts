import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const healingTakenBase = {
  id: "01a0de67-c00a-7577-920c-cb138d03763a",
  type: "page-type/temper-metric",
  slug: "healing-taken-base",
  title: "Healing Taken",
  category: "advanced",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_HEALING_TAKEN_BONUSES",
  esoStatValuePart: "percent",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
