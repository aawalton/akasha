import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.types.ts"

export const containerStandard = {
  id: "01a05fcf-f7d4-7449-b6b0-842e2895a722",
  pageTypeSlug: "temper-item-category-tree",
  type: "temper-item-category-tree",
  slug: "container-standard",
  title: "Standard",
  parent: "containers",
  displayOrder: 0,
  specializedItemTypes: [850],
} as const satisfies TemperItemCategoryTree
