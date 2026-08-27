import type { MetricTemplate } from "../metric-template"

export const targetResistanceSpellMetric = {
  id: "target-spell-resistance",

  name: "Target Spell Resistance",
  valueType: "integer",
  polarity: "higher-is-better",
  formula: {
    type: "add",
    operands: [
      {
        type: "sum",
        effectType: "integer",
      },
    ],
  },
  fullyImplemented: true,
} satisfies MetricTemplate
