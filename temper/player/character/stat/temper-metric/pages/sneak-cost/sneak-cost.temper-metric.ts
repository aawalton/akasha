import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const sneakCost = {
  id: "01a0de67-c00c-7473-84d5-e6ba723a5a7b",
  type: "page-type/temper-metric",
  slug: "sneak-cost",
  title: "Sneak Cost",
  category: "advanced",
  valueType: "integer",
  polarity: "lower-is-better",
  esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_SNEAK_COST",
  esoStatValuePart: "flat",
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-09-26T15:48:56.460Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
