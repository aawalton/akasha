import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const targetEffectiveLevel = {
  id: "01a0de67-c00c-7f0e-a67e-50a9beca421d",
  type: "page-type/temper-metric",
  slug: "target-effective-level",
  title: "Target Effective Level",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
