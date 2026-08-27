import type { MetricTemplate } from "../metric-template"

export const haTwoHandMetric = {
  id: "ha-two-hand",

  name: "HA Two Hand",
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
              { type: "constant", value: 0.071429 },
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
              { type: "constant", value: 0.75 },
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
        ],
      },
    ],
  },
} satisfies MetricTemplate
