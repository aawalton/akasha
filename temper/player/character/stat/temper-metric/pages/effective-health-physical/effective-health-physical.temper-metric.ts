import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const effectiveHealthPhysical = {
  id: "01a0de67-c009-702f-af16-ea23dd6fd013",
  type: "page-type/temper-metric",
  slug: "effective-health-physical",
  title: "Effective Health (Physical)",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
