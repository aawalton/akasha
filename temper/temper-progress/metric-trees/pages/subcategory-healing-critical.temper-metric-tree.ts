import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const subcategoryHealingCritical = {
  id: "019e2fcd-5a62-767b-acd8-ea6e39fb443d",
  pageTypeSlug: "temper-metric-tree",
  slug: "subcategory-healing-critical",
  title: "Healing Critical",
  nodeId: "healing-critical",
  nodeType: "subcategory",
  displayOrder: 2,
  parent: "category-healing",
} as const satisfies TemperMetricTree
