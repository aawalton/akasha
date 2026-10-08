import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const alliancePointsGain = {
  id: "01a0de67-c007-7049-ba7f-61f4ab9ca003",
  type: "page-type/temper-metric",
  slug: "alliance-points-gain",
  title: "Alliance Points Gain",
  category: "advanced",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_ALLIANCE_POINTS_BONUS",
  esoStatValuePart: "percent",
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-09-26T15:48:56.455Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
