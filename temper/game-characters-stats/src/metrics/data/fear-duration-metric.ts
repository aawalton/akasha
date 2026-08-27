import type { MetricTemplate } from "../metric-template"

export const fearDurationMetric = {
  id: "fear-duration",

  name: "Fear Duration",
  valueType: "number-per-second",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "multiply",
    operands: [
      { type: "constant", value: 4 },
      {
        type: "add",
        operands: [
          { type: "constant", value: 1 },
          { type: "sum", categories: ["champion-points"], effectType: "fractional-change" },
        ],
      },
      {
        type: "add",
        operands: [
          { type: "constant", value: 1 },
          { type: "sum", categories: ["sets"], effectType: "fractional-change" },
        ],
      },
    ],
  },
} satisfies MetricTemplate
