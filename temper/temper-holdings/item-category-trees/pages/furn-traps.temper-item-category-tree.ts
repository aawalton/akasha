import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnTraps = {
  id: "01a05fcf-f816-75ad-9d31-4eac9d49842c",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-traps",
  title: "Traps",
  parent: "furn-services",
  displayOrder: 14,
  furnitureSubcategoryIds: [182],
} as const satisfies TemperItemCategoryTree
