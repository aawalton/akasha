import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const resistanceEarth = {
  id: "01a0de67-c00b-709a-ad70-563afb34e31c",
  type: "page-type/temper-metric",
  slug: "resistance-earth",
  title: "Earth Resistance",
  category: "base",
  valueType: "rating",
  polarity: "higher-is-better",
  esoStatConstantName: "STAT_DAMAGE_RESIST_EARTH",
  divisor: 66000,
  cap: 0.5,
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
