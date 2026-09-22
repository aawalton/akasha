import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const subcategoryHeavyAttacks = {
  id: "019e2fcd-59a9-7d6f-83e8-8779445a10d1",
  type: "page-type/temper-metric-tree",
  slug: "subcategory-heavy-attacks",
  title: "Heavy Attacks",
  nodeId: "heavy-attacks",
  nodeType: "subcategory",
  displayOrder: 9,
  parent: "temper-metric-tree/category-damage",
} as const satisfies TemperMetricTree
