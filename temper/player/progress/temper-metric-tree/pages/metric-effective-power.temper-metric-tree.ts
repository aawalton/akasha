import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricEffectivePower = {
  id: "019e2fcd-595a-734f-86bd-da52834baaeb",
  type: "page-type/temper-metric-tree",
  slug: "metric-effective-power",
  title: "Effective Power",
  nodeId: "effective-power",
  nodeType: "metric",
  displayOrder: 0,
  parent: "temper-metric-tree/category-damage",
  useAccentColor: true,
} as const satisfies TemperMetricTree
