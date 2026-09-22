import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnDrinkware = {
  id: "01a05fcf-f7f4-7e04-88ca-db59db7cdee9",
  type: "page-type/temper-item-category-tree",
  slug: "furn-drinkware",
  title: "Drinkware",
  parent: "temper-item-category-tree/furn-hearth",
  displayOrder: 5,
  furnitureSubcategoryIds: [143],
} as const satisfies TemperItemCategoryTree
