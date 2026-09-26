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
} as const satisfies TemperMetric
