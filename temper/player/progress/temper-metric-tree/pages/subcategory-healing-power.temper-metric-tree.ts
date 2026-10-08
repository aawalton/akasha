import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const subcategoryHealingPower = {
  id: "019e2fcd-5a59-7ccc-b941-ee389e254bf0",
  type: "page-type/temper-metric-tree",
  slug: "subcategory-healing-power",
  title: "Healing Power",
  nodeId: "healing-power",
  nodeType: "subcategory",
  displayOrder: 1,
  parent: "temper-metric-tree/category-healing",
  createdAt: "2026-05-16T08:00:47.705Z",
  updatedAt: "2026-09-22T20:46:12.000Z",
} as const satisfies TemperMetricTree
