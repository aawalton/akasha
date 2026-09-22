import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricMagickaAbilityCost = {
  id: "019e2fcd-59f1-7452-9537-bce9ab28492e",
  type: "page-type/temper-metric-tree",
  slug: "metric-magicka-ability-cost",
  title: "Magicka Ability Cost",
  nodeId: "magicka-ability-cost",
  nodeType: "metric",
  displayOrder: 0,
  parent: "temper-metric-tree/subcategory-magicka",
} as const satisfies TemperMetricTree
