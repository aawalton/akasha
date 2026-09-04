import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnPets = {
  id: "01a05fcf-f806-7ace-8809-da8bfcf70b98",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-pets",
  title: "Non-Combat Pets",
  parent: "furnishings",
  displayOrder: 15,
  furnitureCategoryIds: [32],
} as const satisfies TemperItemCategoryTree
