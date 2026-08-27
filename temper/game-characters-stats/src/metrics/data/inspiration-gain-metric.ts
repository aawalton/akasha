import type { MetricTemplate } from "../metric-template"

export const inspirationGainMetric = {
  id: "inspiration-gain",

  name: "Inspiration Gain",
  category: "advanced",
  esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_INSPIRATION_BONUS",
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
