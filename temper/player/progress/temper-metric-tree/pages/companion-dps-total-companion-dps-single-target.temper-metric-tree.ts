import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const companionDpsTotalCompanionDpsSingleTarget = {
  id: "01a0df07-1cd6-7e80-88a0-97b3347a454f",
  type: "page-type/temper-metric-tree",
  slug: "companion-dps-total-companion-dps-single-target",
  title: "Single Target Damage Per Second",
  nodeId: "companion-dps-single-target",
  nodeType: "metric",
  displayOrder: 2,
  parent: "temper-metric-tree/companion-category-companion-dps-total",
} as const satisfies TemperMetricTree
