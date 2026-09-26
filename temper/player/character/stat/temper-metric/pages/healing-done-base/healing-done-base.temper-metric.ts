import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const healingDoneBase = {
  id: "01a0de67-c00a-7641-8236-5ce09ba45161",
  type: "page-type/temper-metric",
  slug: "healing-done-base",
  title: "Healing Done",
  category: "advanced",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_HEALING_DONE_BONUSES",
  esoStatValuePart: "percent",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
