import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricMagickaRecovery = {
  id: "019e2fcd-59f3-7788-ad80-9439d89e1bd4",
  type: "page-type/temper-metric-tree",
  slug: "metric-magicka-recovery",
  title: "Magicka Recovery",
  nodeId: "magicka-recovery",
  nodeType: "metric",
  displayOrder: 2,
  parent: "temper-metric-tree/subcategory-magicka",
} as const satisfies TemperMetricTree
