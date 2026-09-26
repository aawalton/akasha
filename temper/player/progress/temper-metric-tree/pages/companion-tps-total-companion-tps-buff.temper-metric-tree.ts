import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const companionTpsTotalCompanionTpsBuff = {
  id: "01a0df07-1cd6-745d-8f7c-20df31f737d8",
  type: "page-type/temper-metric-tree",
  slug: "companion-tps-total-companion-tps-buff",
  title: "Buff Toughness",
  nodeId: "companion-tps-buff",
  nodeType: "metric",
  displayOrder: 0,
  parent: "temper-metric-tree/companion-category-companion-tps-total",
} as const satisfies TemperMetricTree
