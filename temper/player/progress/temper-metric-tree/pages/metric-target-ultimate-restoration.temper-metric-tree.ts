import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricTargetUltimateRestoration = {
  id: "019e2fcd-5a9c-7781-8d57-53ca25380482",
  type: "page-type/temper-metric-tree",
  slug: "metric-target-ultimate-restoration",
  title: "Target Ultimate Restoration",
  nodeId: "target-ultimate-restoration",
  nodeType: "metric",
  displayOrder: 2,
  parent: "temper-metric-tree/subcategory-target-sustain",
} as const satisfies TemperMetricTree
