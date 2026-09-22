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
} as const satisfies TemperMetricTree
