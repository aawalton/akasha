import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const blacksmithing = {
  id: "01a05fcf-f7be-7be7-8236-580a072d8074",
  type: "page-type/temper-item-category-tree",
  slug: "blacksmithing",
  title: "Blacksmithing",
  parent: "temper-item-category-tree/crafting",
  displayOrder: 0,
} as const satisfies TemperItemCategoryTree
