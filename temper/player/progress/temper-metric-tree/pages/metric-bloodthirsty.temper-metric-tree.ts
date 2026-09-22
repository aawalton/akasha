import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricBloodthirsty = {
  id: "019e2fcd-59eb-7ce7-91e4-bb6f057f3d3f",
  type: "page-type/temper-metric-tree",
  slug: "metric-bloodthirsty",
  title: "Bloodthirsty",
  nodeId: "bloodthirsty",
  nodeType: "metric",
  displayOrder: 0,
  parent: "temper-metric-tree/subcategory-bloodthirsty",
} as const satisfies TemperMetricTree
