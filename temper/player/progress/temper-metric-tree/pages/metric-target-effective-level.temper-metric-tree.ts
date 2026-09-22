import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricTargetEffectiveLevel = {
  id: "019e2fcd-5ab0-7dc0-bd8f-1775d207459d",
  type: "page-type/temper-metric-tree",
  slug: "metric-target-effective-level",
  title: "Target Effective Level",
  nodeId: "target-effective-level",
  nodeType: "metric",
  displayOrder: 0,
  parent: "temper-metric-tree/subcategory-target-other",
} as const satisfies TemperMetricTree
