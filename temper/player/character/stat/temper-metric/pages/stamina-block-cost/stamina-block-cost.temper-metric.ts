import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const staminaBlockCost = {
  id: "01a0de67-c00c-792a-987f-8ee256717b51",
  type: "page-type/temper-metric",
  slug: "stamina-block-cost",
  title: "Block Cost",
  category: "advanced",
  valueType: "integer",
  polarity: "lower-is-better",
  esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_BLOCK_COST",
  esoStatValuePart: "flat",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
