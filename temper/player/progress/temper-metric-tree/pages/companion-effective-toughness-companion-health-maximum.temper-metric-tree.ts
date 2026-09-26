import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const companionEffectiveToughnessCompanionHealthMaximum = {
  id: "01a0df07-1cd6-7be9-bfa4-a46a812d03bc",
  type: "page-type/temper-metric-tree",
  slug: "companion-effective-toughness-companion-health-maximum",
  title: "Maximum Health",
  nodeId: "companion-health-maximum",
  nodeType: "metric",
  displayOrder: 0,
  parent: "temper-metric-tree/companion-category-companion-effective-toughness",
} as const satisfies TemperMetricTree
