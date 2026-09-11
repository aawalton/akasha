import type { TemperMetricTree } from "akasha/temper/progressions/temper-metric-trees/temper-metric-tree.page-type.types.ts"

export const subcategoryTargetHealing = {
  id: "019e2fcd-5aab-7b0f-8e96-5f0fa8c1a369",
  type: "temper-metric-tree",
  slug: "subcategory-target-healing",
  title: "Healing",
  nodeId: "target-healing",
  nodeType: "subcategory",
  displayOrder: 3,
  parent: "category-target",
} as const satisfies TemperMetricTree
