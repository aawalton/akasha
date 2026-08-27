import type { MetricTemplate } from "../metric-template"

export const martialAoedotStatusChanceMetric = {
  id: "martial-aoedot-status-chance",

  name: "Martial Status Chance (AOE+DOT)",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "multiply",
    operands: [
      { type: "constant", value: 0.01 },
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
