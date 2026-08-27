import type { MetricTemplate } from "../metric-template"

export const bashCostMetric = {
  id: "bash-cost",
  fullyImplemented: true,

  name: "Bash Cost",
  category: "advanced",
  esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_BASH_COST",
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
          { type: "sum", categories: ["champion-points"], effectType: "fractional-change" },
        ],
      },
      {
        type: "add",
        operands: [
          { type: "constant", value: 1 },
          { type: "sum", categories: ["skills"], effectType: "fractional-change" },
        ],
      },
      {
        type: "add",
        operands: [
          { type: "constant", value: 1 },
          { type: "sum", categories: ["sets"], effectType: "fractional-change" },
        ],
      },
    ],
  },
} satisfies MetricTemplate
