import type { MetricTemplate } from "../metric-template"

export const criticalDamageMetric = {
  id: "critical-damage",

  name: "Critical Damage",
  category: "advanced",
  esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_CRITICAL_DAMAGE",
  esoStatValuePart: "percent",
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
