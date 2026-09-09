import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricHealthAbilityCost = {
  id: "019e2fcd-5a17-71dc-a75c-109eaa831cc2",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-health-ability-cost",
  title: "Health Ability Cost",
  nodeId: "health-ability-cost",
  nodeType: "metric",
  displayOrder: 1,
  parent: "subcategory-costs",
} as const satisfies TemperMetricTree
