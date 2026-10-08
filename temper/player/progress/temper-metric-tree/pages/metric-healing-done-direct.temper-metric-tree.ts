import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricHealingDoneDirect = {
  id: "019e2fcd-5a56-7351-b126-835641be0c2f",
  type: "page-type/temper-metric-tree",
  slug: "metric-healing-done-direct",
  title: "Direct Healing Done",
  nodeId: "healing-done-direct",
  nodeType: "metric",
  displayOrder: 2,
  parent: "temper-metric-tree/subcategory-healing-done",
  createdAt: "2026-05-16T08:00:47.702Z",
  updatedAt: "2026-09-26T15:51:54.000Z",
} as const satisfies TemperMetricTree
