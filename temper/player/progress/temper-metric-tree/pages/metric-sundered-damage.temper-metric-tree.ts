import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricSunderedDamage = {
  id: "019e2fcd-59d8-7b27-82f3-c9be8005683a",
  type: "page-type/temper-metric-tree",
  slug: "metric-sundered-damage",
  title: "Sundered Damage",
  nodeId: "sundered-damage",
  nodeType: "metric",
  displayOrder: 7,
  parent: "temper-metric-tree/subcategory-status-damage",
  createdAt: "2026-05-16T08:00:47.576Z",
  updatedAt: "2026-09-22T20:46:12.000Z",
} as const satisfies TemperMetricTree
