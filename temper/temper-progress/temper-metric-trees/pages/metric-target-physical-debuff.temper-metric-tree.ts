import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricTargetPhysicalDebuff = {
  id: "019e2fcd-5aa2-7ba3-b3da-4010bf78ab58",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-target-physical-debuff",
  title: "Target Physical Debuff",
  nodeId: "target-physical-debuff",
  nodeType: "metric",
  displayOrder: 3,
  parent: "subcategory-target-toughness",
} as const satisfies TemperMetricTree
