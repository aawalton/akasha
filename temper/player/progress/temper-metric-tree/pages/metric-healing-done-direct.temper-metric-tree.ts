import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricHealingDoneDirect = {
  id: "019e2fcd-5a56-7351-b126-835641be0c2f",
  type: "page-type/temper-metric-tree",
  slug: "metric-healing-done-direct",
  title: "Healing Done Direct",
  nodeId: "healing-done-direct",
  nodeType: "metric",
  displayOrder: 2,
  parent: "temper-metric-tree/subcategory-healing-done",
} as const satisfies TemperMetricTree
