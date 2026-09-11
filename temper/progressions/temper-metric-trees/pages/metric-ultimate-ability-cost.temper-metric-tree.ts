import type { TemperMetricTree } from "akasha/temper/progressions/temper-metric-trees/temper-metric-tree.page-type.types.ts"

export const metricUltimateAbilityCost = {
  id: "019e2fcd-5a02-7eee-b548-8d97db652499",
  type: "temper-metric-tree",
  slug: "metric-ultimate-ability-cost",
  title: "Ultimate Ability Cost",
  nodeId: "ultimate-ability-cost",
  nodeType: "metric",
  displayOrder: 0,
  parent: "subcategory-ultimate",
} as const satisfies TemperMetricTree
