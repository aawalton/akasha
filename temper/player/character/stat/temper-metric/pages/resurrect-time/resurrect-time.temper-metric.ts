import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const resurrectTime = {
  id: "01a0de67-c00c-7a07-bfc5-1f1e55cda5be",
  type: "page-type/temper-metric",
  slug: "resurrect-time",
  title: "Resurrect Time",
  valueType: "number-per-second",
  polarity: "lower-is-better",
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-09-26T15:48:56.460Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
