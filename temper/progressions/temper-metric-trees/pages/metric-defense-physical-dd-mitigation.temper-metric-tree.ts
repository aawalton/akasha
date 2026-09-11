import type { TemperMetricTree } from "akasha/temper/progressions/temper-metric-trees/temper-metric-tree.page-type.types.ts"

export const metricDefensePhysicalDdMitigation = {
  id: "019e2fcd-5a45-7199-8b71-006c7315e9fb",
  type: "temper-metric-tree",
  slug: "metric-defense-physical-dd-mitigation",
  title: "Defense Physical Dd Mitigation",
  nodeId: "defense-physical-dd-mitigation",
  nodeType: "metric",
  displayOrder: 2,
  parent: "subcategory-defense-mitigation",
} as const satisfies TemperMetricTree
