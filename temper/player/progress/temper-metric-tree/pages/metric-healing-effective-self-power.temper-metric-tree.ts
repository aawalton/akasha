import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricHealingEffectiveSelfPower = {
  id: "019e2fcd-5a61-7189-908d-45583abcc2bc",
  type: "page-type/temper-metric-tree",
  slug: "metric-healing-effective-self-power",
  title: "Healing Effective Self Power",
  nodeId: "healing-effective-self-power",
  nodeType: "metric",
  displayOrder: 2,
  parent: "temper-metric-tree/subcategory-healing-power",
} as const satisfies TemperMetricTree
