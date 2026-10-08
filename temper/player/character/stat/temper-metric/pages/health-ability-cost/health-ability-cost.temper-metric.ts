import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const healthAbilityCost = {
  id: "01a0de67-c00a-7dbc-8e2a-92123b1717a9",
  type: "page-type/temper-metric",
  slug: "health-ability-cost",
  title: "Health Ability Cost",
  valueType: "fractional-change",
  polarity: "lower-is-better",
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-09-26T15:48:56.458Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
