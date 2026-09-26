import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const resistancePhysical = {
  id: "01a0de67-c00c-7c38-9f65-2b4c515ab229",
  type: "page-type/temper-metric",
  slug: "resistance-physical",
  title: "Physical Resistance",
  category: "base",
  valueType: "rating",
  polarity: "higher-is-better",
  esoStatConstantName: "STAT_PHYSICAL_RESIST",
  divisor: 66000,
  cap: 0.5,
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
