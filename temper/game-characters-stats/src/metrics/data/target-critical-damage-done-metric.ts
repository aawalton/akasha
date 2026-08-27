import type { MetricTemplate } from "../metric-template"

export const targetCriticalDamageDoneMetric = {
  id: "target-critical-damage-done",

  name: "Target Critical Damage Done",
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
