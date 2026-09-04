import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnPaintings = {
  id: "01a05fcf-f806-7ec6-8fdd-94cc413b9ae1",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-paintings",
  title: "Paintings",
  parent: "furn-gallery",
  displayOrder: 5,
  furnitureSubcategoryIds: [53],
} as const satisfies TemperItemCategoryTree
