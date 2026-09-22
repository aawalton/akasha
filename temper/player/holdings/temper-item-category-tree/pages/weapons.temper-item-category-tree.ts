import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const weapons = {
  id: "01a05fcf-f849-76fb-8ffc-2e1ca5ddb70b",
  type: "page-type/temper-item-category-tree",
  slug: "weapons",
  title: "Weapons",
  parent: "temper-item-category-tree/equipment",
  displayOrder: 0,
  filterTypes: [1],
} as const satisfies TemperItemCategoryTree
