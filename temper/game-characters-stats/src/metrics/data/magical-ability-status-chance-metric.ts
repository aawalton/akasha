import type { MetricTemplate } from "../metric-template"

export const magicalAbilityStatusChanceMetric = {
  id: "magical-ability-status-chance",

  name: "Magical Status Chance (Ability)",
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
