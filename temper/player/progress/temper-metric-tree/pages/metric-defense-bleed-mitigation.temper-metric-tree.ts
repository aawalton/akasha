import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricDefenseBleedMitigation = {
  id: "01a15c8b-cf85-7a26-be94-ede99ffc9cff",
  type: "page-type/temper-metric-tree",
  slug: "metric-defense-bleed-mitigation",
  title: "Defense Bleed Mitigation",
  nodeId: "defense-bleed-mitigation",
  nodeType: "metric",
  displayOrder: 8,
  parent: "temper-metric-tree/subcategory-defense-mitigation",
  createdAt: "2026-10-21T03:40:28.932Z",
  updatedAt: "2026-10-21T03:40:28.932Z",
} as const satisfies TemperMetricTree
