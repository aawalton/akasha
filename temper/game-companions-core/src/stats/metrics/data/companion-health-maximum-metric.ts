import type { CompanionMetricTemplate } from "@akasha/temper-companions-core/companion-metric-template"

export const companionHealthMaximumMetric = {
  id: "companion-health-maximum",
  name: "Maximum Health",
  valueType: "integer",
  formula: {
    type: "multiply",
    operands: [
      { type: "sum", metricId: "companion-health-maximum", effectType: "integer" },
      { type: "product", metricId: "companion-health-maximum", effectType: "fractional-change" },
    ],
  },
} satisfies CompanionMetricTemplate
