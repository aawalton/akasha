import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const companionGroupUtility = {
  id: "01a0df07-1cd6-7c99-b925-585bdd8dde0f",
  type: "page-type/temper-metric-tree",
  slug: "companion-group-utility",
  title: "Utility",
  nodeId: "utility",
  nodeType: "companion-group",
  displayOrder: 3,
  parent: "temper-metric-tree/companion-stats",
} as const satisfies TemperMetricTree
