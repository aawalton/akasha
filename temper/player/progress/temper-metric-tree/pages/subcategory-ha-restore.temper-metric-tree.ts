import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const subcategoryHaRestore = {
  id: "019e2fcd-5a07-7713-aeb2-413d00bcbb96",
  type: "page-type/temper-metric-tree",
  slug: "subcategory-ha-restore",
  title: "HA Restore",
  nodeId: "ha-restore",
  nodeType: "subcategory",
  displayOrder: 3,
  parent: "temper-metric-tree/category-sustain",
} as const satisfies TemperMetricTree
