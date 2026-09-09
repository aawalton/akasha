import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricHealingTakenBase = {
  id: "019e2fcd-5a69-7f78-b50f-b5d34acb3c5b",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-healing-taken-base",
  title: "Healing Taken Base",
  nodeId: "healing-taken-base",
  nodeType: "metric",
  displayOrder: 1,
  parent: "subcategory-healing-received",
} as const satisfies TemperMetricTree
