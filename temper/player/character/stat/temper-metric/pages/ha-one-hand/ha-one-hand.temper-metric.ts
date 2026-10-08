import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const haOneHand = {
  id: "01a0de67-c009-79b5-93d5-9feb1674866b",
  type: "page-type/temper-metric",
  slug: "ha-one-hand",
  title: "HA One Hand",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-09-26T15:48:56.457Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
