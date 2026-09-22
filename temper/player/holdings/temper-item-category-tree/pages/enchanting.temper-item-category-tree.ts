import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const enchanting = {
  id: "01a05fcf-f7df-7a57-b0ce-8a6262b3897e",
  type: "page-type/temper-item-category-tree",
  slug: "enchanting",
  title: "Enchanting",
  parent: "temper-item-category-tree/crafting",
  displayOrder: 4,
} as const satisfies TemperItemCategoryTree
