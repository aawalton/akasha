import type { MetricTemplate } from "../metric-template"

export const targetSpellPowerMetric = {
  id: "target-spell-power",

  name: "Target Spell Power",
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
