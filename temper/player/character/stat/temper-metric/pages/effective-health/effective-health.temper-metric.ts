import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const effectiveHealth = {
  id: "01a0de67-c009-7459-b795-c6f8aad003a4",
  type: "page-type/temper-metric",
  slug: "effective-health",
  title: "Effective Health",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
