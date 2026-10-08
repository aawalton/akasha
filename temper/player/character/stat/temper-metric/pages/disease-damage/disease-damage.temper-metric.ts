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
  createdAt: "2026-09-26T15:48:56.457Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
