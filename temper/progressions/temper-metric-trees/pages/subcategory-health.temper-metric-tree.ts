import type { TemperMetricTree } from "akasha/temper/progressions/temper-metric-trees/temper-metric-tree.page-type.types.ts"

export const subcategoryHealth = {
  id: "019e2fcd-5a1d-7006-89fd-e4ef8d94e2a7",
  type: "temper-metric-tree",
  slug: "subcategory-health",
  title: "Health",
  nodeId: "health",
  nodeType: "subcategory",
  displayOrder: 2,
  parent: "category-toughness",
} as const satisfies TemperMetricTree
