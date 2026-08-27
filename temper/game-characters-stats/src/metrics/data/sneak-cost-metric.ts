import type { MetricTemplate } from "../metric-template"

export const sneakCostMetric = {
  id: "sneak-cost",

  name: "Sneak Cost",
  category: "advanced",
  esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_SNEAK_COST",
  esoStatValuePart: "flat",
  valueType: "integer",
  polarity: "lower-is-better",
  fullyImplemented: true,
  formula: {
    type: "multiply",
    operands: [
      { type: "constant", value: 105 },
      { type: "product", effectType: "fractional-change" },
    ],
  },
} satisfies MetricTemplate
