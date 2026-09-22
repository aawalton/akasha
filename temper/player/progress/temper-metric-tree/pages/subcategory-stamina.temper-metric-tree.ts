import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const subcategoryStamina = {
  id: "019e2fcd-59f6-763a-bfaa-bfa39011ffd0",
  type: "page-type/temper-metric-tree",
  slug: "subcategory-stamina",
  title: "Stamina",
  nodeId: "stamina",
  nodeType: "subcategory",
  displayOrder: 1,
  parent: "temper-metric-tree/category-sustain",
} as const satisfies TemperMetricTree
