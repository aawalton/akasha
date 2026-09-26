import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const companionHpsTotalCompanionHpsHot = {
  id: "01a0df07-1cd6-7371-89fc-9188872bd5c5",
  type: "page-type/temper-metric-tree",
  slug: "companion-hps-total-companion-hps-hot",
  title: "HoT Healing Per Second",
  nodeId: "companion-hps-hot",
  nodeType: "metric",
  displayOrder: 1,
  parent: "temper-metric-tree/companion-category-companion-hps-total",
} as const satisfies TemperMetricTree
