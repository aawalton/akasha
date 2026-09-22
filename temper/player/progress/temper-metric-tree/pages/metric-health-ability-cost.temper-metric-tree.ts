import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricHealthAbilityCost = {
  id: "019e2fcd-5a17-71dc-a75c-109eaa831cc2",
  type: "page-type/temper-metric-tree",
  slug: "metric-health-ability-cost",
  title: "Health Ability Cost",
  nodeId: "health-ability-cost",
  nodeType: "metric",
  displayOrder: 1,
  parent: "temper-metric-tree/subcategory-costs",
} as const satisfies TemperMetricTree
