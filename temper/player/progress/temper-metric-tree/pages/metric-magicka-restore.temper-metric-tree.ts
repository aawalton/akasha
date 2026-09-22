import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricMagickaRestore = {
  id: "019e2fcd-59f4-7c00-846f-6c235b841e36",
  type: "page-type/temper-metric-tree",
  slug: "metric-magicka-restore",
  title: "Magicka Restore",
  nodeId: "magicka-restore",
  nodeType: "metric",
  displayOrder: 3,
  parent: "temper-metric-tree/subcategory-magicka",
} as const satisfies TemperMetricTree
