import type { MetricTemplate } from "../metric-template"

export const sneakRangeMetric = {
  id: "sneak-range",

  name: "Sneak Range",
  valueType: "number-per-second",
  polarity: "lower-is-better",
  fullyImplemented: true,
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
} satisfies MetricTemplate
