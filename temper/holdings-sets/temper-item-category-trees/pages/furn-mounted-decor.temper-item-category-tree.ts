import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnMountedDecor = {
  id: "01a05fcf-f803-7657-a68e-51f9150b2a4b",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-mounted-decor",
  title: "Mounted Decor",
  parent: "furn-gallery",
  displayOrder: 4,
  furnitureSubcategoryIds: [88],
} as const satisfies TemperItemCategoryTree
