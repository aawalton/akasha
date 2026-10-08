import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricConcussionDamage = {
  id: "019e2fcd-59d3-7541-84b0-55fc86ab93c4",
  type: "page-type/temper-metric-tree",
  slug: "metric-concussion-damage",
  title: "Concussion Damage",
  nodeId: "concussion-damage",
  nodeType: "metric",
  displayOrder: 2,
  parent: "temper-metric-tree/subcategory-status-damage",
  createdAt: "2026-05-16T08:00:47.571Z",
  updatedAt: "2026-09-22T20:46:12.000Z",
} as const satisfies TemperMetricTree
