import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const subcategoryCriticalDamage = {
  id: "019e2fcd-5976-70f3-94fb-5f09d4b0813c",
  type: "page-type/temper-metric-tree",
  slug: "subcategory-critical-damage",
  title: "Critical",
  nodeId: "critical-damage",
  nodeType: "subcategory",
  displayOrder: 4,
  parent: "temper-metric-tree/category-damage",
} as const satisfies TemperMetricTree
