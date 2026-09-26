import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const diseaseDamage = {
  id: "01a0de67-c009-7d9a-836d-2ea3d942acfa",
  type: "page-type/temper-metric",
  slug: "disease-damage",
  title: "Disease Damage",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
