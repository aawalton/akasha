import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const resurrectSpeed = {
  id: "01a0de67-c00c-72e3-99da-20b88220adea",
  type: "page-type/temper-metric",
  slug: "resurrect-speed",
  title: "Resurrect Time",
  valueType: "number-per-second",
  polarity: "lower-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
