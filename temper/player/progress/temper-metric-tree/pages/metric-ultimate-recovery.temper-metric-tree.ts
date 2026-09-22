import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricUltimateRecovery = {
  id: "019e2fcd-5a05-7341-9cda-a3c7fc9fdf8c",
  type: "page-type/temper-metric-tree",
  slug: "metric-ultimate-recovery",
  title: "Ultimate Recovery",
  nodeId: "ultimate-recovery",
  nodeType: "metric",
  displayOrder: 2,
  parent: "temper-metric-tree/subcategory-ultimate",
} as const satisfies TemperMetricTree
