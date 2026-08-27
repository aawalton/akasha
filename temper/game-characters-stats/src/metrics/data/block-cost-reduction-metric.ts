import type { MetricTemplate } from "../metric-template"

export const blockCostReductionMetric = {
  id: "block-cost-reduction",

  name: "Block Cost Reduction",
  category: "advanced",
  esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_BLOCK_COST",
  esoStatValuePart: "percent",
  valueType: "fractional-change",
  polarity: "lower-is-better",
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
