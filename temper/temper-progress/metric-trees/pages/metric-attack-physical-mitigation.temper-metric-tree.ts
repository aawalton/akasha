import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricAttackPhysicalMitigation = {
  id: "019e2fcd-59e9-7a35-950f-8cfd173471f9",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-attack-physical-mitigation",
  title: "Attack Physical Mitigation",
  nodeId: "attack-physical-mitigation",
  nodeType: "metric",
  displayOrder: 1,
  parent: "subcategory-mitigation",
} as const satisfies TemperMetricTree
