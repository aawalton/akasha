import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const subcategoryHealingCritical = {
  id: "019e2fcd-5a62-767b-acd8-ea6e39fb443d",
  type: "page-type/temper-metric-tree",
  slug: "subcategory-healing-critical",
  title: "Healing Critical",
  nodeId: "healing-critical",
  nodeType: "subcategory",
  displayOrder: 2,
  parent: "temper-metric-tree/category-healing",
} as const satisfies TemperMetricTree
