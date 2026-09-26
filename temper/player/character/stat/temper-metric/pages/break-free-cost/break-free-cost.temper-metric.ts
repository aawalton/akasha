import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const breakFreeCost = {
  id: "01a0de67-c008-7e15-b90d-a3c05cc2e254",
  type: "page-type/temper-metric",
  slug: "break-free-cost",
  title: "Break Free Cost",
  category: "advanced",
  valueType: "integer",
  polarity: "lower-is-better",
  esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_CC_BREAK_COST",
  esoStatValuePart: "flat",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
