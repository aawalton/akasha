import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricHealingDoneSingleTarget = {
  id: "019e2fcd-5a58-7996-a6d1-2dd2eb82b290",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-healing-done-single-target",
  title: "Healing Done Single Target",
  nodeId: "healing-done-single-target",
  nodeType: "metric",
  displayOrder: 4,
  parent: "subcategory-healing-done",
} as const satisfies TemperMetricTree
