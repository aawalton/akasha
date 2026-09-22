import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const subcategoryDamageShields = {
  id: "019e2fcd-5a4b-73bf-aea4-f77ca55ed868",
  type: "page-type/temper-metric-tree",
  slug: "subcategory-damage-shields",
  title: "Damage Shields",
  nodeId: "damage-shields",
  nodeType: "subcategory",
  displayOrder: 8,
  parent: "temper-metric-tree/category-toughness",
} as const satisfies TemperMetricTree
