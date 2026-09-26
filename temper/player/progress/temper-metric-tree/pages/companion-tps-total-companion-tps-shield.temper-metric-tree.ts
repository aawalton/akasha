import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const companionTpsTotalCompanionTpsShield = {
  id: "01a0df07-1cd6-7e97-ab10-3bad91fb407c",
  type: "page-type/temper-metric-tree",
  slug: "companion-tps-total-companion-tps-shield",
  title: "Shields Per Second",
  nodeId: "companion-tps-shield",
  nodeType: "metric",
  displayOrder: 2,
  parent: "temper-metric-tree/companion-category-companion-tps-total",
} as const satisfies TemperMetricTree
