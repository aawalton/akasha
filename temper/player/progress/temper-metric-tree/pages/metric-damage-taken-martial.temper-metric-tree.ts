import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricDamageTakenMartial = {
  id: "01a1597a-4b0d-7401-950c-723fea248047",
  type: "page-type/temper-metric-tree",
  slug: "metric-damage-taken-martial",
  title: "Martial Damage Taken",
  nodeId: "damage-taken-martial",
  nodeType: "metric",
  displayOrder: 4,
  parent: "temper-metric-tree/subcategory-damage-taken-by-type",
  createdAt: "2026-10-20T13:22:29.260Z",
  updatedAt: "2026-10-20T13:22:29.260Z",
} as const satisfies TemperMetricTree
