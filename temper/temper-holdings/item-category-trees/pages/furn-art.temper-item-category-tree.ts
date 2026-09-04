import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnArt = {
  id: "01a05fcf-f7e6-7f34-8f76-e6da48dee47e",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-art",
  title: "Art",
  parent: "furn-gallery",
  displayOrder: 0,
  furnitureSubcategoryIds: [91],
} as const satisfies TemperItemCategoryTree
