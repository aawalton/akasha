import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const blockCostReduction = {
  id: "01a0de67-c008-7d81-a000-a108b38c19e0",
  type: "page-type/temper-metric",
  slug: "block-cost-reduction",
  title: "Block Cost Reduction",
  category: "advanced",
  valueType: "fractional-change",
  polarity: "lower-is-better",
  esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_BLOCK_COST",
  esoStatValuePart: "percent",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
