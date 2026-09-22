import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricHealingTakenBase = {
  id: "019e2fcd-5a69-7f78-b50f-b5d34acb3c5b",
  type: "page-type/temper-metric-tree",
  slug: "metric-healing-taken-base",
  title: "Healing Taken Base",
  nodeId: "healing-taken-base",
  nodeType: "metric",
  displayOrder: 1,
  parent: "temper-metric-tree/subcategory-healing-received",
} as const satisfies TemperMetricTree
