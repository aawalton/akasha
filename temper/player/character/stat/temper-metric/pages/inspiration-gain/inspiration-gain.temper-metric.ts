import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const inspirationGain = {
  id: "01a0de67-c00a-7aed-bc51-ab060dee6710",
  type: "page-type/temper-metric",
  slug: "inspiration-gain",
  title: "Inspiration Gain",
  category: "advanced",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_INSPIRATION_BONUS",
  esoStatValuePart: "percent",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
