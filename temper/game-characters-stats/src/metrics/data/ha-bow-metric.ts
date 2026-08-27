import type { MetricTemplate } from "../metric-template"

export const haBowMetric = {
  id: "ha-bow",

  name: "HA Bow",
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
              { type: "constant", value: 0.095238 },
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
              { type: "constant", value: 1.0 },
              {
                type: "max",
                operands: [
                  { type: "metric-refs", metricIds: ["ha-physical-weapon-damage"] },
                  { type: "metric-refs", metricIds: ["ha-physical-spell-damage"] },
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
          {
            type: "sum",
            effectType: "fractional-change",
          },
          { type: "metric-refs", metricIds: ["damage-done-physical"] },
          { type: "metric-refs", metricIds: ["damage-done-direct"] },
          { type: "metric-refs", metricIds: ["damage-done-single-target"] },
          { type: "metric-refs", metricIds: ["damage-done-base"] },
          { type: "metric-refs", metricIds: ["damage-done-bow"] },
        ],
      },
    ],
  },
} satisfies MetricTemplate
