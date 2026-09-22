import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const poisons = {
  id: "01a05fcf-f830-714c-b4a6-b3c97658d357",
  type: "page-type/temper-item-category-tree",
  slug: "poisons",
  title: "Poisons",
  parent: "temper-item-category-tree/consumables",
  displayOrder: 3,
  itemTypes: [30],
} as const satisfies TemperItemCategoryTree
