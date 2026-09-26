import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const companionHpsTotalCompanionHpsShield = {
  id: "01a0df07-1cd6-70af-acb0-1c39ae17bbeb",
  type: "page-type/temper-metric-tree",
  slug: "companion-hps-total-companion-hps-shield",
  title: "Shield Healing Per Second",
  nodeId: "companion-hps-shield",
  nodeType: "metric",
  displayOrder: 2,
  parent: "temper-metric-tree/companion-category-companion-hps-total",
} as const satisfies TemperMetricTree
