import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricDamageDonePlayers = {
  id: "019e2fcd-5973-707a-9fe0-baf9778f6ebe",
  type: "page-type/temper-metric-tree",
  slug: "metric-damage-done-players",
  title: "Damage Done Players",
  nodeId: "damage-done-players",
  nodeType: "metric",
  displayOrder: 7,
  parent: "temper-metric-tree/subcategory-damage-done",
} as const satisfies TemperMetricTree
