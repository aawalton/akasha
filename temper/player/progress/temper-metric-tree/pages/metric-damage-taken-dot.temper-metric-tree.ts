import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricDamageTakenDot = {
  id: "019e2fcd-5a3c-7bab-8eda-dee5cefa863d",
  type: "page-type/temper-metric-tree",
  slug: "metric-damage-taken-dot",
  title: "Damage Taken Dot",
  nodeId: "damage-taken-dot",
  nodeType: "metric",
  displayOrder: 0,
  parent: "temper-metric-tree/subcategory-damage-taken-by-type",
} as const satisfies TemperMetricTree
