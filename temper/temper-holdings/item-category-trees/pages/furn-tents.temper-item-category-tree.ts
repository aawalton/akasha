import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnTents = {
  id: "01a05fcf-f813-7d54-852a-4756e9f50577",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-tents",
  title: "Tents",
  parent: "furn-structures",
  displayOrder: 7,
  furnitureSubcategoryIds: [113],
} as const satisfies TemperItemCategoryTree
