import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricDamageDoneShock = {
  id: "019e2fcd-598d-7498-a433-c406faf8c35f",
  type: "page-type/temper-metric-tree",
  slug: "metric-damage-done-shock",
  title: "Damage Done (Shock)",
  nodeId: "damage-done-shock",
  nodeType: "metric",
  displayOrder: 9,
  parent: "temper-metric-tree/subcategory-damage-done-by-type",
  createdAt: "2026-05-16T08:00:47.501Z",
  updatedAt: "2026-09-26T15:51:54.000Z",
} as const satisfies TemperMetricTree
