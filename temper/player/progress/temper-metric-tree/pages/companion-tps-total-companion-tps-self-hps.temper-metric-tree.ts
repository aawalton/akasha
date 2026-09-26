import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const companionTpsTotalCompanionTpsSelfHps = {
  id: "01a0df07-1cd6-7696-af9b-9032c026de0a",
  type: "page-type/temper-metric-tree",
  slug: "companion-tps-total-companion-tps-self-hps",
  title: "Self Healing Per Second",
  nodeId: "companion-tps-self-hps",
  nodeType: "metric",
  displayOrder: 1,
  parent: "temper-metric-tree/companion-category-companion-tps-total",
} as const satisfies TemperMetricTree
