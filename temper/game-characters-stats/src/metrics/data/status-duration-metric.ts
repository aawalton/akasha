import type { MetricTemplate } from "../metric-template"

export const statusDurationMetric = {
  id: "status-duration",

  name: "Status Duration",
  valueType: "number-per-second",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "add",
    operands: [
      { type: "constant", value: 4.0 },
      { type: "sum", effectType: "integer" },
    ],
  },
} satisfies MetricTemplate
