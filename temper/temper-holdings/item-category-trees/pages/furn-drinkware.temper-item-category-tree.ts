import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnDrinkware = {
  id: "01a05fcf-f7f4-7e04-88ca-db59db7cdee9",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-drinkware",
  title: "Drinkware",
  parent: "furn-hearth",
  displayOrder: 5,
  furnitureSubcategoryIds: [143],
} as const satisfies TemperItemCategoryTree
