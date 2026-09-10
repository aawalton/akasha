import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.types.ts"

export const bsTempers = {
  id: "01a05fcf-f7bf-7255-870b-ff5e73951b38",
  pageTypeSlug: "temper-item-category-tree",
  type: "temper-item-category-tree",
  slug: "bs-tempers",
  title: "Tempers",
  parent: "blacksmithing",
  displayOrder: 3,
  itemTypes: [41],
} as const satisfies TemperItemCategoryTree
