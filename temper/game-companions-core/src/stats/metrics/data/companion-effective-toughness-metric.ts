import type { CompanionMetricTemplate } from "@akasha/temper-companions-core/companion-metric-template"

export const companionEffectiveToughnessMetric = {
  id: "companion-effective-toughness",
  name: "Effective Health",
  valueType: "integer",
  formula: {
    type: "divide",
    operands: [
      {
        type: "multiply",
        operands: [
          { type: "metric-ref", metricId: "companion-health-maximum" },
          {
            type: "add",
            operands: [
              { type: "constant", value: 1 },
              {
                type: "metric-ref",
                metricId: "companion-armor",
                convertRatingToChance: true,
              },
            ],
          },
        ],
      },
      {
        type: "add",
        operands: [
          { type: "constant", value: 1 },
          { type: "metric-ref", metricId: "companion-damage-taken" },
        ],
      },
    ],
  },
} satisfies CompanionMetricTemplate
