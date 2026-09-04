import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const siegeTrebuchet = {
  id: "01a05fcf-f83e-7a2e-81c1-7f6c6c2fcfb8",
  pageTypeSlug: "temper-item-category-tree",
  slug: "siege-trebuchet",
  title: "Trebuchet",
  parent: "siege-equipment",
  displayOrder: 0,
  specializedItemTypes: [400],
} as const satisfies TemperItemCategoryTree
