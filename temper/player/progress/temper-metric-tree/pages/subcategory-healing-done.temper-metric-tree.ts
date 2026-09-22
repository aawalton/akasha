import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const subcategoryHealingDone = {
  id: "019e2fcd-5a51-747e-b721-b850c5c45bfe",
  type: "page-type/temper-metric-tree",
  slug: "subcategory-healing-done",
  title: "Healing Done",
  nodeId: "healing-done",
  nodeType: "subcategory",
  displayOrder: 0,
  parent: "temper-metric-tree/category-healing",
} as const satisfies TemperMetricTree
