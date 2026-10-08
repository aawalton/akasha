import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricDefensePhysicalAoeMitigation = {
  id: "019e2fcd-5a43-7e69-9cee-722385de66ae",
  type: "page-type/temper-metric-tree",
  slug: "metric-defense-physical-aoe-mitigation",
  title: "Defense Physical AOE Mitigation",
  nodeId: "defense-physical-aoe-mitigation",
  nodeType: "metric",
  displayOrder: 1,
  parent: "temper-metric-tree/subcategory-defense-mitigation",
  createdAt: "2026-05-16T08:00:47.683Z",
  updatedAt: "2026-09-26T15:51:54.000Z",
} as const satisfies TemperMetricTree
