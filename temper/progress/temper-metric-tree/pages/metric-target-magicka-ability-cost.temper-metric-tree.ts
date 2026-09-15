import type { TemperMetricTree } from "akasha/temper/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricTargetMagickaAbilityCost = {
  id: "019e2fcd-5a99-7fdc-bcfe-a567eda12324",
  type: "temper-metric-tree",
  slug: "metric-target-magicka-ability-cost",
  title: "Target Magicka Ability Cost",
  nodeId: "target-magicka-ability-cost",
  nodeType: "metric",
  displayOrder: 0,
  parent: "subcategory-target-sustain",
} as const satisfies TemperMetricTree
