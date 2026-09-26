import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const companionDpsTotalCompanionDpsDirect = {
  id: "01a0df07-1cd6-7331-98e3-d8eac5b616c9",
  type: "page-type/temper-metric-tree",
  slug: "companion-dps-total-companion-dps-direct",
  title: "Direct Damage Per Second",
  nodeId: "companion-dps-direct",
  nodeType: "metric",
  displayOrder: 0,
  parent: "temper-metric-tree/companion-category-companion-dps-total",
} as const satisfies TemperMetricTree
