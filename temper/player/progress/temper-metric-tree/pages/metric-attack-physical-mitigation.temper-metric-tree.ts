import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricAttackPhysicalMitigation = {
  id: "019e2fcd-59e9-7a35-950f-8cfd173471f9",
  type: "page-type/temper-metric-tree",
  slug: "metric-attack-physical-mitigation",
  title: "Attack Physical Mitigation",
  nodeId: "attack-physical-mitigation",
  nodeType: "metric",
  displayOrder: 1,
  parent: "temper-metric-tree/subcategory-mitigation",
} as const satisfies TemperMetricTree
