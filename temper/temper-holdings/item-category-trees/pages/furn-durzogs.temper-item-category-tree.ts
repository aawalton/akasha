import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnDurzogs = {
  id: "01a05fcf-f7f4-7880-8a7e-8fba747a7437",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-durzogs",
  title: "Durzogs",
  parent: "furn-mounts",
  displayOrder: 5,
  furnitureSubcategoryIds: [207],
} as const satisfies TemperItemCategoryTree
