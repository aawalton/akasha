import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricTargetSpellPower = {
  id: "019e2fcd-5a96-7461-b5a2-d584cb77379b",
  type: "page-type/temper-metric-tree",
  slug: "metric-target-spell-power",
  title: "Target Spell Power",
  nodeId: "target-spell-power",
  nodeType: "metric",
  displayOrder: 0,
  parent: "temper-metric-tree/metric-target-power",
} as const satisfies TemperMetricTree
