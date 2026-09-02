import type { CompanionMetricTemplate } from "@akasha/temper-companions-core/companion-metric-template"

export const companionEffectiveDamageMetric = {
  id: "companion-effective-damage",
  name: "Effective Power",
  valueType: "integer",
  formula: {
    type: "multiply",
    operands: [
      { type: "metric-ref", metricId: "companion-tooltip-weapon-damage" },
      {
        type: "add",
        operands: [
          { type: "constant", value: 1 },
          {
            type: "multiply",
            operands: [
              {
                type: "metric-ref",
                metricId: "companion-critical-chance",
                convertRatingToChance: true,
              },
              { type: "metric-ref", metricId: "companion-critical-damage" },
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
              {
                type: "metric-ref",
                metricId: "companion-target-remaining-armor",
                convertRatingToChance: true,
              },
              { type: "constant", value: -1 },
            ],
          },
        ],
      },
    ],
  },
} satisfies CompanionMetricTemplate
