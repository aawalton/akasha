import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricDefensePhysicalMitigation = {
  id: "019e2fcd-5a46-7446-8112-d4cd8210bbdb",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-defense-physical-mitigation",
  title: "Defense Physical Mitigation",
  nodeId: "defense-physical-mitigation",
  nodeType: "metric",
  displayOrder: 3,
  parent: "subcategory-defense-mitigation",
} as const satisfies TemperMetricTree
