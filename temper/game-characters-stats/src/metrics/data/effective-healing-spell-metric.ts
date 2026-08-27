import type { MetricTemplate } from "../metric-template"

export const effectiveHealingSpellMetric = {
  id: "effective-healing-spell",

  name: "Effective Spell Healing Power",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "multiply",
    operands: [
      {
        type: "add",
        operands: [
          {
            type: "multiply",
            operands: [
              { type: "metric-refs", metricIds: ["magicka-maximum"] },
              { type: "constant", value: 0.095238 },
            ],
          },
          { type: "metric-refs", metricIds: ["power-spell"] },
        ],
      },
      {
        type: "add",
        operands: [
          { type: "constant", value: 1 },
          {
            type: "multiply",
            operands: [
              {
                type: "metric-refs",
                metricIds: ["critical-rating-spell"],
                convertRatingToChance: true,
              },
              { type: "metric-refs", metricIds: ["healing-critical-bonus-spell"] },
            ],
          },
        ],
      },
      {
        type: "add",
        operands: [
          { type: "constant", value: 1 },
          { type: "metric-refs", metricIds: ["target-healing-received"] },
        ],
      },
      {
        type: "add",
        operands: [
          { type: "constant", value: 1 },
          { type: "metric-refs", metricIds: ["healing-done-base"] },
        ],
      },
    ],
  },
} satisfies MetricTemplate
