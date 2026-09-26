import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const experienceGain = {
  id: "01a0de67-c009-74d8-8ea9-ea17b90ceb99",
  type: "page-type/temper-metric",
  slug: "experience-gain",
  title: "Experience Gain",
  category: "advanced",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_ALL_XP",
  esoStatValuePart: "percent",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
