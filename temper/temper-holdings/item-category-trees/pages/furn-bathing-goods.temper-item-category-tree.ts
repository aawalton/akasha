import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnBathingGoods = {
  id: "01a05fcf-f7e7-7b57-b31e-77a51cdcf429",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-bathing-goods",
  title: "Bathing Goods",
  parent: "furn-suite",
  displayOrder: 0,
  furnitureSubcategoryIds: [175],
} as const satisfies TemperItemCategoryTree
