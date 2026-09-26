import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const companionSupportScoreCompanionSupportTps = {
  id: "01a0df07-1cd6-7db4-84a1-8102211e5af4",
  type: "page-type/temper-metric-tree",
  slug: "companion-support-score-companion-support-tps",
  title: "Support TPS",
  nodeId: "companion-support-tps",
  nodeType: "metric",
  displayOrder: 1,
  parent: "temper-metric-tree/companion-category-companion-support-score",
} as const satisfies TemperMetricTree
