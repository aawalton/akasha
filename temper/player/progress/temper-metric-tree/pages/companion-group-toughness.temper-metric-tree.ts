import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const companionGroupToughness = {
  id: "01a0df07-1cd6-725c-a916-eb6f7bcc3542",
  type: "page-type/temper-metric-tree",
  slug: "companion-group-toughness",
  title: "Toughness",
  nodeId: "toughness",
  nodeType: "companion-group",
  displayOrder: 1,
  parent: "temper-metric-tree/companion-stats",
} as const satisfies TemperMetricTree
