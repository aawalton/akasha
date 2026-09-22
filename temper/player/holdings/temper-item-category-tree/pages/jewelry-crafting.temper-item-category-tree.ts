import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const jewelryCrafting = {
  id: "01a05fcf-f824-7124-85c3-3f5b6ddcce92",
  type: "page-type/temper-item-category-tree",
  slug: "jewelry-crafting",
  title: "Jewelry Crafting",
  parent: "temper-item-category-tree/crafting",
  displayOrder: 3,
} as const satisfies TemperItemCategoryTree
