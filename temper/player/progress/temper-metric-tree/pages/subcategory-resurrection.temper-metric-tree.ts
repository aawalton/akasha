import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const subcategoryResurrection = {
  id: "019e2fcd-5a6c-793e-a73d-2c0d62f2796c",
  type: "page-type/temper-metric-tree",
  slug: "subcategory-resurrection",
  title: "Resurrection",
  nodeId: "resurrection",
  nodeType: "subcategory",
  displayOrder: 5,
  parent: "temper-metric-tree/category-healing",
} as const satisfies TemperMetricTree
