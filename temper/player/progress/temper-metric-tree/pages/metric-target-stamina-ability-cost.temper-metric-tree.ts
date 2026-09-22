import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricTargetStaminaAbilityCost = {
  id: "019e2fcd-5a9b-73b2-becb-f1209acf4935",
  type: "page-type/temper-metric-tree",
  slug: "metric-target-stamina-ability-cost",
  title: "Target Stamina Ability Cost",
  nodeId: "target-stamina-ability-cost",
  nodeType: "metric",
  displayOrder: 1,
  parent: "temper-metric-tree/subcategory-target-sustain",
} as const satisfies TemperMetricTree
