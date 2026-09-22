import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const crownItems = {
  id: "01a05fcf-f7d6-74f6-9e3a-9ac60d6e3d94",
  type: "page-type/temper-item-category-tree",
  slug: "crown-items",
  title: "Crown Items",
  parent: "temper-item-category-tree/consumables",
  displayOrder: 8,
  itemTypes: [57],
} as const satisfies TemperItemCategoryTree
