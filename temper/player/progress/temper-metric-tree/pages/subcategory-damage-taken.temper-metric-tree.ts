import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const subcategoryDamageTaken = {
  id: "019e2fcd-5a33-754d-b550-a589a1b9d8fe",
  type: "page-type/temper-metric-tree",
  slug: "subcategory-damage-taken",
  title: "Damage Taken",
  nodeId: "damage-taken",
  nodeType: "subcategory",
  displayOrder: 5,
  parent: "temper-metric-tree/category-toughness",
  createdAt: "2026-05-16T08:00:47.667Z",
  updatedAt: "2026-09-22T20:46:12.000Z",
} as const satisfies TemperMetricTree
