import type { MetricTemplate } from "../metric-template"

export const targetSpellDebuffMetric = {
  id: "target-spell-debuff",

  name: "Target Spell Debuff",
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
