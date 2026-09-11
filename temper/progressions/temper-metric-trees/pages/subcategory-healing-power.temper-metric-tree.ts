import type { TemperMetricTree } from "akasha/temper/progressions/temper-metric-trees/temper-metric-tree.page-type.types.ts"

export const subcategoryHealingPower = {
  id: "019e2fcd-5a59-7ccc-b941-ee389e254bf0",
  type: "temper-metric-tree",
  slug: "subcategory-healing-power",
  title: "Healing Power",
  nodeId: "healing-power",
  nodeType: "subcategory",
  displayOrder: 1,
  parent: "category-healing",
} as const satisfies TemperMetricTree
