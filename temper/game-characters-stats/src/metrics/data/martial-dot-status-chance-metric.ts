import type { MetricTemplate } from "../metric-template"

export const martialDotStatusChanceMetric = {
  id: "martial-dot-status-chance",

  name: "Martial Status Chance (DOT)",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "multiply",
    operands: [
      { type: "constant", value: 0.03 },
      {
        type: "add",
        operands: [
          { type: "constant", value: 1 },
          { type: "sum", effectType: "fractional-change" },
        ],
      },
    ],
  },
} satisfies MetricTemplate
