import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricMagicalAoedotStatusChance = {
  id: "019e2fcd-59dd-7440-a4e3-481462e25974",
  type: "page-type/temper-metric-tree",
  slug: "metric-magical-aoedot-status-chance",
  title: "Magical Aoedot Status Chance",
  nodeId: "magical-aoedot-status-chance",
  nodeType: "metric",
  displayOrder: 2,
  parent: "temper-metric-tree/subcategory-magical-status-chance",
} as const satisfies TemperMetricTree
