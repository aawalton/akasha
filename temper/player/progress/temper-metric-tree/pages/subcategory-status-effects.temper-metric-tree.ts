import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const subcategoryStatusEffects = {
  id: "019e2fcd-59cb-7c2d-8a6c-80ea21698730",
  type: "page-type/temper-metric-tree",
  slug: "subcategory-status-effects",
  title: "Status Effects",
  nodeId: "status-effects",
  nodeType: "subcategory",
  displayOrder: 10,
  parent: "temper-metric-tree/category-damage",
} as const satisfies TemperMetricTree
