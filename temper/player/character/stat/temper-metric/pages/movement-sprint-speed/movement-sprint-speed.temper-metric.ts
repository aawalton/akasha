import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const movementSprintSpeed = {
  id: "01a0de67-c00b-74b6-8d56-83fdcab3849f",
  type: "page-type/temper-metric",
  slug: "movement-sprint-speed",
  title: "Sprint Speed",
  category: "advanced",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_SPRINT_SPEED",
  esoStatValuePart: "percent",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
