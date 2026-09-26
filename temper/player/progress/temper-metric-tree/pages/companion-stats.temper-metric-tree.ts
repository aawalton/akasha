import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const companionStats = {
  id: "01a0df07-1cd6-79b3-8ad5-02d03732c638",
  type: "page-type/temper-metric-tree",
  slug: "companion-stats",
  title: "Companion Stats",
  nodeId: "stats",
  nodeType: "companion",
  displayOrder: 0,
} as const satisfies TemperMetricTree
