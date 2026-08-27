import type { MetricTemplate } from "../metric-template"

export const staminaSprintCostMetric = {
  id: "stamina-sprint-cost",
  fullyImplemented: true,

  name: "Sprint Cost",
  category: "advanced",
  esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_SPRINT_COST",
  esoStatValuePart: "flat",
  valueType: "integer",
  polarity: "lower-is-better",
  formula: {
    type: "multiply",
    operands: [
      { type: "sum", effectType: "integer" },
      { type: "product", categories: ["skills"], effectType: "fractional-change" },
      {
        type: "add",
        operands: [
          { type: "constant", value: 1 },
          { type: "sum", categories: ["armor"], effectType: "fractional-change" },
        ],
      },
    ],
  },
} satisfies MetricTemplate
