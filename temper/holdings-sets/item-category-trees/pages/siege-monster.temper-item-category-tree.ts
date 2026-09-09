import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const siegeMonster = {
  id: "01a05fcf-f83d-7e4f-9594-7973f004378e",
  pageTypeSlug: "temper-item-category-tree",
  slug: "siege-monster",
  title: "Monster",
  parent: "siege-equipment",
  displayOrder: 5,
  specializedItemTypes: [406],
} as const satisfies TemperItemCategoryTree
