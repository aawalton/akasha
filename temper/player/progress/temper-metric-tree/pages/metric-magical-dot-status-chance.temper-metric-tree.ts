import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricMagicalDotStatusChance = {
  id: "019e2fcd-59de-7647-ba27-3df72168f47a",
  type: "page-type/temper-metric-tree",
  slug: "metric-magical-dot-status-chance",
  title: "Magical Dot Status Chance",
  nodeId: "magical-dot-status-chance",
  nodeType: "metric",
  displayOrder: 3,
  parent: "temper-metric-tree/subcategory-magical-status-chance",
} as const satisfies TemperMetricTree
