import type { TemperMetricTree } from "akasha/temper/progressions/temper-metric-trees/temper-metric-tree.page-type.types.ts"

export const metricDefensePhysicalMitigation = {
  id: "019e2fcd-5a46-7446-8112-d4cd8210bbdb",
  type: "temper-metric-tree",
  slug: "metric-defense-physical-mitigation",
  title: "Defense Physical Mitigation",
  nodeId: "defense-physical-mitigation",
  nodeType: "metric",
  displayOrder: 3,
  parent: "subcategory-defense-mitigation",
} as const satisfies TemperMetricTree
