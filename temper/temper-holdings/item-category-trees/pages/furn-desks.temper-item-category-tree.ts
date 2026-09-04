import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnDesks = {
  id: "01a05fcf-f7f1-7f0d-91de-3f581c36a45e",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-desks",
  title: "Desks",
  parent: "furn-library",
  displayOrder: 0,
  furnitureSubcategoryIds: [60],
} as const satisfies TemperItemCategoryTree
