import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const subcategoryDamageTaken = {
  id: "019e2fcd-5a33-754d-b550-a589a1b9d8fe",
  pageTypeSlug: "temper-metric-tree",
  slug: "subcategory-damage-taken",
  title: "Damage Taken",
  nodeId: "damage-taken",
  nodeType: "subcategory",
  displayOrder: 5,
  parent: "category-toughness",
} as const satisfies TemperMetricTree
