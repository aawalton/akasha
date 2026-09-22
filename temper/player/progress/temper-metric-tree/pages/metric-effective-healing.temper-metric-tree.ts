import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricEffectiveHealing = {
  id: "019e2fcd-5a5c-747c-8ec9-4a9b3a0d6119",
  type: "page-type/temper-metric-tree",
  slug: "metric-effective-healing",
  title: "Effective Healing",
  nodeId: "effective-healing",
  nodeType: "metric",
  displayOrder: 0,
  parent: "temper-metric-tree/subcategory-effective-healing",
} as const satisfies TemperMetricTree
