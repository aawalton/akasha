import type { TemperMetricTree } from "akasha/temper/progressions/temper-metric-trees/temper-metric-tree.page-type.types.ts"

export const metricDamageShield = {
  id: "019e2fcd-5a4c-7695-858e-0d684f7c8565",
  type: "temper-metric-tree",
  slug: "metric-damage-shield",
  title: "Damage Shield",
  nodeId: "damage-shield",
  nodeType: "metric",
  displayOrder: 0,
  parent: "subcategory-damage-shields",
} as const satisfies TemperMetricTree
