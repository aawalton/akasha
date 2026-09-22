import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const subcategoryLaDamage = {
  id: "019e2fcd-599a-75af-9843-2b5b42740bb1",
  type: "page-type/temper-metric-tree",
  slug: "subcategory-la-damage",
  title: "LA Damage",
  nodeId: "la-damage",
  nodeType: "subcategory",
  displayOrder: 1,
  parent: "temper-metric-tree/subcategory-light-attacks",
} as const satisfies TemperMetricTree
