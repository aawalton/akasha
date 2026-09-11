import type { TemperMetricTree } from "akasha/temper/progressions/temper-metric-trees/temper-metric-tree.page-type.types.ts"

export const metricTargetSpellPower = {
  id: "019e2fcd-5a96-7461-b5a2-d584cb77379b",
  pageTypeSlug: "temper-metric-tree",
  type: "temper-metric-tree",
  slug: "metric-target-spell-power",
  title: "Target Spell Power",
  nodeId: "target-spell-power",
  nodeType: "metric",
  displayOrder: 0,
  parent: "metric-target-power",
} as const satisfies TemperMetricTree
