import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricDamageTakenDot = {
  id: "019e2fcd-5a3c-7bab-8eda-dee5cefa863d",
  type: "page-type/temper-metric-tree",
  slug: "metric-damage-taken-dot",
  title: "Damage Taken (DOT)",
  nodeId: "damage-taken-dot",
  nodeType: "metric",
  displayOrder: 0,
  parent: "temper-metric-tree/subcategory-damage-taken-by-type",
  createdAt: "2026-05-16T08:00:47.676Z",
  updatedAt: "2026-09-26T15:51:54.000Z",
} as const satisfies TemperMetricTree
