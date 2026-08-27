import type { MetricTemplate } from "../metric-template"

export const alliancePointsGainMetric = {
  id: "alliance-points-gain",

  name: "Alliance Points Gain",
  category: "advanced",
  esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_ALLIANCE_POINTS_BONUS",
  esoStatValuePart: "percent",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  formula: {
    type: "add",
    operands: [
      {
        type: "sum",
        effectType: "fractional-change",
      },
    ],
  },
  fullyImplemented: true,
} satisfies MetricTemplate
