import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricDamageTakenMagical = {
  id: "01a1597a-4b0d-7fbb-b9da-4c6ff990d1f3",
  type: "page-type/temper-metric-tree",
  slug: "metric-damage-taken-magical",
  title: "Magical Damage Taken",
  nodeId: "damage-taken-magical",
  nodeType: "metric",
  displayOrder: 5,
  parent: "temper-metric-tree/subcategory-damage-taken-by-type",
  createdAt: "2026-10-20T13:22:29.260Z",
  updatedAt: "2026-10-20T13:22:29.260Z",
} as const satisfies TemperMetricTree
