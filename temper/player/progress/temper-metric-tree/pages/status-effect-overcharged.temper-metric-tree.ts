import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const statusEffectOvercharged = {
  id: "019e2fcd-59d6-7849-b439-b65ed0480415",
  type: "page-type/temper-metric-tree",
  slug: "status-effect-overcharged",
  title: "Overcharged",
  nodeId: "overcharged",
  nodeType: "status-effect",
  displayOrder: 5,
  parent: "temper-metric-tree/subcategory-status-damage",
  createdAt: "2026-05-16T08:00:47.574Z",
  updatedAt: "2026-10-28T22:26:56.530Z",
} as const satisfies TemperMetricTree
