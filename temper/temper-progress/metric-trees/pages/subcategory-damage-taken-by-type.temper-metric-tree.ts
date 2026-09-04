import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const subcategoryDamageTakenByType = {
  id: "019e2fcd-5a3b-78fd-8def-d2a42c02db34",
  pageTypeSlug: "temper-metric-tree",
  slug: "subcategory-damage-taken-by-type",
  title: "Damage Taken by Type",
  nodeId: "damage-taken-by-type",
  nodeType: "subcategory",
  displayOrder: 6,
  parent: "category-toughness",
} as const satisfies TemperMetricTree
