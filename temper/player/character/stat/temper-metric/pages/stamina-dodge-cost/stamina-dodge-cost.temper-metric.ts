import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const staminaDodgeCost = {
  id: "01a0de67-c00c-78e1-a101-a6f4b21ff075",
  type: "page-type/temper-metric",
  slug: "stamina-dodge-cost",
  title: "Dodge Cost",
  category: "advanced",
  valueType: "integer",
  polarity: "lower-is-better",
  esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_DODGE_COST",
  esoStatValuePart: "flat",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
