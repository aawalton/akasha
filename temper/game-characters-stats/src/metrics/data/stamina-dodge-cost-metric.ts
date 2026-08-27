import type { MetricTemplate } from "../metric-template"

export const staminaDodgeCostMetric = {
  id: "stamina-dodge-cost",
  fullyImplemented: true,

  name: "Dodge Cost",
  category: "advanced",
  esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_DODGE_COST",
  esoStatValuePart: "flat",
  valueType: "integer",
  polarity: "lower-is-better",
  formula: {
    type: "multiply",
    operands: [
      {
        type: "add",
        operands: [{ type: "sum", effectType: "integer" }],
      },
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
          { type: "constant", value: -3 },
          { type: "product", categories: ["skills"], effectType: "fractional-change" },
          { type: "product", categories: ["armor"], effectType: "fractional-change" },
          { type: "product", categories: ["sets"], effectType: "fractional-change" },
          { type: "product", categories: ["buffs"], effectType: "fractional-change" },
        ],
      },
    ],
  },
} satisfies MetricTemplate
