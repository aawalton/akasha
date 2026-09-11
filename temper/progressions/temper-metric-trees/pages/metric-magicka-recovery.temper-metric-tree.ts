import type { TemperMetricTree } from "akasha/temper/progressions/temper-metric-trees/temper-metric-tree.page-type.types.ts"

export const metricMagickaRecovery = {
  id: "019e2fcd-59f3-7788-ad80-9439d89e1bd4",
  type: "temper-metric-tree",
  slug: "metric-magicka-recovery",
  title: "Magicka Recovery",
  nodeId: "magicka-recovery",
  nodeType: "metric",
  displayOrder: 2,
  parent: "subcategory-magicka",
} as const satisfies TemperMetricTree
