import type { MetricTemplate } from "../metric-template"

export const poisonedDamageMetric = {
  id: "poisoned-damage",

  name: "Poisoned Damage",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "multiply",
    operands: [
      {
        type: "add",
        operands: [
          {
            type: "floor-multiply",
            operands: [
              { type: "constant", value: 0.0144 },
              {
                type: "max",
                operands: [
                  { type: "metric-refs", metricIds: ["magicka-maximum"] },
                  { type: "metric-refs", metricIds: ["stamina-maximum"] },
                ],
              },
            ],
          },
          {
            type: "floor-multiply",
            operands: [
              { type: "constant", value: 0.1512 },
              {
                type: "max",
                operands: [
                  { type: "metric-refs", metricIds: ["status-poison-spell-damage"] },
                  { type: "metric-refs", metricIds: ["status-poison-weapon-damage"] },
                ],
              },
            ],
          },
        ],
      },
      {
        type: "add",
        operands: [
          { type: "constant", value: 1 },
          { type: "metric-refs", metricIds: ["damage-done-poison"] },
          { type: "metric-refs", metricIds: ["damage-done-dot"] },
          { type: "metric-refs", metricIds: ["damage-done-single-target"] },
          { type: "metric-refs", metricIds: ["damage-done-base"] },
        ],
      },
    ],
  },
} satisfies MetricTemplate
