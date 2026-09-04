import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnExotic = {
  id: "01a05fcf-f7f6-7817-8b4c-ca376f6264b5",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-exotic",
  title: "Exotic",
  parent: "furn-pets",
  displayOrder: 3,
  furnitureSubcategoryIds: [179],
} as const satisfies TemperItemCategoryTree
