import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const subcategoryDamageDoneByType = {
  id: "019e2fcd-5982-7fe9-ade1-9b28ab266a43",
  type: "page-type/temper-metric-tree",
  slug: "subcategory-damage-done-by-type",
  title: "Damage Done by Type",
  nodeId: "damage-done-by-type",
  nodeType: "subcategory",
  displayOrder: 7,
  parent: "temper-metric-tree/category-damage",
} as const satisfies TemperMetricTree
