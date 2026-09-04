import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnLanterns = {
  id: "01a05fcf-f7fe-731d-8fe4-25256c3ec9fc",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-lanterns",
  title: "Lanterns",
  parent: "furn-lighting",
  displayOrder: 6,
  furnitureSubcategoryIds: [120],
} as const satisfies TemperItemCategoryTree
