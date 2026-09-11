import type { TemperMetricTree } from "akasha/temper/progressions/temper-metric-trees/temper-metric-tree.page-type.types.ts"

export const subcategoryStamina = {
  id: "019e2fcd-59f6-763a-bfaa-bfa39011ffd0",
  type: "temper-metric-tree",
  slug: "subcategory-stamina",
  title: "Stamina",
  nodeId: "stamina",
  nodeType: "subcategory",
  displayOrder: 1,
  parent: "category-sustain",
} as const satisfies TemperMetricTree
