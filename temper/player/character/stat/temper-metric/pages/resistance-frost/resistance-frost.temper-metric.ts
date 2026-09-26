import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const resistanceFrost = {
  id: "01a0de67-c00b-78d7-9c88-3ec81184d691",
  type: "page-type/temper-metric",
  slug: "resistance-frost",
  title: "Frost Resistance",
  category: "base",
  valueType: "rating",
  polarity: "higher-is-better",
  esoStatConstantName: "STAT_DAMAGE_RESIST_COLD",
  divisor: 66000,
  cap: 0.5,
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
