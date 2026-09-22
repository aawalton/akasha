import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const siegeMonster = {
  id: "01a05fcf-f83d-7e4f-9594-7973f004378e",
  type: "page-type/temper-item-category-tree",
  slug: "siege-monster",
  title: "Monster",
  parent: "temper-item-category-tree/siege-equipment",
  displayOrder: 5,
  specializedItemTypes: [406],
} as const satisfies TemperItemCategoryTree
