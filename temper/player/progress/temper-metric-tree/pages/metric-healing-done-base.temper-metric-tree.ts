import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricHealingDoneBase = {
  id: "019e2fcd-5a54-7f9e-98cf-02b56dd1efcc",
  type: "page-type/temper-metric-tree",
  slug: "metric-healing-done-base",
  title: "Healing Done",
  nodeId: "healing-done-base",
  nodeType: "metric",
  displayOrder: 1,
  parent: "temper-metric-tree/subcategory-healing-done",
  createdAt: "2026-05-16T08:00:47.700Z",
  updatedAt: "2026-09-26T15:51:54.000Z",
} as const satisfies TemperMetricTree
