import type { MetricTemplate } from "../metric-template"

export const penetrationSpellMetric = {
  id: "penetration-spell",

  name: "Spell Penetration",
  category: "base",
  esoStatConstantName: "STAT_SPELL_PENETRATION",
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
