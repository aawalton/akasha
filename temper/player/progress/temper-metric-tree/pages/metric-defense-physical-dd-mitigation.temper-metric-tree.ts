import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricDefensePhysicalDdMitigation = {
  id: "019e2fcd-5a45-7199-8b71-006c7315e9fb",
  type: "page-type/temper-metric-tree",
  slug: "metric-defense-physical-dd-mitigation",
  title: "Defense Physical Direct Mitigation",
  nodeId: "defense-physical-dd-mitigation",
  nodeType: "metric",
  displayOrder: 2,
  parent: "temper-metric-tree/subcategory-defense-mitigation",
  createdAt: "2026-05-16T08:00:47.685Z",
  updatedAt: "2026-09-26T15:51:54.000Z",
} as const satisfies TemperMetricTree
