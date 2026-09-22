import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const subcategoryDefenseMitigation = {
  id: "019e2fcd-5a41-77bb-843e-8761aab74b95",
  type: "page-type/temper-metric-tree",
  slug: "subcategory-defense-mitigation",
  title: "Defense Mitigation",
  nodeId: "defense-mitigation",
  nodeType: "subcategory",
  displayOrder: 7,
  parent: "temper-metric-tree/category-toughness",
} as const satisfies TemperMetricTree
