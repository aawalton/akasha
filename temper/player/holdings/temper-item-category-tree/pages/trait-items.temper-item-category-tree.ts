import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const traitItems = {
  id: "01a05fcf-f844-7bfa-b33b-bb455d160870",
  type: "page-type/temper-item-category-tree",
  slug: "trait-items",
  title: "Trait Items",
  parent: "temper-item-category-tree/crafting",
  displayOrder: 8,
  filterTypes: [20],
} as const satisfies TemperItemCategoryTree
