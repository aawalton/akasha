import type { MetricTemplate } from "../metric-template"

export const breakFreeCostMetric = {
  id: "break-free-cost",

  name: "Break Free Cost",
  category: "advanced",
  esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_CC_BREAK_COST",
  esoStatValuePart: "flat",
  valueType: "integer",
  polarity: "lower-is-better",
  fullyImplemented: true,
  formula: {
    type: "multiply",
    operands: [
      { type: "sum", effectType: "integer" },
      { type: "product", effectType: "fractional-change" },
    ],
  },
} satisfies MetricTemplate
