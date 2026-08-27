import type { MetricTemplate } from "../metric-template"

export const synergyEffectivenessMetric = {
  id: "synergy-effectiveness",

  name: "Synergy Effectiveness",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  formula: {
    type: "add",
    operands: [
      {
        type: "sum",
        effectType: "fractional-change",
      },
    ],
  },
  fullyImplemented: true,
} satisfies MetricTemplate
