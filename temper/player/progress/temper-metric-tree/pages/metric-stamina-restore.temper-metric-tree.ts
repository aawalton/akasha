import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricStaminaRestore = {
  id: "019e2fcd-59ff-748e-bfe5-f8f68e1180d8",
  type: "page-type/temper-metric-tree",
  slug: "metric-stamina-restore",
  title: "Restore Stamina",
  nodeId: "stamina-restore",
  nodeType: "metric",
  displayOrder: 6,
  parent: "temper-metric-tree/subcategory-stamina",
  createdAt: "2026-05-16T08:00:47.615Z",
  updatedAt: "2026-09-26T15:51:54.000Z",
} as const satisfies TemperMetricTree
