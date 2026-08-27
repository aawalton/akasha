import type { MetricTemplate } from "../metric-template"

export const targetPhysicalDebuffMetric = {
  id: "target-physical-debuff",

  name: "Target Physical Debuff",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "add",
    operands: [
      {
        type: "sum",
        effectType: "integer",
      },
    ],
  },
} satisfies MetricTemplate
