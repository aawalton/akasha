import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const subcategoryStealth = {
  id: "019e2fcd-5a87-73a6-b7d4-823090b88888",
  type: "page-type/temper-metric-tree",
  slug: "subcategory-stealth",
  title: "Stealth",
  nodeId: "stealth",
  nodeType: "subcategory",
  displayOrder: 6,
  parent: "temper-metric-tree/category-mobility",
} as const satisfies TemperMetricTree
