import type { MetricTemplate } from "../metric-template"

export const bashDamageMetric = {
  id: "bash-damage",

  name: "Bash Damage",
  category: "advanced",
  esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_BASH_DAMAGE",
  esoStatValuePart: "flat",
  valueType: "integer",
  polarity: "higher-is-better",
  formula: {
    type: "floor-multiply",
    operands: [
      {
        type: "add",
        operands: [
          {
            type: "floor",
            operand: {
              type: "multiply",
              operands: [
                {
                  type: "add",
                  operands: [
                    { type: "metric-refs", metricIds: ["resistance-spell"] },
                    { type: "metric-refs", metricIds: ["resistance-physical"] },
                  ],
                },
                { type: "constant", value: 0.01125 },
              ],
            },
          },
          { type: "constant", value: 1 },
          { type: "sum", effectType: "integer" },
        ],
      },
      {
        type: "multiply",
        operands: [
          {
            type: "add",
            operands: [
              { type: "constant", value: 1 },
              {
                type: "metric-refs",
                metricIds: [
                  "damage-done-physical",
                  "damage-done-generic",
                  "damage-done-direct",
                  "damage-done-single-target",
                ],
              },
            ],
          },
          {
            type: "product",
            effectType: "fractional-change",
          },
        ],
      },
    ],
  },
  fullyImplemented: true,
} satisfies MetricTemplate
