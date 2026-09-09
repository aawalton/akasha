import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnToys = {
  id: "01a05fcf-f815-7b8d-b654-55fe6f2dad02",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-toys",
  title: "Toys",
  parent: "furn-mounts",
  displayOrder: 19,
  furnitureSubcategoryIds: [195],
} as const satisfies TemperItemCategoryTree
