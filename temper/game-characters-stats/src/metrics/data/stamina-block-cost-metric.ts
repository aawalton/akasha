import type { MetricTemplate } from "../metric-template"

export const staminaBlockCostMetric = {
  id: "stamina-block-cost",
  fullyImplemented: true,

  name: "Block Cost",
  category: "advanced",
  esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_BLOCK_COST",
  esoStatValuePart: "flat",
  valueType: "integer",
  polarity: "lower-is-better",
  formula: {
    type: "multiply",
    operands: [
      { type: "sum", effectType: "integer" },
      {
        type: "add",
        operands: [
          { type: "constant", value: 1 },
          { type: "sum", effectType: "fractional-change" },
        ],
      },
    ],
  },
} satisfies MetricTemplate
