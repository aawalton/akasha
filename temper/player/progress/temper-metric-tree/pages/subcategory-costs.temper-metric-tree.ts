import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const subcategoryCosts = {
  id: "019e2fcd-5a14-7c9b-b465-911d82426687",
  type: "page-type/temper-metric-tree",
  slug: "subcategory-costs",
  title: "Costs",
  nodeId: "costs",
  nodeType: "subcategory",
  displayOrder: 4,
  parent: "temper-metric-tree/category-sustain",
} as const satisfies TemperMetricTree
