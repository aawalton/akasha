import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricTargetDefenseBonus = {
  id: "019e2fcd-5aa1-77ad-a4e5-c175bb079cc2",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-target-defense-bonus",
  title: "Target Defense Bonus",
  nodeId: "target-defense-bonus",
  nodeType: "metric",
  displayOrder: 2,
  parent: "subcategory-target-toughness",
} as const satisfies TemperMetricTree
