import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const furnDaedric = {
  id: "01a05fcf-f7f0-7312-8dca-73a6d8e4d2fd",
  type: "temper-item-category-tree",
  slug: "furn-daedric",
  title: "Daedric",
  parent: "furn-pets",
  displayOrder: 1,
  furnitureSubcategoryIds: [37],
} as const satisfies TemperItemCategoryTree
