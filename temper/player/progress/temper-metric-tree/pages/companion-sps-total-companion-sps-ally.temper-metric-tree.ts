import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const companionSpsTotalCompanionSpsAlly = {
  id: "01a0df07-1cd6-7732-8cea-4b83fb716cdb",
  type: "page-type/temper-metric-tree",
  slug: "companion-sps-total-companion-sps-ally",
  title: "Ally Shielding Per Second",
  nodeId: "companion-sps-ally",
  nodeType: "metric",
  displayOrder: 1,
  parent: "temper-metric-tree/companion-category-companion-sps-total",
} as const satisfies TemperMetricTree
