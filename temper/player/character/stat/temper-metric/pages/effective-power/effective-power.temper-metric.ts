import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const effectivePower = {
  id: "01a0de67-c009-7e5d-8b5f-c9d2fc25ec4b",
  type: "page-type/temper-metric",
  slug: "effective-power",
  title: "Effective Power",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
