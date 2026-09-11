import type { TemperMetricTree } from "akasha/temper/progressions/temper-metric-trees/temper-metric-tree.page-type.types.ts"

export const metricHealingEffectiveSelfPower = {
  id: "019e2fcd-5a61-7189-908d-45583abcc2bc",
  type: "temper-metric-tree",
  slug: "metric-healing-effective-self-power",
  title: "Healing Effective Self Power",
  nodeId: "healing-effective-self-power",
  nodeType: "metric",
  displayOrder: 2,
  parent: "subcategory-healing-power",
} as const satisfies TemperMetricTree
