import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricUltimateAbilityCost = {
  id: "019e2fcd-5a02-7eee-b548-8d97db652499",
  type: "page-type/temper-metric-tree",
  slug: "metric-ultimate-ability-cost",
  title: "Ultimate Ability Cost",
  nodeId: "ultimate-ability-cost",
  nodeType: "metric",
  displayOrder: 0,
  parent: "temper-metric-tree/subcategory-ultimate",
} as const satisfies TemperMetricTree
