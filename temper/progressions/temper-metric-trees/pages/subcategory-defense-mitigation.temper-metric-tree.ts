import type { TemperMetricTree } from "akasha/temper/progressions/temper-metric-trees/temper-metric-tree.page-type.types.ts"

export const subcategoryDefenseMitigation = {
  id: "019e2fcd-5a41-77bb-843e-8761aab74b95",
  type: "temper-metric-tree",
  slug: "subcategory-defense-mitigation",
  title: "Defense Mitigation",
  nodeId: "defense-mitigation",
  nodeType: "subcategory",
  displayOrder: 7,
  parent: "category-toughness",
} as const satisfies TemperMetricTree
