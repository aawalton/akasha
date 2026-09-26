import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const companionSupportScoreCompanionSupportDps = {
  id: "01a0df07-1cd6-7b44-ac73-46b13060b0d2",
  type: "page-type/temper-metric-tree",
  slug: "companion-support-score-companion-support-dps",
  title: "Support DPS",
  nodeId: "companion-support-dps",
  nodeType: "metric",
  displayOrder: 0,
  parent: "temper-metric-tree/companion-category-companion-support-score",
} as const satisfies TemperMetricTree
