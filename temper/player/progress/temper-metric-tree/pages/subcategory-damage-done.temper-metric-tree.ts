import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const subcategoryDamageDone = {
  id: "019e2fcd-5969-7c4a-b555-d0e5f4dc83eb",
  type: "page-type/temper-metric-tree",
  slug: "subcategory-damage-done",
  title: "Damage Done",
  nodeId: "damage-done",
  nodeType: "subcategory",
  displayOrder: 3,
  parent: "temper-metric-tree/category-damage",
} as const satisfies TemperMetricTree
