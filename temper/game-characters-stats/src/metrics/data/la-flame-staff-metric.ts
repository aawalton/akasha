import type { MetricTemplate } from "../metric-template"

export const laFlameStaffMetric = {
  id: "la-flame-staff",

  name: "LA Flame Staff",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "multiply",
    operands: [
      {
        type: "min",
        operands: [
          {
            type: "add",
            operands: [
              {
                type: "floor-multiply",
                operands: [
                  { type: "constant", value: 0.045 },
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
                  { type: "constant", value: 0.4725 },
                  {
                    type: "max",
                    operands: [
                      { type: "metric-refs", metricIds: ["la-flame-spell-damage"] },
                      { type: "metric-refs", metricIds: ["la-flame-weapon-damage"] },
                    ],
                  },
                ],
              },
            ],
          },
          { type: "constant", value: 3465 },
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
          { type: "metric-refs", metricIds: ["damage-done-flame"] },
          { type: "metric-refs", metricIds: ["damage-done-direct"] },
          { type: "metric-refs", metricIds: ["damage-done-single-target"] },
          { type: "metric-refs", metricIds: ["damage-done-base"] },
        ],
      },
    ],
  },
} satisfies MetricTemplate
