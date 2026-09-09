import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnSpecialServices = {
  id: "01a05fcf-f80f-7f36-a81d-20e12424fa9b",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-special-services",
  title: "Special",
  parent: "furn-services",
  displayOrder: 10,
  furnitureSubcategoryIds: [186],
} as const satisfies TemperItemCategoryTree
