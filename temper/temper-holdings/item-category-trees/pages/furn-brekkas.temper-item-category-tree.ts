import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnBrekkas = {
  id: "01a05fcf-f7ea-7fa1-a2f5-9436c8d7f9ae",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-brekkas",
  title: "Brekkas",
  parent: "furn-mounts",
  displayOrder: 2,
  furnitureSubcategoryIds: [209],
} as const satisfies TemperItemCategoryTree
