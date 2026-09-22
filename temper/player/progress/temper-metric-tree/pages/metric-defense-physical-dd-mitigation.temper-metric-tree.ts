import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricDefensePhysicalDdMitigation = {
  id: "019e2fcd-5a45-7199-8b71-006c7315e9fb",
  type: "page-type/temper-metric-tree",
  slug: "metric-defense-physical-dd-mitigation",
  title: "Defense Physical Dd Mitigation",
  nodeId: "defense-physical-dd-mitigation",
  nodeType: "metric",
  displayOrder: 2,
  parent: "temper-metric-tree/subcategory-defense-mitigation",
} as const satisfies TemperMetricTree
