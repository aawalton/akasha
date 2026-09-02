import type { CompanionMetricTemplate } from "@akasha/temper-companions-core/companion-metric-template"

export const companionTargetRemainingArmorMetric = {
  id: "companion-target-remaining-armor",
  name: "Target Remaining Armor",
  valueType: "rating",
  divisor: 50000,
  cap: 0.5,
  formula: {
    type: "add",
    operands: [
      { type: "metric-ref", metricId: "companion-target-armor" },
      {
        type: "multiply",
        operands: [
          { type: "metric-ref", metricId: "companion-penetration" },
          { type: "constant", value: -1 },
        ],
      },
    ],
  },
} satisfies CompanionMetricTemplate
