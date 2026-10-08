import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const rareIngredients = {
  id: "01a05fcf-f833-71c8-8faa-8635fe523267",
  type: "page-type/temper-item-category-tree",
  slug: "rare-ingredients",
  title: "Rare Ingredients",
  parent: "temper-item-category-tree/ingredients",
  displayOrder: 3,
  specializedItemTypes: [48],
  createdAt: "2026-09-02T01:51:00.147Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
