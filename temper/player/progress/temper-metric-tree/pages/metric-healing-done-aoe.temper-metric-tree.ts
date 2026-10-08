import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricHealingDoneAoe = {
  id: "019e2fcd-5a53-7891-9ccc-7a53880e196b",
  type: "page-type/temper-metric-tree",
  slug: "metric-healing-done-aoe",
  title: "AOE Healing Done",
  nodeId: "healing-done-aoe",
  nodeType: "metric",
  displayOrder: 0,
  parent: "temper-metric-tree/subcategory-healing-done",
  createdAt: "2026-05-16T08:00:47.699Z",
  updatedAt: "2026-09-26T15:51:54.000Z",
} as const satisfies TemperMetricTree
