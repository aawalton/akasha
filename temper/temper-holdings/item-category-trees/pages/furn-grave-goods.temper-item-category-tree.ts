import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnGraveGoods = {
  id: "01a05fcf-f7f9-7123-b3c6-0e668765a18b",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-grave-goods",
  title: "Grave Goods",
  parent: "furn-undercroft",
  displayOrder: 1,
  furnitureSubcategoryIds: [75],
} as const satisfies TemperItemCategoryTree
