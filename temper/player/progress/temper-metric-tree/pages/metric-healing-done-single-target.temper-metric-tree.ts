import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricHealingDoneSingleTarget = {
  id: "019e2fcd-5a58-7996-a6d1-2dd2eb82b290",
  type: "page-type/temper-metric-tree",
  slug: "metric-healing-done-single-target",
  title: "Single Target Healing Done",
  nodeId: "healing-done-single-target",
  nodeType: "metric",
  displayOrder: 4,
  parent: "temper-metric-tree/subcategory-healing-done",
  createdAt: "2026-05-16T08:00:47.704Z",
  updatedAt: "2026-09-26T15:51:54.000Z",
} as const satisfies TemperMetricTree
