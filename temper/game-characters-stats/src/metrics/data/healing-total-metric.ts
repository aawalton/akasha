import type { MetricTemplate } from "../metric-template"

export const healingTotalMetric = {
  id: "healing-total",

  name: "Healing Total",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "add",
    operands: [
      {
        type: "multiply",
        operands: [
          {
            type: "add",
            operands: [
              { type: "constant", value: 1 },
              { type: "metric-refs", metricIds: ["healing-done-base"] },
            ],
          },
          {
            type: "add",
            operands: [
              { type: "constant", value: 1 },
              { type: "metric-refs", metricIds: ["healing-taken-base"] },
            ],
          },
          {
            type: "add",
            operands: [
              { type: "constant", value: 1 },
              { type: "metric-refs", metricIds: ["healing-received-base"] },
            ],
          },
        ],
      },
      { type: "constant", value: -1 },
    ],
  },
} satisfies MetricTemplate
