import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const resistance = {
  id: "01a0de67-c00c-7488-ab3b-3e79898d8888",
  type: "page-type/temper-metric",
  slug: "resistance",
  title: "Armor",
  category: "base",
  valueType: "rating",
  polarity: "higher-is-better",
  esoStatConstantName: "STAT_ARMOR_RATING",
  divisor: 66000,
  cap: 0.5,
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
