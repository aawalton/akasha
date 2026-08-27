import type { MetricTemplate } from "../metric-template"

export const sunderedDamageMetric = {
  id: "sundered-damage",

  name: "Sundered Damage",
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
              { type: "constant", value: 0.008 },
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
              { type: "constant", value: 0.084 },
              {
                type: "max",
                operands: [
                  { type: "metric-refs", metricIds: ["status-physical-spell-damage"] },
                  { type: "metric-refs", metricIds: ["status-physical-weapon-damage"] },
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
          { type: "metric-refs", metricIds: ["damage-done-physical"] },
          { type: "metric-refs", metricIds: ["damage-done-direct"] },
          { type: "metric-refs", metricIds: ["damage-done-single-target"] },
          { type: "metric-refs", metricIds: ["damage-done-base"] },
        ],
      },
    ],
  },
} satisfies MetricTemplate
