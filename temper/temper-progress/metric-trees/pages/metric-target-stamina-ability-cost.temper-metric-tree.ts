import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricTargetStaminaAbilityCost = {
  id: "019e2fcd-5a9b-73b2-becb-f1209acf4935",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-target-stamina-ability-cost",
  title: "Target Stamina Ability Cost",
  nodeId: "target-stamina-ability-cost",
  nodeType: "metric",
  displayOrder: 1,
  parent: "subcategory-target-sustain",
} as const satisfies TemperMetricTree
