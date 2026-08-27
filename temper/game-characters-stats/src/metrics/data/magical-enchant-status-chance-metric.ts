import type { MetricTemplate } from "../metric-template"

export const magicalEnchantStatusChanceMetric = {
  id: "magical-enchant-status-chance",

  name: "Magical Status Chance (Enchants)",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "multiply",
    operands: [
      { type: "constant", value: 0.2 },
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
