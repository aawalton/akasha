import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricEffectivePower = {
  id: "019e2fcd-595a-734f-86bd-da52834baaeb",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-effective-power",
  title: "Effective Power",
  nodeId: "effective-power",
  nodeType: "metric",
  displayOrder: 0,
  parent: "category-damage",
  useAccentColor: true,
} as const satisfies TemperMetricTree
