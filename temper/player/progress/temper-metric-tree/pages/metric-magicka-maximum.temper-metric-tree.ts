import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricMagickaMaximum = {
  id: "019e2fcd-59f2-7601-a707-753bf67814d7",
  type: "page-type/temper-metric-tree",
  slug: "metric-magicka-maximum",
  title: "Magicka Maximum",
  nodeId: "magicka-maximum",
  nodeType: "metric",
  displayOrder: 1,
  parent: "temper-metric-tree/subcategory-magicka",
} as const satisfies TemperMetricTree
