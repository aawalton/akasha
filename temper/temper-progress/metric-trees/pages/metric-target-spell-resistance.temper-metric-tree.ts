import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricTargetSpellResistance = {
  id: "019e2fcd-5aa6-795f-9108-a1baf15f048c",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-target-spell-resistance",
  title: "Target Spell Resistance",
  nodeId: "target-spell-resistance",
  nodeType: "metric",
  displayOrder: 1,
  parent: "metric-target-resistance",
} as const satisfies TemperMetricTree
