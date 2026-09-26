import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const haOverload = {
  id: "01a0de67-c009-76e7-a242-847758e2746e",
  type: "page-type/temper-metric",
  slug: "ha-overload",
  title: "HA Overload",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
