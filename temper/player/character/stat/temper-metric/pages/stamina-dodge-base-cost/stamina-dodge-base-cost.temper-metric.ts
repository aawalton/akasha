import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const staminaDodgeBaseCost = {
  id: "01a15b08-aee1-7f56-9522-c2e5df19505c",
  type: "page-type/temper-metric",
  slug: "stamina-dodge-base-cost",
  title: "Base Dodge Cost",
  valueType: "integer",
  polarity: "lower-is-better",
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-10-20T20:37:38.144Z",
  updatedAt: "2026-10-20T20:37:38.144Z",
} as const satisfies TemperMetric
