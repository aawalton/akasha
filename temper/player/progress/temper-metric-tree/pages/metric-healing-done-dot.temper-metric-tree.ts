import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricHealingDoneDot = {
  id: "019e2fcd-5a57-7676-92a5-759f7eac0b79",
  type: "page-type/temper-metric-tree",
  slug: "metric-healing-done-dot",
  title: "Healing Done Dot",
  nodeId: "healing-done-dot",
  nodeType: "metric",
  displayOrder: 3,
  parent: "temper-metric-tree/subcategory-healing-done",
} as const satisfies TemperMetricTree
