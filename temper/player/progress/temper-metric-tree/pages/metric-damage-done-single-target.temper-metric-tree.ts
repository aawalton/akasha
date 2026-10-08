import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricDamageDoneSingleTarget = {
  id: "019e2fcd-5974-71a3-8297-b3631b07592e",
  type: "page-type/temper-metric-tree",
  slug: "metric-damage-done-single-target",
  title: "Damage Done (Single Target)",
  nodeId: "damage-done-single-target",
  nodeType: "metric",
  displayOrder: 8,
  parent: "temper-metric-tree/subcategory-damage-done",
  createdAt: "2026-05-16T08:00:47.476Z",
  updatedAt: "2026-09-26T15:51:54.000Z",
} as const satisfies TemperMetricTree
