import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const alchemy = {
  id: "01a05fcf-f7ba-7dbe-b214-607b88f60215",
  type: "page-type/temper-item-category-tree",
  slug: "alchemy",
  title: "Alchemy",
  parent: "temper-item-category-tree/crafting",
  displayOrder: 5,
} as const satisfies TemperItemCategoryTree
