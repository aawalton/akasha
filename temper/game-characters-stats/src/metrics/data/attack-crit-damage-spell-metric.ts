import type { MetricTemplate } from "../metric-template"

export const attackCritDamageSpellMetric = {
  id: "attack-crit-damage-spell",

  name: "Attack Spell Critical Damage",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  formula: {
    type: "add",
    operands: [
      { type: "metric-refs", metricIds: ["critical-damage-spell"] },
      {
        type: "multiply",
        operands: [
          { type: "constant", value: -1 },
          {
            type: "metric-refs",
            metricIds: ["target-critical-resistance"],
            convertRatingToChance: true,
          },
        ],
      },
    ],
  },
  fullyImplemented: true,
} satisfies MetricTemplate
