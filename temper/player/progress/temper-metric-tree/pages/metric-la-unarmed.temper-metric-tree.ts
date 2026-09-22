import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricLaUnarmed = {
  id: "019e2fcd-59a4-7b1f-b509-ffd4d099410b",
  type: "page-type/temper-metric-tree",
  slug: "metric-la-unarmed",
  title: "La Unarmed",
  nodeId: "la-unarmed",
  nodeType: "metric",
  displayOrder: 9,
  parent: "temper-metric-tree/subcategory-la-damage",
} as const satisfies TemperMetricTree
