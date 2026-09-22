import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const subcategoryTargetDamage = {
  id: "019e2fcd-5a8c-74b7-8326-cdac36c56d6c",
  type: "page-type/temper-metric-tree",
  slug: "subcategory-target-damage",
  title: "Damage",
  nodeId: "target-damage",
  nodeType: "subcategory",
  displayOrder: 0,
  parent: "temper-metric-tree/category-target",
} as const satisfies TemperMetricTree
