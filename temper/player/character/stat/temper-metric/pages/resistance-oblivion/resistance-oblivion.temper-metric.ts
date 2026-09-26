import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const resistanceOblivion = {
  id: "01a0de67-c00c-7497-8f28-421e7a62656d",
  type: "page-type/temper-metric",
  slug: "resistance-oblivion",
  title: "Oblivion Resistance",
  category: "base",
  valueType: "rating",
  polarity: "higher-is-better",
  esoStatConstantName: "STAT_DAMAGE_RESIST_OBLIVION",
  divisor: 66000,
  cap: 0.5,
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
