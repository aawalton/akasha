import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnDaedric = {
  id: "01a05fcf-f7f0-7312-8dca-73a6d8e4d2fd",
  type: "page-type/temper-item-category-tree",
  slug: "furn-daedric",
  title: "Daedric",
  parent: "temper-item-category-tree/furn-pets",
  displayOrder: 1,
  furnitureSubcategoryIds: [37],
} as const satisfies TemperItemCategoryTree
