import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const resistanceDisease = {
  id: "01a0de67-c00b-77c5-b5b9-c1e7912340d9",
  type: "page-type/temper-metric",
  slug: "resistance-disease",
  title: "Disease Resistance",
  category: "base",
  valueType: "rating",
  polarity: "higher-is-better",
  esoStatConstantName: "STAT_DAMAGE_RESIST_DISEASE",
  divisor: 66000,
  cap: 0.5,
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
