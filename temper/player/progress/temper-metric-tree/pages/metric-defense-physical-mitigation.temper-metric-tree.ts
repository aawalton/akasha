import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricDefensePhysicalMitigation = {
  id: "019e2fcd-5a46-7446-8112-d4cd8210bbdb",
  type: "page-type/temper-metric-tree",
  slug: "metric-defense-physical-mitigation",
  title: "Defense Physical Mitigation",
  nodeId: "defense-physical-mitigation",
  nodeType: "metric",
  displayOrder: 3,
  parent: "temper-metric-tree/subcategory-defense-mitigation",
} as const satisfies TemperMetricTree
