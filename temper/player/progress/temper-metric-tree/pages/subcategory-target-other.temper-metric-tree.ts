import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const subcategoryTargetOther = {
  id: "019e2fcd-5aaf-7986-a03c-6616a8a72576",
  type: "page-type/temper-metric-tree",
  slug: "subcategory-target-other",
  title: "Other",
  nodeId: "target-other",
  nodeType: "subcategory",
  displayOrder: 4,
  parent: "temper-metric-tree/category-target",
} as const satisfies TemperMetricTree
