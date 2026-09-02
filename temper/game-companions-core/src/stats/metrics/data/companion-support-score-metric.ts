import type { CompanionMetricTemplate } from "@akasha/temper-companions-core/companion-metric-template"

export const companionSupportScoreMetric = {
  id: "companion-support-score",
  name: "Support Score",
  valueType: "integer",
  formula: {
    type: "add",
    operands: [
      { type: "metric-ref", metricId: "companion-support-dps" },
      { type: "metric-ref", metricId: "companion-support-tps" },
    ],
  },
} satisfies CompanionMetricTemplate
