import type { MetricTemplate } from "../metric-template"

export const effectivePowerSpellMetric = {
  id: "effective-power-spell",

  name: "Effective Spell Power",
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
              { type: "metric-refs", metricIds: ["attack-crit-damage-spell"] },
            ],
          },
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
              { type: "metric-refs", metricIds: ["attack-spell-mitigation"] },
            ],
          },
        ],
      },
      {
        type: "add",
        operands: [
          { type: "constant", value: 1 },
          { type: "metric-refs", metricIds: ["target-damage-taken"] },
        ],
      },
      {
        type: "add",
        operands: [
          { type: "constant", value: 1 },
          { type: "metric-refs", metricIds: ["damage-done-base"] },
        ],
      },
    ],
  },
} satisfies MetricTemplate
