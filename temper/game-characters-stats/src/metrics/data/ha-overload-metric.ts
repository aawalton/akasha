import type { MetricTemplate } from "../metric-template"

export const haOverloadMetric = {
  id: "ha-overload",

  name: "HA Overload",
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
              { type: "constant", value: 0.09 },
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
              { type: "constant", value: 0.945 },
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
          { type: "metric-refs", metricIds: ["damage-done-shock"] },
          { type: "metric-refs", metricIds: ["damage-done-aoe"] },
          { type: "metric-refs", metricIds: ["damage-done-single-target"] },
          { type: "metric-refs", metricIds: ["damage-done-base"] },
          { type: "metric-refs", metricIds: ["overload-damage"] },
        ],
      },
    ],
  },
} satisfies MetricTemplate
