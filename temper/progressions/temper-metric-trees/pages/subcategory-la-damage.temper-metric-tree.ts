import type { TemperMetricTree } from "akasha/temper/progressions/temper-metric-trees/temper-metric-tree.page-type.types.ts"

export const subcategoryLaDamage = {
  id: "019e2fcd-599a-75af-9843-2b5b42740bb1",
  type: "temper-metric-tree",
  slug: "subcategory-la-damage",
  title: "LA Damage",
  nodeId: "la-damage",
  nodeType: "subcategory",
  displayOrder: 1,
  parent: "subcategory-light-attacks",
} as const satisfies TemperMetricTree
