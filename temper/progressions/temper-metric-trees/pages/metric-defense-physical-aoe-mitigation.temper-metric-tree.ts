import type { TemperMetricTree } from "akasha/temper/progressions/temper-metric-trees/temper-metric-tree.page-type.types.ts"

export const metricDefensePhysicalAoeMitigation = {
  id: "019e2fcd-5a43-7e69-9cee-722385de66ae",
  type: "temper-metric-tree",
  slug: "metric-defense-physical-aoe-mitigation",
  title: "Defense Physical Aoe Mitigation",
  nodeId: "defense-physical-aoe-mitigation",
  nodeType: "metric",
  displayOrder: 1,
  parent: "subcategory-defense-mitigation",
} as const satisfies TemperMetricTree
