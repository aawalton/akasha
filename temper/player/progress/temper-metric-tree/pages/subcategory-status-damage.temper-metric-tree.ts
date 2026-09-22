import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const subcategoryStatusDamage = {
  id: "019e2fcd-59d0-71d4-9892-b196c3cbc75b",
  type: "page-type/temper-metric-tree",
  slug: "subcategory-status-damage",
  title: "Status Damage",
  nodeId: "status-damage",
  nodeType: "subcategory",
  displayOrder: 3,
  parent: "temper-metric-tree/subcategory-status-effects",
} as const satisfies TemperMetricTree
