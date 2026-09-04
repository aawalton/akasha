import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnLaundry = {
  id: "01a05fcf-f7fe-7460-acd3-2ce422a85c43",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-laundry",
  title: "Laundry",
  parent: "furn-hearth",
  displayOrder: 7,
  furnitureSubcategoryIds: [152],
} as const satisfies TemperItemCategoryTree
