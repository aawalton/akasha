import type { MetricTemplate } from "../metric-template"

export const defensePhysicalAoeMitigationMetric = {
  id: "defense-physical-aoe-mitigation",

  name: "Defense Physical AOE Mitigation",
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
          { type: "metric-refs", metricIds: ["damage-taken-from-area"] },
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
