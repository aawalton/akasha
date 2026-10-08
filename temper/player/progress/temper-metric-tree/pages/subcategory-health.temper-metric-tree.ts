import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const subcategoryHealth = {
  id: "019e2fcd-5a1d-7006-89fd-e4ef8d94e2a7",
  type: "page-type/temper-metric-tree",
  slug: "subcategory-health",
  title: "Health",
  nodeId: "health",
  nodeType: "subcategory",
  displayOrder: 2,
  parent: "temper-metric-tree/category-toughness",
  createdAt: "2026-05-16T08:00:47.645Z",
  updatedAt: "2026-09-22T20:46:12.000Z",
} as const satisfies TemperMetricTree
