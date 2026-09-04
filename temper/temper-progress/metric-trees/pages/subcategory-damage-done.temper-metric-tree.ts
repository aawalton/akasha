import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const subcategoryDamageDone = {
  id: "019e2fcd-5969-7c4a-b555-d0e5f4dc83eb",
  pageTypeSlug: "temper-metric-tree",
  slug: "subcategory-damage-done",
  title: "Damage Done",
  nodeId: "damage-done",
  nodeType: "subcategory",
  displayOrder: 3,
  parent: "category-damage",
} as const satisfies TemperMetricTree
