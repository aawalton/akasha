import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const subcategoryHealingReceived = {
  id: "019e2fcd-5a67-7725-9769-87c2f25acd33",
  type: "page-type/temper-metric-tree",
  slug: "subcategory-healing-received",
  title: "Healing Received",
  nodeId: "healing-received",
  nodeType: "subcategory",
  displayOrder: 3,
  parent: "temper-metric-tree/category-healing",
} as const satisfies TemperMetricTree
