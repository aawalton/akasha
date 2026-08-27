import type { CompanionMetricTemplate } from "../companion-metric-template"

export const companionScoreMetric = {
  id: "companion-score",
  name: "Score",
  valueType: "integer",
  formula: {
    type: "role-sum",
    operands: [
      { role: "dps", metricRef: "companion-dps-total" },
      { role: "healer", metricRef: "companion-hps-total" },
      { role: "tank", metricRef: "companion-tps-total", scale: 0.1 },
      { role: "support", metricRef: "companion-support-dps" },
      { role: "support", metricRef: "companion-support-tps", scale: 0.1 },
    ],
  },
} satisfies CompanionMetricTemplate
