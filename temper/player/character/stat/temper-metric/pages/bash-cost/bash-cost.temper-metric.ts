import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const bashCost = {
  id: "01a0de67-c007-791f-8c1c-1cd9b9b9fa34",
  type: "page-type/temper-metric",
  slug: "bash-cost",
  title: "Bash Cost",
  category: "advanced",
  valueType: "integer",
  polarity: "lower-is-better",
  esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_BASH_COST",
  esoStatValuePart: "flat",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
