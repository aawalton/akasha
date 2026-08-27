import type { MetricTemplate } from "../metric-template"

export const experienceGainMetric = {
  id: "experience-gain",

  name: "Experience Gain",
  category: "advanced",
  esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_ALL_XP",
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
