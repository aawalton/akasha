import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const subcategoryLightAttacks = {
  id: "019e2fcd-598e-747a-8d99-89d427267a0b",
  type: "page-type/temper-metric-tree",
  slug: "subcategory-light-attacks",
  title: "Light Attacks",
  nodeId: "light-attacks",
  nodeType: "subcategory",
  displayOrder: 8,
  parent: "temper-metric-tree/category-damage",
} as const satisfies TemperMetricTree
