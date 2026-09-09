import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnDaedric = {
  id: "01a05fcf-f7f0-7312-8dca-73a6d8e4d2fd",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-daedric",
  title: "Daedric",
  parent: "furn-pets",
  displayOrder: 1,
  furnitureSubcategoryIds: [37],
} as const satisfies TemperItemCategoryTree
