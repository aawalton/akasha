import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const laOneHand = {
  id: "01a0de67-c00a-7175-bb1b-9feac086dbbb",
  type: "page-type/temper-metric",
  slug: "la-one-hand",
  title: "LA One Hand",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-09-26T15:48:56.458Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
