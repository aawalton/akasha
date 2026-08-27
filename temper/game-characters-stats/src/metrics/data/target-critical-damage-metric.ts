import type { MetricTemplate } from "../metric-template"

export const targetCriticalDamageMetric = {
  id: "target-critical-damage",

  name: "Target Critical Damage",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "add",
    operands: [
      {
        type: "sum",
        effectType: "fractional-change",
      },
    ],
  },
} satisfies MetricTemplate
