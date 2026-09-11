import type { TemperMetricTree } from "akasha/temper/progressions/temper-metric-trees/temper-metric-tree.page-type.types.ts"

export const metricAttackPhysicalMitigation = {
  id: "019e2fcd-59e9-7a35-950f-8cfd173471f9",
  type: "temper-metric-tree",
  slug: "metric-attack-physical-mitigation",
  title: "Attack Physical Mitigation",
  nodeId: "attack-physical-mitigation",
  nodeType: "metric",
  displayOrder: 1,
  parent: "subcategory-mitigation",
} as const satisfies TemperMetricTree
