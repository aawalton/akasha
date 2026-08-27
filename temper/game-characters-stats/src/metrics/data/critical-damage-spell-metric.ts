import type { MetricTemplate } from "../metric-template"

export const criticalDamageSpellMetric = {
  id: "critical-damage-spell",

  name: "Spell Critical Damage",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  formula: {
    type: "multiply",
    operands: [
      {
        type: "add",
        operands: [
          {
            type: "sum",
            effectType: "fractional-change",
          },
          { type: "constant", value: 0.5 },
        ],
      },
      {
        type: "add",
        operands: [{ type: "constant", value: 1 }],
      },
    ],
  },
  fullyImplemented: true,
} satisfies MetricTemplate
