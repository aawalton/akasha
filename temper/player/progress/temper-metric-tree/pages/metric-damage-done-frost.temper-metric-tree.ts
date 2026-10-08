import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricDamageDoneFrost = {
  id: "019e2fcd-5988-7211-94fb-30928c5b1462",
  type: "page-type/temper-metric-tree",
  slug: "metric-damage-done-frost",
  title: "Damage Done (Frost)",
  nodeId: "damage-done-frost",
  nodeType: "metric",
  displayOrder: 4,
  parent: "temper-metric-tree/subcategory-damage-done-by-type",
  createdAt: "2026-05-16T08:00:47.496Z",
  updatedAt: "2026-09-26T15:51:54.000Z",
} as const satisfies TemperMetricTree
