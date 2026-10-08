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
  createdAt: "2026-09-26T15:48:56.455Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
