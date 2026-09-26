import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const companionSpsTotalCompanionSpsSelf = {
  id: "01a0df07-1cd6-7b3f-97dc-27b349e305a6",
  type: "page-type/temper-metric-tree",
  slug: "companion-sps-total-companion-sps-self",
  title: "Self Shielding Per Second",
  nodeId: "companion-sps-self",
  nodeType: "metric",
  displayOrder: 0,
  parent: "temper-metric-tree/companion-category-companion-sps-total",
} as const satisfies TemperMetricTree
