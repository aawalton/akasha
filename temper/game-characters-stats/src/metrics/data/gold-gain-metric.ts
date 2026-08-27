import type { MetricTemplate } from "../metric-template"

export const goldGainMetric = {
  id: "gold-gain",

  name: "Gold Gain",
  category: "advanced",
  esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_COIN_BONUS",
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
