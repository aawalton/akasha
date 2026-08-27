import type { MetricTemplate } from "../metric-template"

export const effectiveHealthSpellMetric = {
  id: "effective-health-spell",

  name: "Effective Health (Spell)",
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
                        metricIds: ["resistance-spell"],
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
