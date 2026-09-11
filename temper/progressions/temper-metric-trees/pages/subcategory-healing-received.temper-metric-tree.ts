import type { TemperMetricTree } from "akasha/temper/progressions/temper-metric-trees/temper-metric-tree.page-type.types.ts"

export const subcategoryHealingReceived = {
  id: "019e2fcd-5a67-7725-9769-87c2f25acd33",
  type: "temper-metric-tree",
  slug: "subcategory-healing-received",
  title: "Healing Received",
  nodeId: "healing-received",
  nodeType: "subcategory",
  displayOrder: 3,
  parent: "category-healing",
} as const satisfies TemperMetricTree
