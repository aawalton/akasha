import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const subcategoryCriticalDefense = {
  id: "019e2fcd-5a2f-7e66-b17d-02b7ff6529c7",
  type: "page-type/temper-metric-tree",
  slug: "subcategory-critical-defense",
  title: "Critical Defense",
  nodeId: "critical-defense",
  nodeType: "subcategory",
  displayOrder: 4,
  parent: "temper-metric-tree/category-toughness",
} as const satisfies TemperMetricTree
