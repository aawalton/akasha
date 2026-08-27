import type { MetricTemplate } from "../metric-template"

export const hemorrhagingDamageMetric = {
  id: "hemorrhaging-damage",

  name: "Hemorrhaging Damage",
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
              { type: "constant", value: 0.015 },
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
              { type: "constant", value: 0.1575 },
              {
                type: "max",
                operands: [
                  { type: "metric-refs", metricIds: ["status-bleed-spell-damage"] },
                  { type: "metric-refs", metricIds: ["status-bleed-weapon-damage"] },
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
          { type: "metric-refs", metricIds: ["damage-done-bleed"] },
          { type: "metric-refs", metricIds: ["damage-done-dot"] },
          { type: "metric-refs", metricIds: ["damage-done-single-target"] },
          { type: "metric-refs", metricIds: ["damage-done-base"] },
        ],
      },
    ],
  },
} satisfies MetricTemplate
