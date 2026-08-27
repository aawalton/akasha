import type { MetricTemplate } from "../metric-template"

export const constitutionMetric = {
  id: "constitution",

  name: "Constitution",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "multiply",
    operands: [
      { type: "constant", value: 108 },
      { type: "constant", value: 7 },
      {
        type: "add",
        operands: [
          { type: "constant", value: 1 },
          { type: "sum", effectType: "fractional-change" },
        ],
      },
    ],
  },
} satisfies MetricTemplate
