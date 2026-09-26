import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const companionHpsTotalCompanionHpsDirect = {
  id: "01a0df07-1cd6-7d0f-bed9-506029b363cd",
  type: "page-type/temper-metric-tree",
  slug: "companion-hps-total-companion-hps-direct",
  title: "Direct Healing Per Second",
  nodeId: "companion-hps-direct",
  nodeType: "metric",
  displayOrder: 0,
  parent: "temper-metric-tree/companion-category-companion-hps-total",
} as const satisfies TemperMetricTree
