import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const resistanceFlame = {
  id: "01a0de67-c00b-7532-ba9a-f9c5a59eb7cd",
  type: "page-type/temper-metric",
  slug: "resistance-flame",
  title: "Flame Resistance",
  category: "base",
  valueType: "rating",
  polarity: "higher-is-better",
  esoStatConstantName: "STAT_DAMAGE_RESIST_FIRE",
  divisor: 66000,
  cap: 0.5,
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
