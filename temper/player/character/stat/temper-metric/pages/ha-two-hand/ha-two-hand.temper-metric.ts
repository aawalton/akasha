import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const haTwoHand = {
  id: "01a0de67-c00a-74b2-876e-fb4afa240a0f",
  type: "page-type/temper-metric",
  slug: "ha-two-hand",
  title: "HA Two Hand",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-09-26T15:48:56.458Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
