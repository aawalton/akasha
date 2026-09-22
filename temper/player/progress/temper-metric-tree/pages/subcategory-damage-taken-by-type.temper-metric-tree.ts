import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const subcategoryDamageTakenByType = {
  id: "019e2fcd-5a3b-78fd-8def-d2a42c02db34",
  type: "page-type/temper-metric-tree",
  slug: "subcategory-damage-taken-by-type",
  title: "Damage Taken by Type",
  nodeId: "damage-taken-by-type",
  nodeType: "subcategory",
  displayOrder: 6,
  parent: "temper-metric-tree/category-toughness",
} as const satisfies TemperMetricTree
