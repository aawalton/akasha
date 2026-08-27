import type { MetricTemplate } from "../metric-template"

export const defenseSpellAoeMitigationMetric = {
  id: "defense-spell-aoe-mitigation",

  name: "Defense Spell AOE Mitigation",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "multiply",
    operands: [
      {
        type: "add",
        operands: [
          { type: "constant", value: 1 },
          { type: "metric-refs", metricIds: ["damage-taken-from-area"] },
        ],
      },
      {
        type: "add",
        operands: [
          { type: "constant", value: 1 },
          {
            type: "multiply",
            operands: [
              { type: "constant", value: -1 },
              { type: "metric-refs", metricIds: ["defense-spell-mitigation"] },
            ],
          },
        ],
      },
    ],
  },
} satisfies MetricTemplate
