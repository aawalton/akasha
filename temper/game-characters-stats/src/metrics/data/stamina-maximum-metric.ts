import type { MetricTemplate } from "../metric-template"

export const staminaMaximumMetric = {
  id: "stamina-maximum",
  fullyImplemented: true,

  name: "Max Stamina",
  category: "base",
  esoStatConstantName: "STAT_STAMINA_MAX",
  valueType: "integer",
  polarity: "higher-is-better",
  formula: {
    type: "multiply",
    operands: [
      { type: "sum", effectType: "integer" },
      { type: "product", effectType: "fractional-change" },
    ],
  },
} satisfies MetricTemplate
