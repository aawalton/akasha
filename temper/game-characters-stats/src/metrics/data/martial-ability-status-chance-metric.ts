import type { MetricTemplate } from "../metric-template"

export const martialAbilityStatusChanceMetric = {
  id: "martial-ability-status-chance",

  name: "Martial Status Chance (Ability)",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "multiply",
    operands: [
      { type: "constant", value: 0.1 },
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
