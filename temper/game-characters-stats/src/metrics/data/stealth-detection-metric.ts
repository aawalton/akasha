import type { MetricTemplate } from "../metric-template"

export const stealthDetectionMetric = {
  id: "stealth-detection",

  name: "Stealth Detection Radius",
  valueType: "number-per-second",
  polarity: "higher-is-better",
  formula: {
    type: "multiply",
    operands: [
      {
        type: "max",
        operands: [
          { type: "constant", value: 0 },
          {
            type: "add",
            operands: [
              { type: "constant", value: 6.5 },
              { type: "sum", effectType: "integer" },
            ],
          },
        ],
      },
      { type: "product", effectType: "fractional-change" },
    ],
  },
  fullyImplemented: true,
} satisfies MetricTemplate
