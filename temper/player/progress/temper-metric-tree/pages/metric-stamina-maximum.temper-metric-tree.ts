import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricStaminaMaximum = {
  id: "019e2fcd-59fc-7ccb-b7e2-7af6686276a7",
  type: "page-type/temper-metric-tree",
  slug: "metric-stamina-maximum",
  title: "Max Stamina",
  nodeId: "stamina-maximum",
  nodeType: "metric",
  displayOrder: 4,
  parent: "temper-metric-tree/subcategory-stamina",
  createdAt: "2026-05-16T08:00:47.612Z",
  updatedAt: "2026-09-26T15:51:54.000Z",
} as const satisfies TemperMetricTree
