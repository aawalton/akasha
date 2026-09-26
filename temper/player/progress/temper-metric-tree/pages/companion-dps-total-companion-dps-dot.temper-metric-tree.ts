import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const companionDpsTotalCompanionDpsDot = {
  id: "01a0df07-1cd6-7495-b54a-19d3f16f9a34",
  type: "page-type/temper-metric-tree",
  slug: "companion-dps-total-companion-dps-dot",
  title: "DoT Damage Per Second",
  nodeId: "companion-dps-dot",
  nodeType: "metric",
  displayOrder: 1,
  parent: "temper-metric-tree/companion-category-companion-dps-total",
} as const satisfies TemperMetricTree
