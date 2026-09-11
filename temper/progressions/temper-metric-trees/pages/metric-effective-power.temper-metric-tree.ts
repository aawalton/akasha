import type { TemperMetricTree } from "akasha/temper/progressions/temper-metric-trees/temper-metric-tree.page-type.types.ts"

export const metricEffectivePower = {
  id: "019e2fcd-595a-734f-86bd-da52834baaeb",
  type: "temper-metric-tree",
  slug: "metric-effective-power",
  title: "Effective Power",
  nodeId: "effective-power",
  nodeType: "metric",
  displayOrder: 0,
  parent: "category-damage",
  useAccentColor: true,
} as const satisfies TemperMetricTree
