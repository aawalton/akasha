import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const rareIngredients = {
  id: "01a05fcf-f833-71c8-8faa-8635fe523267",
  type: "page-type/temper-item-category-tree",
  slug: "rare-ingredients",
  title: "Rare Ingredients",
  parent: "temper-item-category-tree/ingredients",
  displayOrder: 3,
  specializedItemTypes: [48],
} as const satisfies TemperItemCategoryTree
