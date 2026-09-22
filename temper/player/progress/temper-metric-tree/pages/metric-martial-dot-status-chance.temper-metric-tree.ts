import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricMartialDotStatusChance = {
  id: "019e2fcd-59e5-707d-85c7-32f36dcf9e32",
  type: "page-type/temper-metric-tree",
  slug: "metric-martial-dot-status-chance",
  title: "Martial Dot Status Chance",
  nodeId: "martial-dot-status-chance",
  nodeType: "metric",
  displayOrder: 3,
  parent: "temper-metric-tree/subcategory-martial-status-chance",
} as const satisfies TemperMetricTree
