import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const subcategoryMagicka = {
  id: "019e2fcd-59f0-72e5-a590-a13126d6dc64",
  type: "page-type/temper-metric-tree",
  slug: "subcategory-magicka",
  title: "Magicka",
  nodeId: "magicka",
  nodeType: "subcategory",
  displayOrder: 0,
  parent: "temper-metric-tree/category-sustain",
} as const satisfies TemperMetricTree
