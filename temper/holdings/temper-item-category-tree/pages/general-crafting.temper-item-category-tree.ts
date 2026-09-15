import type { TemperItemCategoryTree } from "akasha/temper/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const generalCrafting = {
  id: "01a05fcf-f81d-7f83-89ae-9aeaf63f8386",
  type: "page-type/temper-item-category-tree",
  slug: "general-crafting",
  title: "General Crafting",
  parent: "crafting",
  displayOrder: 10,
  filterTypes: [4],
} as const satisfies TemperItemCategoryTree
