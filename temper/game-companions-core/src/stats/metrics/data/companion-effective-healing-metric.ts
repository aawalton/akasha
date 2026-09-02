import type { CompanionMetricTemplate } from "@akasha/temper-companions-core/companion-metric-template"

export const companionEffectiveHealingMetric = {
  id: "companion-effective-healing",
  name: "Healing",
  valueType: "integer",
  formula: {
    type: "multiply",
    operands: [
      { type: "metric-ref", metricId: "companion-tooltip-weapon-healing" },
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
              { type: "metric-ref", metricId: "companion-critical-healing" },
            ],
          },
        ],
      },
    ],
  },
} satisfies CompanionMetricTemplate
