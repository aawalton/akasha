import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricTargetPhysicalDebuff = {
  id: "019e2fcd-5aa2-7ba3-b3da-4010bf78ab58",
  type: "page-type/temper-metric-tree",
  slug: "metric-target-physical-debuff",
  title: "Target Physical Debuff",
  nodeId: "target-physical-debuff",
  nodeType: "metric",
  displayOrder: 3,
  parent: "temper-metric-tree/subcategory-target-toughness",
  createdAt: "2026-05-16T08:00:47.778Z",
  updatedAt: "2026-09-22T20:46:12.000Z",
} as const satisfies TemperMetricTree
