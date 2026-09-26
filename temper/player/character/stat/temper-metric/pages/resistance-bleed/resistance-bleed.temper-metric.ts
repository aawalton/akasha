import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const resistanceBleed = {
  id: "01a0de67-c00b-7d45-bc00-08d63dd2395d",
  type: "page-type/temper-metric",
  slug: "resistance-bleed",
  title: "Bleed Resistance",
  category: "base",
  valueType: "rating",
  polarity: "higher-is-better",
  esoStatConstantName: "STAT_DAMAGE_RESIST_BLEED",
  divisor: 66000,
  cap: 0.5,
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
