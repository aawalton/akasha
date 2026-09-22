import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnGraveGoods = {
  id: "01a05fcf-f7f9-7123-b3c6-0e668765a18b",
  type: "page-type/temper-item-category-tree",
  slug: "furn-grave-goods",
  title: "Grave Goods",
  parent: "temper-item-category-tree/furn-undercroft",
  displayOrder: 1,
  furnitureSubcategoryIds: [75],
} as const satisfies TemperItemCategoryTree
