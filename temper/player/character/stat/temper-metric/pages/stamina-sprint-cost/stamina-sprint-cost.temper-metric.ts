import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const staminaSprintCost = {
  id: "01a0de67-c00c-7f23-9aa6-a1c97b4ce204",
  type: "page-type/temper-metric",
  slug: "stamina-sprint-cost",
  title: "Sprint Cost",
  category: "advanced",
  valueType: "integer",
  polarity: "lower-is-better",
  esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_SPRINT_COST",
  esoStatValuePart: "flat",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
