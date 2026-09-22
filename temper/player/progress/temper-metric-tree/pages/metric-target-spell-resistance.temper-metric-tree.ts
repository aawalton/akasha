import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricTargetSpellResistance = {
  id: "019e2fcd-5aa6-795f-9108-a1baf15f048c",
  type: "page-type/temper-metric-tree",
  slug: "metric-target-spell-resistance",
  title: "Target Spell Resistance",
  nodeId: "target-spell-resistance",
  nodeType: "metric",
  displayOrder: 1,
  parent: "temper-metric-tree/metric-target-resistance",
} as const satisfies TemperMetricTree
