import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const goldGain = {
  id: "01a0de67-c009-7015-9629-8dbbbc95af23",
  type: "page-type/temper-metric",
  slug: "gold-gain",
  title: "Gold Gain",
  category: "advanced",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_COIN_BONUS",
  esoStatValuePart: "percent",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
