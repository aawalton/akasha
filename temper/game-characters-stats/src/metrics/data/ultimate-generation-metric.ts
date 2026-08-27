import type { MetricTemplate } from "../metric-template"

export const ultimateGenerationMetric = {
  id: "ultimate-generation",
  fullyImplemented: true,

  name: "Ultimate Generation",
  valueType: "integer",
  polarity: "higher-is-better",
  formula: {
    type: "add",
    operands: [
      {
        type: "sum",
        effectType: "conditional-chance",
      },
    ],
  },
} satisfies MetricTemplate
