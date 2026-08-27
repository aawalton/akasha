import type { MetricTemplate } from "../metric-template"

export const effectiveHealthPhysicalMetric = {
  id: "effective-health-physical",

  name: "Effective Health (Physical)",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "divide",
    operands: [
      { type: "metric-refs", metricIds: ["health-maximum"] },
      {
        type: "multiply",
        operands: [
          {
            type: "add",
            operands: [
              { type: "constant", value: 1 },
              {
                type: "multiply",
                operands: [
                  { type: "constant", value: -1 },
                  {
                    type: "min",
                    operands: [
                      { type: "constant", value: 0.5 },
                      {
                        type: "metric-refs",
                        metricIds: ["resistance-physical"],
                        convertRatingToChance: true,
                      },
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
              { type: "metric-refs", metricIds: ["damage-taken"] },
            ],
          },
        ],
      },
    ],
  },
} satisfies MetricTemplate
