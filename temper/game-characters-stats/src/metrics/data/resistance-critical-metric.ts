import type { MetricTemplate } from "../metric-template"

export const resistanceCriticalMetric = {
  id: "resistance-critical",

  name: "Critical Resistance",
  category: "base",
  esoStatConstantName: "STAT_CRITICAL_RESISTANCE",
  valueType: "rating",
  divisor: 6600,
  polarity: "higher-is-better",
  formula: {
    type: "add",
    operands: [
      {
        type: "sum",
        effectType: "integer",
      },
      {
        type: "floor",
        operand: {
          type: "multiply",
          operands: [
            {
              type: "sum",
              effectType: "fractional-change",
            },
            { type: "metric-refs", metricIds: ["player-effective-level"] },
            { type: "constant", value: 100 },
          ],
        },
      },
    ],
  },
  fullyImplemented: true,
} satisfies MetricTemplate
