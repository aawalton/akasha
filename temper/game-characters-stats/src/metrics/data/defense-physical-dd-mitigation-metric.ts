import type { MetricTemplate } from "../metric-template"

export const defensePhysicalDdMitigationMetric = {
  id: "defense-physical-dd-mitigation",

  name: "Defense Physical Direct Mitigation",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "multiply",
    operands: [
      {
        type: "add",
        operands: [
          { type: "constant", value: 1 },
          { type: "metric-refs", metricIds: ["damage-taken-direct"] },
        ],
      },
      {
        type: "add",
        operands: [
          { type: "constant", value: 1 },
          {
            type: "multiply",
            operands: [
              { type: "constant", value: -1 },
              { type: "metric-refs", metricIds: ["defense-physical-mitigation"] },
            ],
          },
        ],
      },
    ],
  },
} satisfies MetricTemplate
