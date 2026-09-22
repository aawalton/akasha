import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const subcategoryTargetHealing = {
  id: "019e2fcd-5aab-7b0f-8e96-5f0fa8c1a369",
  type: "page-type/temper-metric-tree",
  slug: "subcategory-target-healing",
  title: "Healing",
  nodeId: "target-healing",
  nodeType: "subcategory",
  displayOrder: 3,
  parent: "temper-metric-tree/category-target",
} as const satisfies TemperMetricTree
