import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnYardOrnaments = {
  id: "01a05fcf-f81c-7af0-b09f-6983bb02f5c5",
  type: "page-type/temper-item-category-tree",
  slug: "furn-yard-ornaments",
  title: "Yard Ornaments",
  parent: "temper-item-category-tree/furn-courtyard",
  displayOrder: 5,
  furnitureSubcategoryIds: [98],
} as const satisfies TemperItemCategoryTree
